# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port (change if you use a different one)
EXPOSE 5000

# Start the backend
CMD ["npm", "run" ,"start-dev"]
