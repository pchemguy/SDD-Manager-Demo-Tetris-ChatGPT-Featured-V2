"""Serve actual built assets under a fixed prefix for runtime smoke, without packaging claims."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

class PrefixHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith('/nested/game/'):
            self.path = '/' + self.path[len('/nested/game/'):]
        super().do_GET()

if __name__ == '__main__':
    root = Path(__file__).resolve().parents[2] / 'dist'
    ThreadingHTTPServer(('127.0.0.1', 4173), partial(PrefixHandler, directory=str(root))).serve_forever()
