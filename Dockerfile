# Build Stage
FROM node:lts-alpine as build-stage

WORKDIR /app
COPY invoice-client/package.json ./
RUN npm install
COPY invoice-client/ ./
RUN npm run build


# Production Stage
FROM node:lts-alpine as production-stage
ENV NODE_ENV=production
WORKDIR /usr/src/invoice-app
COPY ["invoice-server/package.json", "invoice-server/package-lock.json*", "./"]
RUN npm install
COPY invoice-server/ ./
COPY --from=build-stage /app/dist /usr/src/invoice-app/public

EXPOSE 3000
CMD ["npm", "start"]
