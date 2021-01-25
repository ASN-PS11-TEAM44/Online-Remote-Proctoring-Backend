#!/usr/bin/env bash

CURRENT_DIR="${PWD##*/}"

echo $CURRENT_DIR

if [ $CURRENT_DIR = "scripts" ]; then
    echo "Executing from scripts directory"
    cd ..
else
    echo "Executing from root directory"
fi

npm install
mkdir upload
