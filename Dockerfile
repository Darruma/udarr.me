FROM node:10
WORKDIR /usr/src/website
COPY package*.json ./
RUN npm install
COPY . .
RUN cd client/ && npm install && npm run build
CMD ["npm","start"]
EXPOSE 3005
