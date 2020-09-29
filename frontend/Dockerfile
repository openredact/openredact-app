# build and compile the frontend
FROM node:10 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

ENV REACT_APP_API_BASE_URL=/api

RUN npm run build

# serve built frontend using nginx
FROM nginx:1.15

COPY --from=build-stage /app/build/ /assets
COPY nginx.conf /etc/nginx/nginx.conf