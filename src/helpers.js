import _ from 'lodash';

export const normalizeToken = (str) => {
  const matched = str.match(/\w+/g);
  if (matched) {
    return matched
      .join('')
      .toLowerCase();
  }
  return null;
};

export const normalizeTerms = (str) => str.split(' ').map(normalizeToken).filter((word) => word !== null);

export const buildInvertedIndex = (terms) => terms.reduce((acc, term) => {
  const value = acc[term] ?? 0;
  return { ...acc, [term]: value + 1 };
}, {});

export const calculateIDF = (docsCount, termCount) => {
  const result = Math.log2(1 + (docsCount - termCount + 1) / (termCount + 0.5));
  return result;
};

export const merge = (object1, object2) => {
  const keys = _.union(_.keys(object1), _.keys(object2));

  return keys.reduce((acc, key) => {
    if (object1[key] && object2[key]) {
      const value1 = object1[key];
      const value2 = object2[key];
      return { ...acc, [key]: _.flatten([value1, value2]) };
    }
    if (object1[key]) {
      const value = object1[key];
      const normalizedValue = _.isArray(value) ? value : [value];
      return { ...acc, [key]: normalizedValue };
    }
    const value = object2[key];
    const normalizedValue = _.isArray(value) ? value : [value];
    return { ...acc, [key]: normalizedValue };
  }, {});
};
