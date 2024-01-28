import styles from "./styles.module.css";
import sqlServer from "./assets/sql-server.png";
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
      body: JSON.stringify({ queryDescription: userPrompt }),
    });

    const data = await response.json();
    return data.sqlQuery.trim();
  };

  return (
    <main className={styles.main}>
      <img src={sqlServer} className={styles.icon} alt="SQL server" />
      <h3>Generate SQL</h3>
      <input
        type="text"
        name="query-description"
        placeholder="Add items"
        value={userPrompt}
        onChange={(e) => setUserPrompt(e.target.value)}
      />
      <CardList />
      <form onSubmit={onSubmit}>

        <input type="submit" value="Generate query" />
      </form>
      <pre>{sqlQuery}</pre>
    </main>
  );
}
