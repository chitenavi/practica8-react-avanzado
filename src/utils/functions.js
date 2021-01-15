const haveSameData = (dataForm1, dataForm2) => {
  return JSON.stringify(dataForm1) === JSON.stringify(dataForm2);
};

export default haveSameData;
