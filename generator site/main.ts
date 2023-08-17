import express, {Request, Response} from 'express'
import { engine } from 'express-handlebars'
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration); 

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')
app.use(express.urlencoded({extended: true}))

app.get('/', (request: Request, response: Response) => {
  response.render('index'); // rendering the handlebar as a res
});

app.post('/', async (request: Request, response: Response) => {
  // destructurize later if works 
  const prompt = request.body.prompt;
  const size = request.body.size ?? '512x512'; // nullish coalescing operator in case there is no value
  const number = request.body.number ?? 1;

  console.log(prompt, size, number);

  try {
    const response = await openai.createImage({
      prompt, // max prompt is 1000 symbols
      size, // an enum of 3 possible img sizes
      n: +number // the number of images to generate; must be between 1 and 10
    })

    console.log(response.data.data[0].url); // here should be the url of an image 
    
  } catch(err: any) {
    console.log(err);
  }
  
  response.render('index')
})

app.listen(3000, () => console.log('Up and running!'))
