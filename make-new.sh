#!/bin/bash

set -e

if [ -z "$1" ]
  then
    echo "No argument supplied for dir to copy to"
fi

mkdir $1
cp -a ./template/. ./$1