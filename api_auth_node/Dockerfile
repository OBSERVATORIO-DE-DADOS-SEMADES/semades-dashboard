FROM node:18-alpine

# Define workdir inside the container
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Default runtime envs (Cloud Run overrides via flags/variables)
ENV PORT=3000 \
    NODE_ENV=production

# Cloud Run injects PORT, but keep fallback
EXPOSE 3000

CMD ["node", "server.js"]
