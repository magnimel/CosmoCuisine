import styles from "./styles.module.css";
import food from "./assets/food.svg";
import { useState } from "react";
import CardList from "./components/CardList";
import ImageUploader from "./components/ImageUploader";
import cameraIcon from "./assets/camera.svg";

const cards = [
  {
    id: 1,
    name: "Apple",
    content: "This is the content of Card 1",
    logo: "apple.png",
    quantity: 1,
  },
  {
    id: 2,
    name: "Apple",
    content: "This is the content of Card 2",
    logo: "apple.svg",
    quantity: 2,
  },
  {
    id: 3,
    name: "Apple",
    content: "This is the content of Card 3",
    logo: "apple.svg",
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
  const [recipe, setRecipe] = useState(""); // State variable for the recipe

  const onSubmit = async (e) => {
    e.preventDefault();
    const query = await generateQuery();
    setSqlQuery(query);
  };

  const onSubmit2 = async (e) => {
    e.preventDefault();
    const txt = await fetchRecipe();
    setRecipe(txt);
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

  const fetchRecipe = async () => {
    try {
      const response = await fetch("http://localhost:3002/generate-recipe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setRecipe(data.recipe); // Assuming you have a state variable 'recipe' to store the fetched recipe
      return data.recipe;
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    const query = await generateQuery();
    setSqlQuery(query);
  };

  return (
    <main className={styles.main}>
      <img src={food} className={styles.icon} alt="temp-logo" />
      <div className={styles.inputbox}>
        <input
          type="text"
          name="ingredient-name"
          placeholder="Add items"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
        />
        <button
          type="button"
          onClick={() => { }} // Triggers file input click
          style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
        >
          <img className={styles.uploadIcon}
            src={cameraIcon} alt="Upload" />
        </button>
      </div>

      {/* <ImageUploader /> */}
      <form onSubmit={() => { }}>
        <input type="submit" value="Add items" />
      </form>
      <CardList />

      <form onSubmit={onSubmit2}>
        <input type="submit" value="Generate Recipe" />
      </form>


      <div className={styles.recipe}>
        <h2>Generated Recipe</h2>
        <pre>{recipe}</pre> {/* Display the fetched recipe */}
      </div>

    </main>
  );
}
