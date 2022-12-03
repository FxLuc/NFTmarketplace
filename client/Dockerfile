# ==== CONFIGURE =====
FROM node:16.18.1-alpine AS production
ENV NODE_ENV development

# Set working directory
WORKDIR /client

# # Cache and Install dependencies
# COPY package.json .
# COPY package-lock.json .
# RUN npm install

# Copy app files
COPY . .

# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Build the app
RUN npm run build


# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3000
# Start the app
CMD [ "npx", "serve", "build" ]

# EXPOSE 3000
# CMD [ "npm", "start" ]

# Build the Docker image for the current folder and tag it with `fxethers-react`
# docker build . -t fxethers-react

# Check the image was created
# docker images | grep fxethers-react

# Run the image in detached mode and map port 3000 inside the container with 3000 on current host
# docker run -p 3000:3000 -d fxethers-react