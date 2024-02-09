# CosmoCuisine

## Overview
CosmoCuisine is an innovative web application designed for humanity's new era in space. Focusing on the unique challenges of living in space stations, CosmoCuisine provides space-friendly cooking recipes and strategies, helping users make the most of their resources in a confined and unusual environment. By integrating advanced technologies like ChatGPT-powered recipe generation and AI-driven ingredient recognition, CosmoCuisine stands at the forefront of culinary innovation in space.

## Features
- **Mobile-Friendly Interface**: A responsive, space-themed design suitable for various devices.
- **AI-Powered Recipe Suggestions**: Utilizes ChatGPT to generate recipes based on available ingredients.
- **Ingredient Recognition**: Allows users to upload/take picture of ingredients, which are then automatically recognized and added to their pantry.
- **Manual Ingredient Management**: Users can manually add, edit, or remove ingredients from their virtual pantry.
- **Customizable Recipe Generation**: Offers multiple filters to tailor recipes to specific needs and preferences, considering the space environment.
- **Space Cooking Strategies**: Provides tips and content on cooking techniques suitable for space stations such waste management & cautions.

## Installation

### Installing Dependencies
To install the dependencies for both the client and server, navigate to each folder and run the following command:

```bash
npm install
```
### Running the Client

To run the client, navigate to the client folder and run the following command:

```
npm run dev
```

The client will be available at http://localhost:3000/.

### Running the Server

To run the server, navigate to the server folder and run the following command:

```
npm start
```

## Technologies
- **Front End**: The front end is built with [React](https://reactjs.org/), a popular JavaScript library for building user interfaces.
- **Back End**: The back end is developed using [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/), a minimal and flexible Node.js web application framework.
- **Database**: For database management, [PostgreSQL](https://www.postgresql.org/) is used, which is a powerful, open-source object-relational database system.
- **ORM (Object-Relational Mapping)**: [Prisma](https://www.prisma.io/) is employed as an open-source database toolkit, making database access easy and type-safe.
- **AI-Powered Features**: Integrates the [OpenAI's ChatGPT API](https://beta.openai.com/signup/) for generating recipes and providing culinary suggestions, bringing advanced AI capabilities to the application.
