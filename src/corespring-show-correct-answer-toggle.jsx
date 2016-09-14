import React from 'react';

class CorespringShowCorrectAnswerToggle extends React.Component {
  
  onClick() {
    this.props.onClick();
  }
  
  render() {
    var self = this;
    return (
      <div>{
        (function() {
          if (self.props.show) {
            return (
              <div className="corespring-correct-answer-toggle" onClick={self.onClick.bind(self)}>
                <div className="svg-holder">{
                  (function() {
                    if (self.props.toggle) {
                      return (
                        <svg preserveAspectRatio="xMinYMin meet" viewBox="-283 359 34 35">
                          <circle className="hide-icon-background" cx="-266" cy="375.9" r="14"/>
                          <path className="hide-icon-background" d="M-280.5,375.9c0-8,6.5-14.5,14.5-14.5s14.5,6.5,14.5,14.5s-6.5,14.5-14.5,14.5S-280.5,383.9-280.5,375.9zM-279.5,375.9c0,7.4,6.1,13.5,13.5,13.5c7.4,0,13.5-6.1,13.5-13.5s-6.1-13.5-13.5-13.5C-273.4,362.4-279.5,368.5-279.5,375.9z"/>
                          <polygon className="hide-icon-foreground" points="-265.4,383.1 -258.6,377.2 -261.2,374.2 -264.3,376.9 -268.9,368.7 -272.4,370.6         "/>
                        </svg>
                      );
                    } else {
                      return (
                        <svg preserveAspectRatio="xMinYMin meet" viewBox="-129.5 127 34 35">
                          <path style={{fill: "#B3ABA4", "stroke" : "#CDC7C2", "strokeWidth" : 0.5, "strokeMiterlimit": 10}} d="M-113.2,159c-8,0-14.5-6.5-14.5-14.5s6.5-14.5,14.5-14.5s14.5,6.5,14.5,14.5S-105.2,159-113.2,159z"/>
                          <circle className="show-icon-background" cx="-114.2" cy="143.5" r="14"/>
                          <path className="show-icon-border" d="M-114.2,158c-8,0-14.5-6.5-14.5-14.5s6.5-14.5,14.5-14.5s14.5,6.5,14.5,14.5S-106.2,158-114.2,158zM-114.2,130c-7.4,0-13.5,6.1-13.5,13.5s6.1,13.5,13.5,13.5s13.5-6.1,13.5-13.5S-106.8,130-114.2,130z"/>
                          <polygon className="show-icon-foreground" points="-114.8,150.7 -121.6,144.8 -119,141.8 -115.9,144.5 -111.3,136.3 -107.8,138.2"/>
                        </svg>
                      );
                    }
                  }())
                }</div>
                <div className="label">{
                  (function() {
                    if (self.props.toggle) {
                      return self.props.hideMessage;
                    } else {
                      return self.props.showMessage;
                    }
                  })()
                }</div>
              </div>
            );
          }
        }())
      }</div>
    );
  }
}

CorespringShowCorrectAnswerToggle.propTypes = {
  onClick: React.PropTypes.func,
  show: React.PropTypes.bool,
  toggle: React.PropTypes.bool,
  hideMessage: React.PropTypes.string,
  showMessage: React.PropTypes.string
};

CorespringShowCorrectAnswerToggle.defaultProps = {
  showMessage: 'Show correct answer',
  hideMessage: 'Hide correct answer'
};


export default CorespringShowCorrectAnswerToggle