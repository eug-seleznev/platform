FROM node:14
WORKDIR /app

# ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
RUN yarn install --silent
COPY . ./
RUN yarn build
RUN cd build

COPY . .

CMD ["yarn", "start"]

