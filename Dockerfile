#specify base image 
# see https://hub.docker.com/_/node/
FROM node:14-alpine

WORKDIR /home/app
# Copy the npm package dependencies 
# relative to build context -> what will be in the container
COPY ./package.json ./
# install dependencies 
RUN npm install 

# recommended to copy over the bare minium for each step

# Copy the rest of the project
COPY ./ ./

# Default command 
CMD ["npm", "start"]