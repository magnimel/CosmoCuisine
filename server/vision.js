import openaiClient from "./api.js";
import { readFileSync } from "fs";

const vision = async () => {

  const encodeImage = (imagePath) => {
    const image = readFileSync(imagePath);
    return Buffer.from(image).toString("base64");
  };

  const imagePath = "../client/src/assets/input.vision/item.jpg";
  const base64Image = encodeImage(imagePath);

   const response = await openaiClient.createChatCompletion({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Analyze this image and list the basic food items that can be considered ingredients for a recipe. Format the output in CSV with columns name then quantity, where names are in singular form. DO NOT include the first row for the titles",
          },
          {
            type: "image_url",
            image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
            },
          },
        ],
      },
    ],
  });
  console.log(response.data.choices[0].message.content);
  // const ingredients = getFromDB();

  const recipe = response.data.choices[0].message.content;
};

export default vision;
