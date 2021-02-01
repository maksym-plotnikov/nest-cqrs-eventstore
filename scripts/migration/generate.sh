#!/usr/bin/env sh

APP=${1:-api}
NOW=$(date +"%H%M%m%d%Y")
NAME=${2:-migration + "$NOW"}
npx ts-node --project ./apps/"$APP"/tsconfig.app.json -r tsconfig-paths/register ./node_modules/typeorm/cli.js  migration:generate  -f ./apps/"$APP"/orm -n "$NAME"
