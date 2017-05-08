import isEqual from 'lodash/isEqual';

export const maxScore = 1;

function allCorrect(question, session) {
  let getCorrectResponse = choices => choices.filter(c => c.correct).map(c => c.value).sort()
  let correctResponse = getCorrectResponse(question.choices);
  return isEqual((session.value || []).sort(), correctResponse);
}

function weightedScore(question, session) {
  if (session.value !== undefined) {
    let correct = question.choices.filter(choice => choice.correct);
    return session.value.reduce((acc, selection) => {
      let choice = correct.find(c => c.value === selection);
      return acc + (choice && choice.weight ? choice.weight : 0);
    }, 0);
  } else {
    return 0;
  }
}

function partialScore(question, session) {
  let correct = question.choices.filter(choice => choice.correct).map(choice => choice.value);
  let numCorrect = correct.reduce((acc, choice) => {
    return acc + (session.value.includes(choice) ? 1 : 0)
  }, 0);
  let weighting = question.partialScoring.find(({correctCount}) => correctCount === numCorrect);
  return allCorrect(question, session) ? maxScore : (weighting !== undefined && weighting.weight !== undefined) ? weighting.weight * maxScore : 0;
}

function defaultScore(question, session) {
  return allCorrect(question, session) ? maxScore : 0;
}

/**
 * Returns the score for a session. If weighted scoring is present in the choices
 * for the question, this will be used. If partial scoring is present in the question
 * model, this will be used. Otherwise the default scoring mechanism (0 for any incorrect, 1
 * for all correct) will be used. 
 */
export function score(question, session) {
  let weightedScoring = question.choices.find(choice => choice.weight !== undefined) !== undefined;
  if (weightedScoring) {
    return weightedScore(question, session);
  } else if (question.partialScoring !== undefined) {
    return partialScore(question, session);
  }
  return defaultScore(question, session);
}