FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
COPY vite.config.js ./
COPY eslint.config.js ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN apk add --no-cache tzdata
ENV TZ="Asia/Ho_Chi_Minh"

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
