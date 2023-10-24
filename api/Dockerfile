# Copy code
# Use the official Node.js image as the base image
FROM node:14-alpine

ARG NODE_ENV=development
ARG PORT=3001

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

ENV PORT=${PORT}
ENV NODE_ENV=${NODE_ENV}


CMD [ "npm", "run", "start" ]

EXPOSE $PORT