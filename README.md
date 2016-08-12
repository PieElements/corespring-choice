# Build 

Note: Haven't streamlined this yet... for now: 

```shell
npm install -g webpack less
npm install babel-cli
babel --presets react src/index.jsx --out-file dist/index.js
webpack dist/index.js dist/bundle.js
lessc src/index.less dist/index.css
```

# Run Demo
    cd serve-pie-demo
    serve-pie