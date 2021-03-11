. ~/.nvm/nvm.sh
nvm use
echo "Stopping all containers..."
docker-compose down --remove-orphans
echo "Recreate and spin-up DEVELOPMENT environment"
docker-compose up -d --force-recreate --build
# Stop execution if we have an error
set -e
# Install / Update dependencies
yarn
yarn eventstore:projections
yarn watch:dev
