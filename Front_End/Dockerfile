# Use official Node image
FROM node:16

# Set working directory
WORKDIR /app

# Copy package files first (caching optimization)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Angular app
COPY . .

# Build Angular (for production)
RUN npm run build --prod

# Expose port 4200 (dev) or 80 (prod)
EXPOSE 4200

# Start Angular dev server (for development)
CMD ["npm", "start"]