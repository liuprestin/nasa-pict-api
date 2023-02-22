#!/bin/bash

ID_NAME="tester"
DEMO_NAME="nasa-api-demo"
PORT_NUM=8080
PORT_CONTAINER=8080
URL="http://127.0.0.1:$PORT_NUM"

#build image
echo "Building the Test IMG"
docker build -t $ID_NAME/$DEMO_NAME .

#launch image 
echo "Deploy the image"
docker run -p $PORT_NUM:$PORT_CONTAINER $ID_NAME/$DEMO_NAME:latest

# say something to launch the browser to localhost
echo "Launching in browser"
xdg-open $URL || sensible-browser $URL || x-www-browser $URL || gnome-open $URL
