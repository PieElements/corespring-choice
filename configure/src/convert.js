import cloneDeep from 'lodash/cloneDeep';
import isString from 'lodash/isString';
import mapValues from 'lodash/mapValues';
/**
 * convert pie item model to a component based structure 
 * @param {*} pieModel 
 */
export function convert(pieModel) {

  /**
   * @param {*} label 
   * @return string | [{value: string, lang: string}, ...]
   */
  function toStringOrTranslationArray(label) {

    if (!pieModel.translations) {
      return label;
    }

    let defaultLocale = pieModel.translations.default_locale;
    let defaultTranslations = pieModel.translations[defaultLocale];

    let isLookup = label.startsWith('$');

    if (isLookup) {
      let values = _(pieModel.translations).map((lookup, lang) => {
        if (lang === 'default_locale') {
          return null;
        }

        let lookupKey = label.substring(1);
        let value = lookup[lookupKey] || '';
        return { lang, value }
      }).compact().value();

      return values;

    } else {
      return label;
    }
  }

  let out = cloneDeep(pieModel.model);

  out.choices = out.choices.map(c => {
    c.correct = pieModel.correctResponse.indexOf(c.value) !== -1;
    let fb = pieModel.feedback[c.value];
    c.feedback = fb && toStringOrTranslationArray(fb);
    c.label = toStringOrTranslationArray(c.label);
    return c;
  });
  out.langs = _(pieModel.translations).keys().without('default_locale').value();
  out.defaultLang = pieModel.translations.default_locale;

  out.prompt = toStringOrTranslationArray(out.prompt);
  return out;
}

function addIfNeeded(arr, v) {
  if (arr.indexOf(v) === -1) {
    arr.push(v);
  }

  return arr.sort();
}

export function removeIfNeeded(arr, v) {
  let i = arr.indexOf(v);
  if (i !== -1) {
    arr.splice(i, 1);
  }
  return arr.sort();
}

export function clearTranslations(translations, label) {
  return mapValues(translations, (val, key) => {
    let lookup = label.startsWith('$') ? label.substring(1) : label;
    delete val[lookup];
    return val;
  });
}

export function clearFeedback(fb, value) {
  delete fb[value];
  return fb;
}

export function removeChoice(model, index) {
  let [deleted] = model.model.choices.splice(index, 1);
  model.correctResponse = removeIfNeeded(model.correctResponse, deleted.value);
  model.translations = clearTranslations(model.translations, deleted.label);
  model.feedback = clearFeedback(model.feedback, deleted.value);
  return model;
}

/**
 * apply a ui model back to the pie item format.
 * @param {*} pieModel 
 * @param {*} choiceIndex 
 * @param {*} choice 
 */
export function applyChoiceChange(pieModel, choiceIndex, choice) {

  let oldChoice = pieModel.model.choices[choiceIndex];
  pieModel.translations = clearTranslations(pieModel.translations, oldChoice.label);
  pieModel.correctResponse = removeIfNeeded(pieModel.correctResponse, oldChoice.value);
  pieModel.feedback = clearFeedback(pieModel.feedback, oldChoice.value);

  let out = cloneDeep(pieModel);

  let choiceKey = '$choice_label_' + choiceIndex;
  let choiceLabel = isString(choice.label) ? choice.label : choiceKey;

  out.model.choices.splice(choiceIndex, 1, {
    label: choiceLabel,
    value: choice.value
  });

  if (choice.correct) {
    out.correctResponse = addIfNeeded(pieModel.correctResponse, choice.value);
  } else {
    out.correctResponse = removeIfNeeded(pieModel.correctResponse, choice.value);
  }

  if (choice.feedback) {
    if (Array.isArray(choice.feedback)) {
      out.feedback[choice.value] = '$feedback_' + choice.value;
      choice.feedback.forEach(({ lang, value }) => {
        out.translations[lang] = out.translations[lang] || {};
        out.translations[lang]['feedback_' + choice.value] = value;
      });
    } else {
      out.feedback[choice.value] = choice.feedback;
    }
  } else {
    out.feedback[choice.value] = null;
    delete out.feedback[choice.value];
  }

  if (Array.isArray(choice.label)) {
    choice.label.forEach(({ lang, value }) => {
      if (!out.translations[lang]) {
        out.translations[lang] = {}
      }
      out.translations[lang][choiceKey.substring(1)] = value;
    });
  }

  return out;
}

export function applyPromptChange(pieModel, update, lang) {
  if (!lang) {
    pieModel.model.prompt = update;
    pieModel.translations = clearTranslations(pieModel.translations, 'PROMPT');
  } else {
    pieModel.translations[lang] = pieModel.translations[lang] || {};
    pieModel.translations[lang]['PROMPT'] = update;
    pieModel.model.prompt = '$PROMPT';
  }

  return pieModel;

}