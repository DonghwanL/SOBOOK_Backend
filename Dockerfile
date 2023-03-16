FROM node:lts as builder

# Create app directory

WORKDIR /usr/src/app

# Install app dependencies

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:lts-slim

# Create app directory

WORKDIR /usr/src/app

ENV NODE_ENV prod

# Install app dependencies

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --from=builder /usr/src/app ./

CMD ["yarn","start:prod"]