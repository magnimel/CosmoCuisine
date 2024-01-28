import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

app.use(cors(
  { origin: "*" }
));

const port = process.env.PORT || 3002;

const prisma = new PrismaClient();

import generate from "./generate.js";
import vision from "./vision.js";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

app.post("/generate", async (req, res) => {
  const { queryDescription } = req.body
  try {
    const sqlQuery = await generate(queryDescription);
    res.json({ sqlQuery });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/vision", async (req, res) => {
  const { base64Image } = req.body;
  try {
    const imageAnalysis = await vision(base64Image);
    res.json({ imageAnalysis });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// ingredients curl
// query all the ingredients
app.get("/api/ingredients", async (req, res) => {
  const ingredients = await prisma.ingredients.findMany();
  res.json(ingredients);
});

// create a new ingredient
app.post("/api/ingredients", async (req, res) => {
  const { name, quantity } = req.body;
  if (!name) {
    return res.status(400).send("ingredient name is required");
  }

  try {
    const newIngredient = await prisma.ingredients.create({
      data: {
        name,
        quantity,
      },
    });
    res.json(newIngredient);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }

});

// update quantity of an ingredient
app.put("/api/ingredients/:id", async (req, res) => {
  const { id } = req.params;
  const { name, operation } = req.body;
  let { quantity } = req.body;
  if (operation === "add") {
    quantity = quantity + 1;
  } else if (operation === "subtract") {
    quantity = quantity - 1;
  }

  try {
    const updatedIngredient = await prisma.ingredients.update({
      where: {
        food_id: parseInt(id),
      },
      data: {
        name,
        quantity,
      },
    });
    res.json(updatedIngredient);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// delete an ingredient
app.delete("/api/ingredients/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send("ID field required");
  }


  try {
    await prisma.ingredients.delete({
      where: {
        food_id: id,
      },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

//vision();


