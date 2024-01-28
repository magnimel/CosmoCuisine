import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import styles from "./Cardlist.module.css";
import Card from "./Card";

const CardList = forwardRef((props, ref) => {
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

    // 子组件内部的函数
    const addMongos = () => {
        console.log('我要加橙子啦');
        const newCard = {
            food_id: 10,
            name: "Orange",
            logo: "orange.svg",
            quantity: 3,
        };
        setCards([...cards, newCard]);
    };

    // 将函数暴露给父组件
    useImperativeHandle(ref, () => ({
        addMongos
    }));

    return (
        <div className={styles.cardList}>
            {cards.map((card) => (
                <Card key={card.id} card={card} onAdd={onAdd} onSubstract={onSubstract} />
            ))}
        </div>
    );
});

export default CardList;
