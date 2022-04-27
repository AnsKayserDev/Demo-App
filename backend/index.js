const express = require("express");

const PORT = process.env.PORT || 4200;
const app = express();
var router = require('./services/router');
app.use('/api', router);


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api", (req, res) => {
  res.json({ message: "Server Connected!" });
});