# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your Node.js app is listening on (adjust as needed)
EXPOSE 3000

# Set environment variables (for connecting to MongoDB)
ENV MONGO_HOST=mongodb+srv://alistechworld40:alistechworld40@cluster0.yrkrion.mongodb.net/?retryWrites=true&w=majority
ENV MONGO_PORT=27017

# Start the Node.js application
CMD [ "node", "app.js" ]

