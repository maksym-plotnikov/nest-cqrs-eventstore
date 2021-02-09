#!/usr/bin/env sh
APP=${1:-backend}
npx ts-node --project ./apps/"$APP"/tsconfig.app.json -r tsconfig-paths/register ./apps/"$APP"/src/projections/index.ts
