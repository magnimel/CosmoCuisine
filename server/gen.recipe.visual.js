import openaiClient from "./api.js";

const recipeDescription = 

const visual = async (recipeDescription) => {
    
  response = openaiClient.createImage(
    (model = "dall-e-3"),
    (prompt = "Generate a visual for the following recipe: \n\n${recipeDescription}"),
    (size = "1024x1024"),
    (quality = "standard"),

    (n = 1)
  );
  image_url = response.data[0].url;
};

export default visual;

