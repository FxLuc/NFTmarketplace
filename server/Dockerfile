# ==== CONFIGURE FOR DEVELOPMENT =====
FROM node:16.18-alpine AS development

# Set working directory
WORKDIR server

# Cache and Install dependencies
COPY package.json .
COPY package-lock.json .

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci

# Copy server files
COPY . .

# ==== RUN =======

# Expose the port on which the app will be running (50667 is the default that `serve` uses)
EXPOSE 50667:50667

# Start the app
CMD [ "npm", "start" ]

# Build the Docker image for the current folder and tag it with `fxethers-server-development`, file `Dockerfile.development`
# docker build -t fxethers-server-development -f Dockerfile.development .

# Check the image was created
# docker images | grep fxethers-server-development

# Run the image in detached mode and map port 50667 inside the container with 50667 on current host
# docker run -p 50667:50667 -d fxethers-server-development