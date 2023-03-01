const express = require('express') ;
const app = express();
const {Configuration, OpenAIApi} = require('openai');
const BodyParser = require('body-parser');
const path = require('path');
require("dotenv").config();

const configuration = new  Configuration({
    apiKey: process.env.OPEN_AI_KEY
});
const  openai  = new  OpenAIApi(configuration);

app.use(BodyParser.urlencoded({extended: true})); 
app.use(BodyParser.json());



app.set('views', path.join(__dirname, './view'))
app.set('view engine','ejs');



app.get('/chat', (req, res) => { 
    res.render('chat', {data: ''});
});

app.get('/chat/:question' , async(req, res) => {
        const question = req.params.question;
        console.log(question);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${question}`,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
            stop: ["AI:"],
          });
          res.render('chat',{data:response.data.choices[0].text})
});

app.get('/', (req, res) => {
    res.send('halaman login');
});  

app.listen(5000, () => {
    console.log("app listening on port 5000");
});



