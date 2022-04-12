FROM node:14.17.0
# Create app directory
# Create Directory for the Container
WORKDIR /usr/src/app
# Only copy the package.json file to work directory
COPY package.json .
COPY ./prisma .
# Install all Packages
RUN yarn install
# Copy all other source code to work directory
COPY . /usr/src/app

RUN yarn build

CMD ["yarn","coverege"]