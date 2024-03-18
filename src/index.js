const search = (items, token) => {
  const term = token.match(/\w+/g)[0];
  const regex = new RegExp(`\\b${term}\\b`, 'gmi');

  return items
    .map((item) => {
      const { id, text } = item;
      const relevance = (text.match(regex) || []).length;
      return { id, text, relevance };
    })
    .filter(({ relevance }) => relevance)
    .sort((a, b) => b.relevance - a.relevance)
    .map(({ id }) => id);
};

export default search;
