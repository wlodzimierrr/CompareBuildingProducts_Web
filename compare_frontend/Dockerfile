FROM node:20-alpine

# Set working directory
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

# Install dependencies
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port Next.js is running on (default: 3000)
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
