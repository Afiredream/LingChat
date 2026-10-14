#!/bin/env bash

command -v node >/dev/null || echo "没有找到node请安装: Node环境"
command -v rustup >/dev/null || echo "没有找到rustup请安装: Rust环境"
command -v pnpm >/dev/null || echo "没有找到pnpm请安装: npm -g install pnpm "

pnpm install
pnpm run init
exec pnpm tauri dev
