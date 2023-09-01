import express from "express";
import { join } from "path";
const router = express.Router();

router.route("/")
  .get((_, res) =>
    res.render(join("home", "index"), { title: "Home", pageTitle: "Hello ZMG!", css: "/css/index.css"})
  );

export default router;
