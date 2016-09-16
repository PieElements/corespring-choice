import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class CorespringFeedback extends React.Component {

  render() {
    var self = this;
    var correctness = self.props.correctness;
    var feedback = self.props.feedback;

    function chooseFeedback(correctness){
      if (correctness && feedback) {
        var feedbackClass = "corespring-feedback " + correctness;
        return <div key="hasFeedback" className={feedbackClass}>{feedback}</div>
      } else {
        return ''; //<div key="noFeedback"></div>
      }
    }

    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="corespring-feedback"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}>
          {chooseFeedback(correctness)}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

CorespringFeedback.propTypes = {
  correctness: React.PropTypes.string,
    feedback: React.PropTypes.string
}


export default CorespringFeedback