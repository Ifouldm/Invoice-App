FROM node:16-alpine
ENV NODE_ENV=production

WORKDIR /usr/src/invoice-app
COPY ["invoice-server/package.json", "invoice-server/package-lock.json*", "./"]
RUN npm install
COPY invoice-server/ ./

COPY "invoice-client/dist" "public"

EXPOSE 3000
CMD ["npm", "start"]
