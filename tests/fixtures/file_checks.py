"""Independently inspect honest browser-exported snapshots with Python's native sqlite3."""
import json
import sqlite3
import sys
from pathlib import Path

def inspect(database, expected):
    with sqlite3.connect(Path(database).resolve().as_uri() + '?mode=ro', uri=True) as connection:
        assert connection.execute('PRAGMA application_id').fetchone()[0] == 0x54455452
        assert connection.execute('PRAGMA user_version').fetchone()[0] == 1
        assert connection.execute('PRAGMA integrity_check').fetchone()[0] == 'ok'
        for table, columns in [('high_scores', [('id', 'TEXT'), ('score', 'INTEGER'), ('timestamp', 'TEXT')]), ('settings', [('key', 'TEXT'), ('value', 'TEXT')])]:
            info = connection.execute('PRAGMA table_info(' + table + ')').fetchall()
            assert [(row[1], row[2]) for row in info] == columns
            assert all(row[3] == 1 for row in info)
            assert [row[5] for row in info] == [1] + [0] * (len(columns) - 1)
        actual = [{'id': row[0], 'score': row[1], 'timestamp': row[2]} for row in connection.execute('SELECT id,score,timestamp FROM high_scores ORDER BY rowid')]
        assert actual == expected['results'], (actual, expected['results'])
        assert all(row == ('text', 'integer', 'text') for row in connection.execute('SELECT typeof(id),typeof(score),typeof(timestamp) FROM high_scores'))
        assert all(row == ('text', 'text') for row in connection.execute('SELECT typeof(key),typeof(value) FROM settings'))
        setting_rows = connection.execute('SELECT key,value FROM settings').fetchall()
        assert len(setting_rows) == 6
        settings = dict(setting_rows)
        assert settings == {key: str(value).lower() if isinstance(value, bool) else value for key, value in expected['settings'].items()}
    return actual

def create_external(database, expected):
    with sqlite3.connect(database) as connection:
        connection.executescript("""PRAGMA application_id=0x54455452; PRAGMA user_version=1;
            CREATE TABLE high_scores(id text NOT NULL, score integer NOT NULL CHECK(score >= 0), timestamp text NOT NULL, PRIMARY KEY(id));
            CREATE TABLE settings(key text NOT NULL, value text NOT NULL, PRIMARY KEY(key));""")
        for index, row in enumerate(expected['results']):
            connection.execute('INSERT INTO high_scores(rowid,id,score,timestamp) VALUES (?,?,?,?)', (3 + index * 7, row['id'], row['score'], row['timestamp']))
        for key, value in expected['settings'].items():
            connection.execute('INSERT INTO settings(key,value) VALUES (?,?)', (key, str(value).lower() if isinstance(value, bool) else value))

if __name__ == '__main__':
    if sys.argv[1] == '--create':
        create_external(sys.argv[2], json.loads(Path(sys.argv[3]).read_text()))
        print('Independent SQLite fixture created with weak constraints and gapped rowids')
    else:
        inspect(sys.argv[1], json.loads(Path(sys.argv[2]).read_text()))
        print('Independent SQLite structure, metadata, values and tie order verified')
