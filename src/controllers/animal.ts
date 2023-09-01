import express from "express";
import db from "../data/sqlite.js";
import { join } from "path";
import { type Animal } from "@types2/Animal.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const animals: Animal[] = await db.all("SELECT * FROM animals");
    res.render(join("animal", "index"), { title: "Animals", css: "/css/animal.css", animals: animals });
  }
  catch (e: unknown) {
    console.error(e);
    res.send("There is a problem with our system.")
  }
});
router.get("/info/:id", async (req, res) => {
  try {
    const animal: Animal | undefined = await db.get(`SELECT * FROM animals WHERE id = ${req.params.id}`);
    if (!animal)
      res.render("404");
    else {
      res.render(join("animal", "info"), { title: `${animal.name}'s Info`, css: "/css/animal.css", animal });
    }
  }
  catch (e: unknown) {
    console.error(e);
    res.send("there is a problem with our system.");
  }
});

router.route("/create")
  .get((_, res) =>
    res.render(join("animal", "create"), { title: "Create", css: "css/animal.css", errors: [""] })
  )
  .post(async (req, res) => {
    if (!req.body.name)
      res.render(join("animal", "create"), { title: "Create", css: "css/animal.css", errors: ["Name field can't be empty."] });
    try {
      await db.run(`INSERT INTO animals (name) VALUES ('${req.body.name}')`);
      res.redirect("/animal");
    }
    catch (e: unknown) {
      console.error(e);
      res.send("there is a problem with our system.");
    }
  });


router.route("/delete/:id")
  .get(async (req, res) => {
    const animal: Animal | undefined = await db.get(`SELECT * FROM animals WHERE id = ${req.params.id}`);
    if (animal)
      res.render(join("animal", "delete"), { title: "Delete", css: "css/animal.css", animalId: animal.id });
    else {
      res.render("404");
    }
  })
  .post(async (req, res) => {
    try {
      await db.run(`DELETE FROM animals WHERE id = ${req.params.id}`);
      res.redirect("/animal");
    }
    catch (e: unknown) {
      console.error(e);
      res.send("there is a problem with our system.");
    }
  });

router.route("/update/:id")
  .get(async (req, res) => {
    const animal: Animal | undefined = await db.get(`SELECT * FROM animals WHERE id = ${req.params.id}`);
    if (animal) {
      res.render(join("animal", "update"), { title: "Update", css: "/css/animal.css", animal });
    }
  })
  .post(async (req, res) => {
    try {
      await db.run(`UPDATE animals SET name = '${req.body.name}' WHERE id = ${req.params.id}`);
      res.redirect("/animal");
    }
    catch (e: unknown) {
      console.error(e);
      res.send("there is a problem with our system.");
    }
  });

export default router;
