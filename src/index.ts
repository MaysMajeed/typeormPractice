import * as express from "express";
import * as bodyParser from "body-parser";
import "reflect-metadata";
import { createConnection } from "typeorm";
const app = express();
import router from "./routes/V1";

createConnection()
  .then(async (connection) => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use("/V1", router);

    app.listen(3000, () => {
      console.log("listening to port 3000");
    });
  })
  .catch((error) => console.log(error));
