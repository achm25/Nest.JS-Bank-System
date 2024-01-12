# Base image
FROM node:16

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND yarn-lock.json are copied
COPY package.json yarn.lock ./

# Install app dependencies
RUN yarn

# Bundle app source
COPY . ./

# Creates a "dist" folder with the develompent build
RUN yarn start:dev

# Expose the port on which the app will run
EXPOSE 3001

# Start the server using the develompent build
CMD ["yarn", "start", "dev"]