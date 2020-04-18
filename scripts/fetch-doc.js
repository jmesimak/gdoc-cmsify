const { gdocJsonify } = require("../src/app");

const id = process.argv[2];

gdocJsonify(id).then((res) => {
  console.log(res);
});
