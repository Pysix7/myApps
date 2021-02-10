# FROM node:12-alpine

# # Exclude the NPM cache from the image
# VOLUME /root/.npm

# WORKDIR /app

# # Copy npm config
# COPY .npmrc /root/.npmrc

# COPY package*.json ./

# # RUN npm i --only=prod --loglevel verbose
# RUN npm i --loglevel verbose

# RUN rm -f /root/.npmrc

# COPY . .

# RUN npm run build

# CMD ["npm" "start"]

# ABOVE IS THE ONE I CREATED FROM REFERING DOCKER DOCS

FROM node:12-alpine

# Exclude the NPM cache from the image
VOLUME /root/.npm

RUN mkdir -p /usr/src/app
ENV PORT 3000

WORKDIR /usr/src/app

# Copy npm config
COPY .npmrc /root/.npmrc

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

# RUN npm install --production
RUN npm install --loglevel verbose

RUN rm -f /root/.npmrc

COPY . /usr/src/app

RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]
# REFERENCE LINK https://github.com/vercel/next.js/discussions/16995
