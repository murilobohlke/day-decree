import express from "express";
import { prisma } from "./prisma";
import { scheduleJob } from "node-schedule";

export const routes = express.Router();

let skip = 0;

export function changeDecree() {
  scheduleJob("0 0 * * *", async function () {
    const length = await prisma.decree.count();
    skip = Math.floor(Math.random() * length);

    console.log("Change sentence ", skip);
  });
}

routes.post("/decree", async (req, res) => {
  const { content } = req.body;

  try {
    const decree = await prisma.decree.create({
      data: {
        content,
      },
    });

    return res.status(201).json({ data: decree });
  } catch (error) {
    res.status(500).json();
  }
});

routes.get("/decree", async (_, res) => {
  try {
    const decree = await prisma.decree.findFirst({
      skip: skip,
      take: 1,
      orderBy: { count: "asc" },
    });

    return res.status(200).json({ decree });
  } catch (error) {
    res.status(500).json();
  }
});

routes.get("/decrees", async (_, res) => {
  try {
    const decrees = await prisma.decree.findMany({ orderBy: { count: "asc" } });

    return res.status(200).json({ decrees });
  } catch (error) {
    res.status(500).json();
  }
});

routes.delete("/decree", async (req, res) => {
  const { id } = req.body;

  try {
    await prisma.decree.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    res.status(500).json();
  }

  return res.status(200).json();
});
