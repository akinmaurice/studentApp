FROM node


# Create app directory
RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server

COPY package.json /usr/src/server/
RUN npm install

# Bundle app source
COPY . /usr/src/server

CMD ["npm", "start"]

