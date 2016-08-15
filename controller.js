const _ = require('lodash'); 

exports.model = function(question, session, env) {
  console.log('question: ', JSON.stringify(question, null, '  '));
  console.log('session: ', JSON.stringify(session, null, '  '));
  console.log('env: ',JSON.stringify(env, null, '  '));
  var correct = _.isEqual(question.correctResponse, session.response);
  var feedback = question.model.feedback || { correct: 'correct', incorrect: 'incorrect'}  
  var out = _.assign({}, question.model); 
  console.log('out', out);
  out.env = env;

  if (env.mode === 'evaluate') {

    console.log('session.value', session.value);

    var allCorrect = _.isEqual(session.value.sort(), question.correctResponse.sort());
    console.log('session.value: allCorrect', allCorrect, session.value, typeof (session.value), 'question.correctResponse: ', question.correctResponse, typeof (question.correctResponse));

    if (!allCorrect) {
      base.config.correctResponse = question.correctResponse;
    }
    base.outcomes = createOutcomes(allCorrect);
  }

  console.log('return: ', JSON.stringify(out, null, '  '));
  return out;
};