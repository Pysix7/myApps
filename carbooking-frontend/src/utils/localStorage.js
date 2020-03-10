export const getLSItem = key => {
  const lsData = window.localStorage.getItem(key);

  let data;
  if (lsData) {
    data = JSON.parse(lsData);
  }
  return data;
};

export const setLSItem = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

export const removeLSItem = key => {
  window.localStorage.removeItem(key);
};
