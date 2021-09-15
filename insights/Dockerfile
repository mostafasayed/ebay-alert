FROM node:13.12.0-alpine

# set working directory
RUN mkdir /insights
WORKDIR /insights


# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . /insights

EXPOSE 5000:5000

# start app
CMD ["npm", "start"]