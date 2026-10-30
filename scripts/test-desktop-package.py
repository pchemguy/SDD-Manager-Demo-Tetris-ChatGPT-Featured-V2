"""Run desktop package failure/success fixtures without requiring native Windows execution."""
import subprocess,sys
raise SystemExit(subprocess.run([sys.executable,'tests/fixtures/desktop_package_checks.py']).returncode)
