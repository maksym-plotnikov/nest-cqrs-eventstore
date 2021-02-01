#!/usr/bin/env sh
APP=${1:-backend}
npx ts-node --project ./apps/"$APP"/tsconfig.app.json -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:revert -f ./apps/"$APP"/orm
