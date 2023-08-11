playing around with openAI API for image generation on NodeJS; simple server with express handlebars (npm i express-handlebars) to represent the html (like ejs for http servers);

get your API key here:
https://platform.openai.com/account/api-keys

download openAI nodejs library here (allows you to work with ):
https://www.npmjs.com/package/openai
npm install openai

Tip for initializing:

    const { Configuration, OpenAIApi } = require("openai");

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: "Hello world"}],
    });
    console.log(chatCompletion.data.choices[0].message);