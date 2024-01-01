FROM node:17-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install --omit-dev

COPY . .

EXPOSE 4000
# required for docker desktop port mapping

CMD ["npm", "run", "prod"]