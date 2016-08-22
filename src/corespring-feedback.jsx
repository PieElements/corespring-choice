module.exports = React.createClass({displayName: 'CorepsringFeedback',
  render: function() {
    var self = this;
    var feedbackClass = "corespring-feedback " + this.props.correctness;
    if (self.props.correctness && self.props.feedback) {
      return <div className={feedbackClass}>{self.props.feedback}</div>
    } else {
      return <div></div>
    }
  }
});