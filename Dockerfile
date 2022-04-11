FROM node:14.17.0
COPY ./ /app
WORKDIR /app
RUN yarn install
CMD ["npm","coverege"]
