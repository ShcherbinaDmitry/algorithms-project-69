const getSearchWords = (token) => token.match(/\w+/g);

const countRelevance = (text, words) => {
  const relevance = words.reduce((acc, term) => {
    const regex = new RegExp(`\\b${term}\\b`, 'gmi');
    return acc + (text.match(regex) || []).length;
  }, 0);

  return relevance;
};

const search = (items, token) => {
  const terms = getSearchWords(token);

  const res = items
    .map((item) => {
      const { id, text } = item;
      return {
        id,
        text,
        relevance: countRelevance(text, terms),
      };
    })
    .filter(({ relevance }) => relevance)
    .sort((a, b) => b.relevance - a.relevance)
    .map(({ id }) => id);

  return res;
};

export default search;
