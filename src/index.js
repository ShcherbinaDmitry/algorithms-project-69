const search = (items, subString) => {
  const str = subString.toLowerCase();

  return items
    .filter(({ text }) => text.toLowerCase().includes(str))
    .map(({ id }) => id);
};

export default search;
