# corespring-pie-multiple-choice

A multiple choice component for [pie](http://github.com/PieLabs/pie).

## Setup

```
npm install
```

## Development/Demo Build

```
npm start
# the go to localhost:8080/demo.html
```

## Build

```
npm run-script dist
```

## Rebuild after code change

```
npm run-script dist-watch
```

## pie-demo 

This is a hot reloading demo page for Development:

```
cd pie-demo
webpack --hot --inline 
```

## serve-pie 

You must have [serve-pie](http://github.com/PieLabs/serve-pie) installed.

> use branch `feature/npm-package-spike`

    git clone git@github.com/corespring/corespring-multiple-choice-react.git 
    cd corespring-multiple-choice-react
    serve-pie 
    # > go to localhost:5000
