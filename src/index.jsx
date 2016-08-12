var CorespringMultipleChoiceReact = require('./corespring-multiple-choice-react');

var Main = React.createClass({
  handlePlotterChange: function(event){
    this.props.session.response = event.values;
  },
  handleTrackInteraction: function(){
    // console.log('handle track interaction changed', arguments);     
  },
  render: function(){
    
    var starting;
    if(this.props.session.response){
      starting = this.props.session.response;  
    } else {
      starting = _.map(this.props.model.categories, function(){
        return 1;
      });
    }
    
    var isStatic = this.props.model.env.mode !== 'gather';
    var correct, message;
    
    if(this.props.model.outcome && this.props.model.env.mode === 'evaluate'){
      correct = this.props.model.outcome.correctness === 'correct';
      message = this.props.model.outcome.feedback;
    }

    var choices = [];
     
    return <div>
        <CorespringMultipleChoiceReact 
          prompt={this.props.model.prompt} 
          choiceMode={this.props.model.choiceMode}
          keyMode={this.props.model.keyMode}
          choices={choices}/>
      </div>;
  } 
});

// module.exports = Main;

pie.framework('react').register('corespring-multiple-choice-react', Main);