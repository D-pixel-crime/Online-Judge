# Installing base image
FROM node:20-alpine

# Setting the working directory
WORKDIR /app

# Copying package*.json to prevent reinstallation of dependencies
COPY package*.json .

# Installing dependencies
RUN npm i

# Installing compilers and interpreters
RUN apk update && apk add --no-cache g++ make python3 py3-pip

# Copying remaining files
COPY . .

# Exposing port
EXPOSE 3000

# Running the backend
CMD [ "node","index.js" ]