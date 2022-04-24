const sendData = (res, data) => {
  res.send({
    data,
    message: "Success",
    error: false,
  });
};
export default sendData;
