import React from "react";
import styles from "./Card.module.css";
//import logopath from '../assets/apple.svg';

const Card = ({ card, onAdd, onSubstract }) => {
    const { food_id, name, quantity } = card;
    const logopath = "/src/assets/" + name + ".svg";

    return (
        <div className={styles.card}>
            <div className={styles.name}>{name}</div>
            <img className={styles.logo} src={logopath}></img>
            <div className={styles.operation}>
                <button className={styles.button} onClick={() => onAdd(food_id)}>+</button>
                <button className={styles.button} onClick={() => onSubstract(food_id)}>-</button>
                <div className={styles.quantity}>{quantity}</div>
            </div>

        </div>
    );
}

export default Card;