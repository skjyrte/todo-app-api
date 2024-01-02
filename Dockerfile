FROM node:20.10.0-alpine3.18

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install --omit-dev

COPY . .

EXPOSE 4000
# required for docker desktop port mapping

CMD ["npm", "run", "prod"]