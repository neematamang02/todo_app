FROM node:24.22.1-alpine

WORKDIR /app

# Install dependencies first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the app
COPY . .

# Expo / Metro / web ports
EXPOSE 8081 19000 19001 19002 19006

# Ensure Expo dev server is reachable from outside the container
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=host.docker.internal

CMD ["npx", "expo", "start", "--host", "lan"]
