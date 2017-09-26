export function iterToLookup(iter, keyFunc) {
  return iter.reduce(function addToLookup(lookup, value) {
    const key = keyFunc(value);

    lookup[key] = value;

    return lookup;
  }, {});
};

export default {
  iterToLookup
};
