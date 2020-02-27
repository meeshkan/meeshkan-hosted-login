#!/bin/sh
set -e -u

black *.py
flake8 *.py
isort *.py
