# build and compile the frontend
FROM node:10 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

# serve built frontend using nginx
FROM nginx:1.15

COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY ./nginx.conf /nginx.conf
