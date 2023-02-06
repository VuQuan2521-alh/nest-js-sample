# path ./Dockerfile

FROM node:18-alpine as development

WORKDIR /usr/src/app

COPY --chown=node:node ./package.json ./yarn.lock ./
RUN yarn install --only=development

COPY --chown=node:node ./ .
USER node

FROM node:18-alpine as build

WORKDIR /usr/src/app
COPY --chown=node:node ./package.json ./yarn.lock ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node ./ .

RUN yarn build

RUN yarn install --only=production && yarn cache clean --force

USER node

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
