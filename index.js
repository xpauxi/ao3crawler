var oldHits = "none";
const axios = require("axios"); 
const cheerio = require("cheerio"); 
const { Telegraf } = require('telegraf');
const bot = new Telegraf("6021726217:AAEy_GeNEmooaTSbuvBqqfycL_X6nHl0NmY");

function main() {
    setTimeout(async function () { 
        const pageHTML = await axios.get("https://archiveofourown.org/works/46847716/chapters/119871850");
    
        // initializing cheerio 
        const $ = cheerio.load(pageHTML.data);

        const hits = $('.hits').text();
        if(hits !== oldHits) {
            bot.telegram.sendMessage(459165464, hits);
        }
        oldHits = hits;
        main();
    }, 300000); 
}

main()