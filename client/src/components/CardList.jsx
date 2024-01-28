import React, { useState, useEffect } from "react";
import styles from "./Cardlist.module.css";
import Card from "./Card";

const CardList = () => {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await fetch("http://localhost:3002/api/ingredients");
                const data = await response.json();
                setCards(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchIngredients();
    }, []);

    return (
        <div className={styles.cardList}>
            {cards.map((card) => (
                <Card key={card.id} card={card} />
            ))}
        </div>
    );
}

export default CardList;
