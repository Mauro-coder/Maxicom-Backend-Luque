const sum = () => {
  let result = 0;
  for (let index = 0; index < 5e9; index++) {
    result += 1;
  }
  return result;
};

export default sum;
