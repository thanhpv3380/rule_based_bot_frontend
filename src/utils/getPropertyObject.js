const getPropertyObject = (data) => {
  const arr = [];
  const cloneObject = (el, key) => {
    if (Array.isArray(el)) {
      el.forEach((item, index) => {
        if (typeof el[index] !== 'object') {
          arr.push(`${key}[${index}]`);
        } else {
          cloneObject(item, `${key}[${index}]`);
        }
      });
    } else {
      const listKeys = Object.keys(el);
      listKeys.forEach((item) => {
        if (typeof el[item] !== 'object') {
          if (key !== '') {
            arr.push(`${key}.${item}`);
          } else {
            arr.push(`${item}`);
          }
        } else {
          const str = !key ? `${item}` : `${key}.${item}`;
          cloneObject(el[item], str);
        }
      });
    }
  };
  if (typeof data !== 'object') {
    return ['response'];
  }

  if (Array.isArray(data)) {
    cloneObject(data, 'response');
  } else {
    cloneObject(data, '');
  }
  return arr;
};

export default getPropertyObject;
