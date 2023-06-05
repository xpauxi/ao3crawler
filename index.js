var oldHits = "none";
const axios = require("axios"); 
const cheerio = require("cheerio");
const express = require('express');
const http = require('http'); 
const { Telegraf } = require('telegraf');
const bot = new Telegraf(process.env.botToken);

function main() {
    const app = express();
    const router = express.Router();

    router.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
    });

    router.get('/health', (req, res) => {
    res.status(200).send('Ok');
    });

    app.use('/api/v1', router);

    const server = http.createServer(app);
    server.listen(3000);
    console.log("started");

    loop();
}

function loop() {
    setTimeout(async function () { 
        const pageHTML = await axios.get(env.process.crawlURL);
    
        // initializing cheerio 
        const $ = cheerio.load(pageHTML.data);

        const hits = $('.hits').text();
        if(hits !== oldHits) {
            bot.telegram.sendMessage(process.env.chatId, hits);
        }
        oldHits = hits;
        main();
    }, 300000); 
}

main()