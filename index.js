import { OpenAI } from "openai";
import express from 'express'
import cors from 'cors';
import bodyParser from "body-parser";

const openai = new OpenAI( { apiKey: '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'} );


const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3080;

app.post('/', async (req, res) => {
    const { message, currentModel } = req.body;
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: `${message}` }],
        model: `${currentModel}`
      });
    
      res.json({
        message: completion.choices[0].message.content,
      })
}); 

app.get('/models', async (req, res) => {
    const response = await openai.models.list();
    console.log(response)
    res.json({
        models: response.data
    })
}); 

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});