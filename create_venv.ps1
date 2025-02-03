# Get the directory of the script
$IDO_DIR = Split-Path -Parent $MyInvocation.MyCommand.Definition
# Create venv
python -m venv "$IDO_DIR\venv"
# Enable venv
& "$IDO_DIR\venv\Scripts\Activate.ps1"
# Install dependencies from pyproject.toml
pip install "$IDO_DIR\"