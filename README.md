# corespring-choice

[![Build Status](https://travis-ci.org/PieElements/corespring-choice.svg?branch=develop)](https://travis-ci.org/PieElements/corespring-choice)


A [pie](http://github.com/PieLabs/pie) choice component.

![choice.png](choice.png)

## Usage 

To use this pie, you need to configure a `pie-question`. This means that you'll need to add it to the `index.html` and `config.json` files.

```html
<corespring-choice pie-id="1"></corespring-choice>
```

```javascript
{
  "id" : "1",
  "pie" : {
    "name" : "corespring-choice",
    "version" : "1.0.0"
  },
  "prompt" : "1 + 1 equals?",
  // more configuration...
}
```

### Pie Demo 
There is a demo in `docs/demo` that you can run to see an example of it's usage.

To preview it in that context you'll need the [pie](/PieLabs/pie-cli) tool.

```shell
npm install -g pie 
cd corespring-choice/docs/demo
pie serve-question #will build and serve the pie... then go to http://localhost:4000
```

## Test 

```shell 
npm test # run client and controller tests
npm run client-test # run client tests
npm run controller-test # run controller tests
```

