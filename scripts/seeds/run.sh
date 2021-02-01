#!/usr/bin/env sh
APP=${1:-api}
npx ts-node --project ./apps/"$APP"/tsconfig.app.json -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -f ./apps/"$APP"/app/database/seeds/orm
