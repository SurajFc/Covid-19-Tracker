const NumberFormat = (x) => {
  if (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return "";
};

export default NumberFormat;
