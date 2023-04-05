# Base image
FROM node:18

RUN apt-get update -y \
    && apt-get install -y curl build-essential

RUN apt-get install -y npm \
    && npm -v

RUN apt-get update -y && apt-get install -y \
    wget \
    apt-transport-https \
    ca-certificates \
    software-properties-common


RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys CE7709D068DB5E88 \
    && add-apt-repository "deb https://repo.sovrin.org/sdk/deb xenial stable" \
    && apt-get update \
    && apt-get install -y \
    libindy=1.11.0

WORKDIR /home/indy/app
# Create app directory

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install 

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

EXPOSE 8888 9000