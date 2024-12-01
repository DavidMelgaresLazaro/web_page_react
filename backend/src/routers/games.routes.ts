import express from "express";

const gamesRouter = express.Router();

gamesRouter.get("/", (req, res) => {
  res.send("todos los usuarios");
});

gamesRouter.get("/:gameId", (req, res) => {
  res.send({ id: 1, title: "David" });
});

gamesRouter.post("/", (req, res) => {
  res.send("user añadido");
});

gamesRouter.delete("/:userId", (req, res) => {
  res.send("game borrada");
});

export default gamesRouter;
