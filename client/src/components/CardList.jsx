import React, { useState, useEffect } from "react";
import styles from "./Cardlist.module.css";
import Card from "./Card";

const CardList = () => {
    const [cards, setCards] = useState([]);
    const [render, setRender] = useState(0);

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
    }, [render]);

    const onAdd = (food_id) => {
        const newCards = cards.map((card) => {
            if (card.food_id === food_id) {
                card.quantity += 1;
            }
            return card;
        });
        setCards(newCards);
        // setRender((render) => render + 1);
    }

    const onSubstract = (food_id) => {
        const newCards = cards.map((card) => {
            if (card.food_id === food_id) {
                card.quantity -= 1;
            }
            return card;
        });
        setCards(newCards);
    }

    return (
        <div className={styles.cardList}>
            {cards.map((card) => (
                <Card key={card.id} card={card} onAdd={onAdd} onSubstract={onSubstract} />
            ))}
        </div>
    );
}

export default CardList;
