import React from 'react';

class CorespringFeedbackTick extends React.Component {

  render() {
    var correctClass = "correct-icon" + (this.props.correctness === 'correct' ? '' : ' hide');
    var incorrectClass = "incorrect-icon" + (this.props.correctness === 'incorrect' ? '' : ' hide');

    return (
      <div className="feedback-tick">
        <svg
            className={incorrectClass}
            preserveAspectRatio="xMinYMin meet" x="0px" y="0px" viewBox="0 0 44 40" style={{"enableBackground": "new 0 0 44 40"}}>
          <g>
            <rect x="11" y="17.3" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.852 19.2507)" className="incorrect-background" width="16.6"
              height="3.7"></rect>
            <rect x="17.4" y="10.7" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -7.8175 19.209)" className="incorrect-background" width="3.7"
              height="16.6"></rect>
          </g>
        </svg>
        <svg 
            className={correctClass}
            preserveAspectRatio="xMinYMin meet" version="1.1" x="0px" y="0px" viewBox="0 0 44 40" style={{"enableBackground": "new 0 0 44 40"}}>
          <g>
            <g>
              <polygon className="correct-background" points="19.1,28.6 11.8,22.3 14.4,19.2 17.9,22.1 23.9,11.4 27.5,13.4"></polygon>
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

CorespringFeedbackTick.propTypes = {
  correctness: React.PropTypes.string
}


export default CorespringFeedbackTick