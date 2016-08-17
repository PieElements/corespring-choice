#!/bin/sh
# nvm use 6.0.0
rm -rf dist
mkdir dist
babel --presets react src/corespring-multiple-choice-react.jsx --out-file dist/corespring-multiple-choice-react.js
babel --presets react src/index.jsx --out-file dist/index.js
webpack 
lessc src/index.less dist/index.css
