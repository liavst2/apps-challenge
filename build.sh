

echo "Starting to build the application!"

echo "building server side..."

cd server
npm i --silent
npm run build
npm test
if [ $? -ne 0 ]; then
  echo "Something is wrong with the server functionality... exiting"
  exit 1
fi
cd ..

echo "Done building server side, moving to client"

echo "Building client side..."

cd client
npm i --silent
npm run build
npm test
if [ $? -ne 0 ]; then
  echo "Something is wrong with the client functionality... exiting"
  exit 1
fi
cd ..

echo "Done building the components! running the server..."
echo "==================================================="
echo "UI is avaliable on localhost:9898/apps"

node server/dist/main.js
