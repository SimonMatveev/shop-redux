FROM node:alpine
WORKDIR /back
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "node", "app.js" ]