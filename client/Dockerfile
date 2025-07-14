# --- Stage 1: Build the React App ---
FROM node:18-alpine AS build-stage

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# We'll pass VITE_API_URL from docker-compose.
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Build the static files for production
RUN npm run build

# --- Stage 2: Serve the App with Nginx ---
FROM nginx:stable-alpine AS production-stage

# Copy the built static files from the build-stage to the Nginx public directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the Nginx server
EXPOSE 80

# The default Nginx command will start the server
CMD ["nginx", "-g", "daemon off;"]