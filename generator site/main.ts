import express from 'express'
import { engine } from 'express-handlebars'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: "your-api-key-here",
})
const openai = new OpenAIApi(configuration)

const app = express()

app.engine('handlebars', engine()); // setting up the view engine 
app.set('view engine', 'handlebars');
app.set('views', './views'); // setting the directory of template files
app.use(express.urlencoded({ extended: true })); // handling url-encoded form data
app.use(express.static('public')); // connecting the css file 

app.get('/', (_, res) => { 
  res.render('index') // sending html as a res
})

app.post('/', async (req, res) => {
  // todo: destructurize later if works
  const prompt = req.body.prompt
  const size = req.body.size ?? '512x512' // nullish coalescing in case no value
  const number = req.body.number ?? 1

  console.log(prompt, size, number);

  try {
    const response = await openai.createImage({
      prompt, // max prompt is 1000 symbols
      size, // 3 possible img sizes
      n: Number(number), // num of images to generate, min 1 max 10
    })

    console.log(response.data.data) // here should be the url of an image

    res.render('index', {
      images: response.data.data,
    })
  } catch (e) {
    console.log(e);
  }
})

app.listen(3000, () => console.log('Server started on:\nhttp://localhost:3000/'))