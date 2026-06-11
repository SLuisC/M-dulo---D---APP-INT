#!/usr/bin/env bash
set -euo pipefail

if [ ! -f .env ]; then
  cp .env.example .env
  echo "Archivo .env creado desde .env.example"
fi

docker compose up --build
