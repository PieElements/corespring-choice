import React from 'react';

class CorespringFeedback extends React.Component {

  render() {
    var self = this;
    var feedbackClass = "corespring-feedback " + self.props.correctness;
    if (self.props.correctness && self.props.feedback) {
      return <div className={feedbackClass}>{self.props.feedback}</div>
    } else {
      return <div></div>
    }
  }
}

CorespringFeedback.propTypes = {
  correctness: React.PropTypes.string,
    feedback: React.PropTypes.string
}


export default CorespringFeedback