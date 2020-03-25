# FROM node:12.2.0-alpine

# MAINTAINER pysix pysixwork@gmail.com
# # set working directory
# WORKDIR /app

# # # add `/app/node_modules/.bin` to $PATH


# # # Install app dependencies
# # # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # # where available (npm@5+)

# COPY package.json /app/package.json

# RUN npm install 

# ENV PATH /app/node_modules/.bin:$PATH

# RUN npm install react-scripts@3.0.1 -g 

# # start app
# CMD ["npm", "start"]

# Stage 1 - the build process
FROM node:7.10 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN npm i
COPY . ./
RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]