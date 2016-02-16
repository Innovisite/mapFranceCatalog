#!/bin/bash

# config
VERSION=$(node --eval "console.log(require('./package.json').version);")
NAME=$(node --eval "console.log(require('./package.json').name);")

# build and test
./node_modules/.bin/gulp build

# checkout temp branch for release
git checkout -b gh-release

# commit changes with a versioned commit message
git commit -m "build $VERSION"

# push commit so it exists on GitHub when we run gh-release
git push origin gh-release

# run gh-release to create the tag and push release to github
./node_modules/.bin/gh-release --assets dist/mapFrance.json

# checkout master and delete release branch locally and on GitHub
git checkout master
git branch -D gh-release
git push origin :gh-release


