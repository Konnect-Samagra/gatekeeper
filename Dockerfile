FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build
HEALTHCHECK CMD curl --fail http://localhost:3000/health || exit 1 
CMD ["yarn","test"]
CMD ["yarn", "start"]