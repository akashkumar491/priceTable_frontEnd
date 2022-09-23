const getBasePriceTable = async () => {
  const data = await fetch("http://localhost:3000/basePrice");
  console.log(data, "6767");
};

export { getBasePriceTable };
