import express from "express";
import dotenv from "dotenv";
import { join } from "path";
import ejs from "ejs";
import db from "./data/sqlite.js";
import indexController from "./controllers/index.js";
import animalController from "./controllers/animal.js";
dotenv.config();
const app = express();
// app middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
// ejs config
app.engine(".html",ejs.renderFile);
app.set("view engine", "html");
app.set("views", join(process.cwd(), "src", "views"));
// controllers
app.use("/", indexController);
app.use("/animal", animalController);
// not found
app.all("*", (req, res) => 
  res.render("404")
);
// listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App is listening on http://localhost:${PORT}`));
process.on("exit", () => db.close());
