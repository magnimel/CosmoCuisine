import React from "react";
import styles from "./Cardlist.module.css";
import Card from "./Card";

const CardList = ({ cards }) => {
    console.log(cards);

    return (
        <div className={styles.cardList}>
            {cards.map((card) => (
                <Card key={card.id} card={card} />
            ))}
        </div>
    );
}

export default CardList;
