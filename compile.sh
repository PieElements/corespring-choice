#!/bin/sh
# nvm use 6.0.0
rm -rf dist
mkdir dist
babel --presets react src/corespring-feedback-tick.jsx --out-file dist/corespring-feedback-tick.js
babel --presets react src/corespring-feedback.jsx --out-file dist/corespring-feedback.js
babel --presets react src/corespring-show-correct-answer-toggle.jsx --out-file dist/corespring-show-correct-answer-toggle.js

babel --presets react src/corespring-checkbox.jsx --out-file dist/corespring-checkbox.js
babel --presets react src/corespring-radio-button.jsx --out-file dist/corespring-radio-button.js

babel --presets react src/corespring-multiple-choice-react.jsx --out-file dist/corespring-multiple-choice-react.js

babel --presets react src/index.jsx --out-file dist/index.js

webpack 

lessc src/index.less dist/index.css
