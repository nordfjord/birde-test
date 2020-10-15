FROM node:12-alpine AS build-backend

WORKDIR /build

COPY backend/package.json backend/yarn.lock ./

RUN yarn

COPY backend ./

RUN yarn build

RUN yarn --prod

FROM node:12-alpine AS build-frontend

WORKDIR /build

COPY front-end/package.json front-end/yarn.lock ./

RUN yarn

COPY front-end ./

RUN yarn build

FROM node:12-alpine

WORKDIR /app

COPY --from=build-frontend /build/build ./frontend
COPY --from=build-backend /build/ ./

ENTRYPOINT []
CMD ["node", "./dist/index.js"]
