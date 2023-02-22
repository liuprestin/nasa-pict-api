#!/bin/bash

PORT_NUM=8080
PORT_CONTAINER=8080
URL="http://127.0.0.1:$PORT_NUM"

#build image
echo "Building the Test IMG"
docker build -t tester/animated-nav .

#launch image 
echo "Deploy the image"
docker run -p $PORT_NUM:$PORT_CONTAINER tester/animated-nav:latest

# say something to launch the browser to localhost
echo "Launching in browser"
xdg-open $URL || sensible-browser $URL || x-www-browser $URL || gnome-open $URL