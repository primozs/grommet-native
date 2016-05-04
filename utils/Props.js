// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

function pick (props, fields) {
  const has = (p) => props.hasOwnProperty(p);
  const obj = {};
  (fields || []).forEach((field) => {
    if (has(field))
      obj[field] = props[field];
  });
  return obj;
}

function omit (props, fields) {
  const obj = {};
  Object.keys(props).forEach((p) => {
    if ((fields || []).indexOf(p) === -1) {
      obj[p] = props[p];
    }
  });
  return obj;
}

export default {
  omit: omit,
  pick: pick
};
