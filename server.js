var express = require("express");
var cors = require("cors");
var app = express();
var path = require('path');
const { Client } = require("pg");
const client = new Client({
  user: "obaytyrubzuitq",
  host: "ec2-3-217-219-146.compute-1.amazonaws.com",
  database: "d8uiuhrhc7kvnu",
  password: "e76565fdbb65331e6328ec789c47a7be97e521a6c9d29e7d7d83726c052bc4e0",
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.post("/api/addCongrats", async (req, res) => {
    const { name, message } = req.body;
    await client.query(`INSERT INTO public."Wishes" VALUES('${name}', '${message}')`);
  res.status(200).send({
      message: 'creado con exito'
  });
});
app.use("/api/getCongrats", async (req, res) => {
    const { rows: results } = await client.query(`Select * from public."Wishes"`);

    res.status(200).send(results);
});

app.get("/*", function (req, res) {
  console.log(req.path, req.url);
  res.sendFile(path.join(__dirname, "/dist/birthday" + req.url), function (err) {
    if (err) {
      res.sendFile(path.join(__dirname, "/dist/birthday/index.html"  ));
    }
  });
});

app.listen(process.env.PORT || 3000, async () => {
  console.log("Server listening on http://localhost:3000");
  await client.connect();
});

module.exports = app;
