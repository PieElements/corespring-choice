import cloneDeep from 'lodash/cloneDeep';

/**
 * convert to a more react friendly form 
 * @param {*} pieModel 
 */
export function convert(pieModel) {

  function choiceTranslations(choice) {

    if (!pieModel.translations) {
      return [];
    }

    let defaultLocale = pieModel.translations.default_locale;
    let defaultTranslations = pieModel.translations[defaultLocale];

    return _(pieModel.translations).map((lookup, lang) => {
      if (lang === 'default_locale') {
        return null;
      }

      let isLookup = choice.label.startsWith('$');

      if (isLookup) {
        let lookupKey = choice.label.substring(1);
        let value = lookup[lookupKey] || '';
        console.log('[choiceTranslations] LOOKUP :  choice', choice.value, 'value: ', value, 'label: ', lookupKey, 'lang: ', lang);
        return { lang, value, label: lookupKey }
      } else {
        let value = choice.label;
        let label = choice.label;
        console.log('[choiceTranslations] value: ', value, 'label: ', label, 'lang: ', lang);
        return { lang, value, label }
      }
    }).compact().value();
  }

  let out = cloneDeep(pieModel.model);

  out.choices = out.choices.map(c => {
    c.correct = pieModel.correctResponse.indexOf(c.value) !== -1;
    c.feedback = pieModel.feedback[c.value];
    c.translations = choiceTranslations(c);
    return c;
  });
  out.langs = _(pieModel.translations).keys().without('default_locale').value();
  out.defaultLang = pieModel.translations.default_locale;
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

  let oldChoice = pieModel.model.choices[choiceIndex];
  pieModel.correctResponse = removeIfNeeded(pieModel.correctResponse, oldChoice.value);

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
  //update translations
  choice.translations.forEach(({ lang, label, value }) => {
    let lookup = out.translations[lang]
    lookup[label] = value;
  });

  return out;
}