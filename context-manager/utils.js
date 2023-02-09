function evaluate({ formula, values }) {
  let str = formula;
  for (let val in values) {
    str = str.replaceAll(val, values[val]);
  }

  return eval(str);
}

module.exports = {
  evaluate,
};
