import React from "react";
import styles from "./Card.module.css";
//import logopath from '../assets/apple.svg';

const Card = ({ card }) => {
    const name = card.name;
    const quantity = card.quantity;
    const logopath = "/src/assets/" + name + ".svg";
    console.log(logopath);

    return (
        <div className={styles.card}>
            <div className={styles.name}>{name}</div>
            <img className={styles.logo} src={logopath}></img>
            <div className={styles.operation}>
                <button className={styles.button}>+</button>
                <button className={styles.button}>-</button>
                <div className={styles.quantity}>{quantity}</div>
            </div>

        </div>
    );
}

export default Card;