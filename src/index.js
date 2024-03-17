const search = (items, token) => {
  const term = token.match(/\w+/g)[0];

  return items
    .filter(({ text }) => text.toLowerCase().includes(term))
    .map(({ id }) => id);
};

export default search;
