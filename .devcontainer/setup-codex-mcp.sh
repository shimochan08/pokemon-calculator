#!/usr/bin/env bash

set -euo pipefail

CODEX_CONFIG="${HOME}/.codex/config.toml"
NPX_BIN="$(command -v npx)"
PLAYWRIGHT_SECTION='[mcp_servers.playwright]'
PLAYWRIGHT_CACHE_DIR="${HOME}/.cache/ms-playwright"
PLAYWRIGHT_DEPS_MARKER="${PLAYWRIGHT_CACHE_DIR}/.chrome-for-testing-deps-installed"
PLAYWRIGHT_BROWSER_MARKER="${PLAYWRIGHT_CACHE_DIR}/.chrome-for-testing-installed"

mkdir -p "$(dirname "${CODEX_CONFIG}")"
touch "${CODEX_CONFIG}"
mkdir -p "${PLAYWRIGHT_CACHE_DIR}"

if ! grep -Fq "${PLAYWRIGHT_SECTION}" "${CODEX_CONFIG}"; then
  cat <<'EOF' >> "${CODEX_CONFIG}"

[mcp_servers.playwright]
command = "npx"
args = ["-y", "@playwright/mcp@latest", "--headless", "--browser=chromium", "--no-sandbox"]
EOF
fi

if [ ! -f "${PLAYWRIGHT_DEPS_MARKER}" ]; then
  sudo env "PATH=${PATH}" "${NPX_BIN}" -y playwright@latest install-deps chrome-for-testing
  touch "${PLAYWRIGHT_DEPS_MARKER}"
fi

if [ ! -f "${PLAYWRIGHT_BROWSER_MARKER}" ]; then
  "${NPX_BIN}" -y @playwright/mcp@latest install-browser chrome-for-testing
  touch "${PLAYWRIGHT_BROWSER_MARKER}"
fi
