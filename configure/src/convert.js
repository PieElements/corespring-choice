import cloneDeep from 'lodash/cloneDeep';

/**
 * convert to a more react friendly form 
 * @param {*} pieModel 
 */
export function convert(pieModel) {
  let out = cloneDeep(pieModel.model);

  out.choices = out.choices.map(c => {
    c.correct = pieModel.correctResponse.indexOf(c.value) !== -1;
    c.feedback = pieModel.feedback[c.value];
    return c;
  });
  return out;
}

function addIfNeeded(arr, v) {
  if (arr.indexOf(v) === -1) {
    arr.push(v);
  }

  return arr.sort();
}

function removeIfNeeded(arr, v) {
  let i = arr.indexOf(v);
  if (i !== -1) {
    arr.splice(i, 1);
  }
  return arr.sort();
}

export function applyChange(pieModel, choiceIndex, choice) {

  let out = cloneDeep(pieModel);

  out.model.choices.splice(choiceIndex, 1, {
    label: choice.label,
    value: choice.value
  });

  if (choice.correct) {
    out.correctResponse = addIfNeeded(pieModel.correctResponse, choice.value);
  } else {
    out.correctResponse = removeIfNeeded(pieModel.correctResponse, choice.value);
  }

  if (choice.feedback) {
    out.feedback[choice.value] = choice.feedback;
  } else {
    out.feedback[choice.value] = null;
  }

  return out;
}