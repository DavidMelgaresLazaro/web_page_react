import express from "express";

const gamesRouter = express.Router();

gamesRouter.get("/", (req, res) => {
  res.send("todos los juegos");
});

gamesRouter.get("/:gameId", (req, res) => {
  res.send({ id: 1, title: "Call of Duty" });
});

gamesRouter.post("/", (req, res) => {
  res.send("game añadido");
});

gamesRouter.delete("/:gameId", (req, res) => {
  res.send("game borrada");
});

export default gamesRouter;
