FROM node:10

# Create app directory
WORKDIR /usr/src/backend

ENV MONGO_URL=mongodb://mongo:27017/TaskManager

COPY package*.json ./
RUN npm install nodemon -g
RUN npm install pm2 -g 
RUN npm install
# Bundle app source
COPY . .

RUN npm run build

EXPOSE 3000
CMD [ "nodemon", "dist/bundle.js"]