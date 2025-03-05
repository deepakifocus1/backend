FROM node:20-alpine 

WORKDIR /usr/src/app

COPY package*.json ./


RUN npm install --force

COPY . .

RUN npm run build --force

# Expose the port that the application will run on
EXPOSE 3000

# Specify the environment (development or production) using build arguments
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Copy the appropriate .env file based on the environment
COPY .env.$NODE_ENV .env

# Command to start the application based on the environment
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm run prod; else npm run dev; fi"]