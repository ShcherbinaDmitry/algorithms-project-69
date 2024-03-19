// @ts-check

import _ from 'lodash';

import {
  normalizeToken, normalizeTerms, buildInvertedIndex, calculateIDF, merge,
} from './helpers.js';

const searchEngine = (documents, needle) => {
  const docsCount = documents.length;

  const docsTerms = documents.reduce((acc, doc) => {
    const { id, text } = doc;
    const lines = text.split('\n');
    const terms = lines
      .flatMap((line) => line.split(' '))
      .map(normalizeToken)
      .filter((word) => word !== null);

    return { ...acc, [id]: terms };
  }, {});

  const invertedIndexes = documents.map((doc) => {
    const docTerms = docsTerms[doc.id];
    const docInvertedIndex = buildInvertedIndex(docTerms);
    return Object.keys(docInvertedIndex)
      .reduce((acc, term) => {
        const termCount = docInvertedIndex[term];
        const termFrequency = termCount / docTerms.length;
        return { ...acc, [term]: { docId: doc.id, termFrequency, count: termCount } };
      }, {});
  });

  const index = invertedIndexes.reduce((acc, documentIndex) => merge(acc, documentIndex), {});

  Object.keys(index).forEach((term) => {
    const termDocs = index[term];
    const termDocsCount = termDocs.length;

    termDocs.forEach((doc) => {
      const { termFrequency } = doc;
      const docIdf = calculateIDF(docsCount, termDocsCount);
      const tfIDF = termFrequency * docIdf;
      // eslint-disable-next-line no-param-reassign
      doc.tfIDF = tfIDF;
    });
  });

  const search = (token) => {
    const terms = normalizeTerms(token);

    const currentIndex = _.pick(index, terms);

    const groupByDocId = _.groupBy(_.flatten(Object.values(currentIndex)), 'docId');
    const currentDocsIds = Object.keys(groupByDocId);
    const weightedDocs = currentDocsIds.reduce((acc, docId) => {
      const values = groupByDocId[docId];
      const sumIdf = values
        .map((value) => value.tfIDF)
        .reduce((sum, val) => sum + val, 0);
      return { ...acc, [docId]: sumIdf };
    }, {});

    return currentDocsIds.sort((a, b) => weightedDocs[b] - weightedDocs[a]);
  };

  return search(needle);
};

export default searchEngine;
