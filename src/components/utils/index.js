export const removeNullValues = (object) => {
  const filteredObject = Object.fromEntries(
    Object.entries(object).filter(([_, value]) => value !== null)
  );

  return Object.keys(filteredObject).length === 0 ? null : filteredObject;
};