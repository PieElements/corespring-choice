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

    console.log('session', session);

    var allCorrect = _.isEqual(session.value.sort(), question.correctResponse.sort());
  }

  console.log('return: ', JSON.stringify(out, null, '  '));
  return out;
};