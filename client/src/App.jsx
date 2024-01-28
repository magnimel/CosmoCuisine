import styles from "./styles.module.css";
import food from "./assets/food.svg";
import { useState } from "react";
import CardList from "./components/CardList";

const cards = [
  {
    id: 1,
    name: 'Apple',
    content: 'This is the content of Card 1',
    logo: 'apple.png',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Apple',
    content: 'This is the content of Card 2',
    logo: 'apple.svg',
    quantity: 2,
  },
  {
    id: 3,
    name: 'Apple',
    content: 'This is the content of Card 3',
    logo: 'apple.svg',
    quantity: 2,
  },
  // {
  //   id: 4,
  //   name: 'Apple',
  //   content: 'This is the content of Card 1',
  //   logo: 'apple.png',
  //   quantity: 1,
  // },
  // {
  //   id: 5,
  //   name: 'Apple',
  //   content: 'This is the content of Card 2',
  //   logo: 'apple.svg',
  //   quantity: 2,
  // },
  // {
  //   id: 6,
  //   name: 'Apple',
  //   content: 'This is the content of Card 3',
  //   logo: 'apple.svg',
  //   quantity: 2,
  // },
  // Add more cards as needed
];

export default function App() {
  const [userPrompt, setUserPrompt] = useState("");
  const [sqlQuery, setSqlQuery] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const query = await generateQuery();
    setSqlQuery(query);
  };

  const generateQuery = async () => {
    const response = await fetch("http://localhost:3002/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: userPrompt }),
    });

    const data = await response.json();
    return data.sqlQuery.trim();
  };

  return (
    <main className={styles.main}>
      <img src={food} className={styles.icon} alt="temp-logo" />
      <input
        type="text"
        name="ingredient-name"
        placeholder="Add items"
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
      />
      <form onSubmit={() => { }}>
        <input type="submit" value="Add items" />
      </form>
      <CardList />
      <form onSubmit={onSubmit}>
        <input type="submit" value="Generate query" />
      </form>
      <pre>{sqlQuery}</pre>

      <div className={styles.recipe}>
        Preparation Time: 10 minutes
        Difficulty: Easy

        Ingredients:
        1 banana
        1 egg
        2 apples

        Kitchen Tools Needed:
        Mixing bowl
        Whisk or fork
        Frying pan
        Spatula

        Instructions:
        Peel the banana and mash it in a mixing bowl using a fork.
        Crack the egg into the bowl with the mashed banana.
        Whisk or beat the egg and banana together until well combined.
        Core and thinly slice the apples.
        Heat a frying pan over medium heat.
        Dip each apple slice into the banana-egg mixture, coating both sides.
        Place the coated apple slices onto the hot frying pan and cook for about 2-3 minutes on each side until golden brown.
        Remove the cooked apple slices from the pan and repeat the process with the remaining slices.
        Serve the banana egg-coated apple slices warm.

        Macros:
        Calories: Approximately 150 calories per serving

        Cautions/Tips:
        Make sure to use ripe bananas for better taste and texture.
        The recipe can be easily doubled or adjusted based on the available ingredients and number of people.
      </div>
    </main >
  );
}
