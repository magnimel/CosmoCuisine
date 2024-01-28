import openaiClient from "./api.js";

let ingredientsString = ``;

const fetchIngredients = async () => {
  try {
    const response = await fetch("http://localhost:3002/api/ingredients");
    const data = await response.json();
    let ingredientsList = [];

    // Iterate through each item in the data array and add formatted strings to the list
    data.forEach((item) => {
      ingredientsList.push(`"${item.name}, quantity: ${item.quantity}"`);
    });

    // Join the array elements into a single string with each element on a new line
    ingredientsString = ingredientsList.join("\n");

    // Print the string
    //console.log(ingredientsString);
  } catch (error) {
    console.log(error);
  }
};

const generater = async () => {
  
    await fetchIngredients();

    //console.log(ingredientsString);  // not printing

    const message = [
      {
        role: "system",
        content: `You are a cooking chief specialized in making space friedndly recipes for humanity that has moved to space and now living in space stations.\n
        Your answer should be laid out like this: 
        Preparation Time: \n
        Difficulty:\n
        Ingredients:\n
        (amount used)
        Kitchen Tools Needed:\n
        Instructions:\n
        Macros:
        (calories)\n
        Cautions/Tips:
        (given that we are in space we want to limit waste and cook efficient)\n,
        note: you may or may not use every ingredients`
      },
      {
        role: "user",
        content: `Provide a recipe given the following food ingredients and options:\n\n${ingredientsString}`,
      },
    ];

    const response = await openaiClient.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: message,
    });

    const recipe = response.data.choices[0].message.content;
    return recipe;

};

export default generater;