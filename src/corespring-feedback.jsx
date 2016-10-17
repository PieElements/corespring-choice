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
        return <div key="hasFeedback" className={feedbackClass}><div className="content">{feedback}</div></div>
      } else {
        return null;
      }
    }

    return (
        <ReactCSSTransitionGroup
          transitionName="corespring-feedback"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={200}>
          {chooseFeedback(correctness)}
        </ReactCSSTransitionGroup>
    )
  }
}

CorespringFeedback.propTypes = {
  correctness: React.PropTypes.string,
    feedback: React.PropTypes.string
}


export default CorespringFeedback