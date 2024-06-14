# Use the official Node.js 14 image
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Update npm to version 10.8.1
RUN npm install -g npm@10.8.1

# Expose the port your app runs on
EXPOSE 8080

# Command to run the app
CMD ["npm", "start"]
