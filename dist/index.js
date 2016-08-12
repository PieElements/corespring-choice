var CorespringMultipleChoiceReact = require('./corespring-multiple-choice-react');

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
