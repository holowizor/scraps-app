FROM node:14.16.0-alpine3.12

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY . ./
# but without proxy
RUN rm -f ./src/setupProxy.js

# start app
CMD ["npm", "start"]
