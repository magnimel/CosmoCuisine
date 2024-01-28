import styles from "./styles.module.css";
import food from "./assets/food.svg";
import { useState } from "react";
import CardList from "./components/CardList";

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
  const [recipe, setRecipe] = useState(""); // State variable for the recipe

  const onSubmit1 = async (e) => {
    e.preventDefault();
  
    // Check if the user has entered a name for the ingredient
    if (!userPrompt.trim()) {
      alert("Please enter an ingredient name.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3002/api/ingredients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userPrompt,
          quantity: 1 // Sending a default quantity of 1
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Ingredient added/updated successfully:', data);
      
      // Clear the input field after successful submission
      setUserPrompt("");
  
      // Optionally, fetch the updated ingredients list here to refresh your UI
  
    } catch (error) {
      console.error('Error submitting ingredient:', error);
      alert('Failed to submit ingredient. Please try again.');
    }
  };
  

  const onSubmit2 = async (e) => {
    e.preventDefault();
    const txt = await fetchRecipe();
    setRecipe(txt);
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

  return (
    <main className={styles.main}>
      <img src={food} className={styles.icon} alt="temp-logo" />
      <input
        type="text"
        name="ingredient-name"
        placeholder="Ingredients ..."
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
      />
      <form onSubmit={onSubmit1}>
        <input type="submit" value="Add item" />
      </form>
      <br></br>

      <CardList />
      
      <form onSubmit={onSubmit2}>
        <input type="submit" value="Generate Recipe"/>
      </form>
    

      <div className={styles.recipe}>
      <h2>Generated Recipe</h2>
        <pre>{recipe}</pre> {/* Display the fetched recipe */}
      </div>
      
    </main>
  );
}
