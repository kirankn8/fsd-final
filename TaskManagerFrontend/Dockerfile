# Stage 1
FROM node:10 as node

WORKDIR /usr/src/frontend

COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .
RUN npm run build --prod

# Stage 2
FROM nginx:alpine
COPY --from=node /usr/src/frontend/dist/TaskManagerFrontend /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80