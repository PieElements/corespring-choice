/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var CorespringMultipleChoiceReact = __webpack_require__(1);

	var Main = React.createClass({
	  displayName: 'Main',

	  handlePlotterChange: function (event) {
	    this.props.session.response = event.values;
	  },
	  handleTrackInteraction: function () {
	    // console.log('handle track interaction changed', arguments);     
	  },
	  render: function () {

	    var starting;
	    if (this.props.session.response) {
	      starting = this.props.session.response;
	    } else {
	      starting = _.map(this.props.model.categories, function () {
	        return 1;
	      });
	    }

	    var isStatic = this.props.model.env.mode !== 'gather';
	    var correct, message;

	    if (this.props.model.outcome && this.props.model.env.mode === 'evaluate') {
	      correct = this.props.model.outcome.correctness === 'correct';
	      message = this.props.model.outcome.feedback;
	    }

	    return React.createElement(
	      'div',
	      null,
	      React.createElement(CorespringMultipleChoiceReact, null)
	    );
	  }
	});

	// module.exports = Main;

	pie.framework('react').register('corpesring-multiple-choice-react', Main);


/***/ },
/* 1 */
/***/ function(module, exports) {

	var CorespringChoiceButton = React.createClass({ displayName: 'CorespringChoiceButton',
	  render: function () {
	    return React.createElement(
	      "label",
	      { className: "corespring-choice-button" },
	      React.createElement("input", { type: this.props.mode, name: "group" }),
	      React.createElement(
	        "span",
	        null,
	        this.props['display-key'],
	        ". "
	      ),
	      React.createElement(
	        "span",
	        null,
	        this.props.label
	      )
	    );
	  }
	});

	var CorespringMultipleChoiceReact = React.createClass({
	  displayName: 'CorespringMultipleChoiceReact',
	  propTypes: {
	    prompt: React.PropTypes.string.isRequired,
	    choiceMode: React.PropTypes.oneOf(['radio', 'checkbox']).isRequired,
	    keyMode: React.PropTypes.oneOf(['numbers', 'letters']).isRequired
	  },

	  _indexToSymbol(index) {
	    return this.props.keyMode === 'numbers' ? index + 1 : String.fromCharCode(97 + index).toUpperCase();
	  },

	  render: function () {
	    console.log('render!');
	    var self = this;
	    return React.createElement(
	      "div",
	      null,
	      React.createElement(
	        "div",
	        { className: "prompt" },
	        this.props.prompt
	      ),
	      React.createElement(
	        "div",
	        null,
	        this.props.choices.map(function (choice, index) {
	          return React.createElement(CorespringChoiceButton, { mode: self.props.choiceMode, label: choice.label, "display-key": self._indexToSymbol(index) });
	        })
	      )
	    );
	  }
	});

	// module.exports = CorespringMultipleChoiceReact;


/***/ }
/******/ ]);