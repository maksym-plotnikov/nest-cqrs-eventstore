. ~/.nvm/nvm.sh
nvm use
echo "Stopping all containers..."
docker-compose down
echo "Spin-up DEVELOPMENT environment"
docker-compose up -d

# Establish connection to database
echo "Wait for Postgress connection..."
# Stop execution if we have an error
set -e
# Same as in docker-compose.yml
POSTGRES_HOST="127.0.0.1:5432"
POSTGRES_USER="root"
POSTGRES_PASSWORD="root"
POSTGRES_DB="email_admin"
POSTGRES_CONTAINER_ID=$(docker ps | awk ' /postgres/ { print $1 }')
echo "$POSTGRES_CONTAINER_ID"
# Try to connect to PostgreSQL
until docker exec -it $POSTGRES_CONTAINER_ID psql "postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST/$POSTGRES_DB" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping..."
  sleep 1
done
>&2 echo "Postgres is up - executing command"
# Install / Update dependencies
yarn
yarn migration:run api
yarn seeds:run api
yarn watch:dev
