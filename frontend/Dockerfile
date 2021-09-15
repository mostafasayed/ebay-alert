FROM node:13.12.0-alpine

# set working directory
RUN mkdir /frontend
WORKDIR /frontend


# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . /frontend

EXPOSE 3000

# start app
CMD ["npm", "start"]