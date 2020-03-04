
FROM node:10.15.3

# Deploy server side
WORKDIR /usr/src/app/server
COPY server ./
RUN npm i
RUN npm run build

# Deploy client side
WORKDIR /usr/src/app/client
COPY client ./
RUN npm i
RUN npm run build

# Expose the running port of the server
EXPOSE 9898

# Run the server
WORKDIR /usr/src/app/server
CMD ["node", "dist/main.js"]
