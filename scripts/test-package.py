"""Run pinned optional pytest tooling from the owned local dependency directory."""
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / '.test-tools'))
import pytest
raise SystemExit(pytest.main(['tests/fixtures/package_checks.py', '-q']))
