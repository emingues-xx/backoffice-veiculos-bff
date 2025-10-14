FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Remove dev dependencies and clean cache
RUN npm ci --only=production && npm cache clean --force

# Expose port
EXPOSE 3002

# Start the application
CMD ["npm", "start"]