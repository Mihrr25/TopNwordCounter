const axios = require('axios');
const cheerio = require('cheerio');

async function arrayCreator(url) {

    function extractVisibleText(htmlContent) {

        const $ = cheerio.load(htmlContent);
        $('script, style').remove();
        const visibleText = $('body')
            .text()
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();
    
        return visibleText;
    }

    async function fetchHtml(url) {

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            // console.error(`Error fetching the URL: ${error.message}`);
            return null;
        }

    }
    if (!url) {
        // console.log('Please provide a URL as an argument.');
        return null;
    }

    const htmlContent = await fetchHtml(url);
    if (htmlContent) {
        const visibleText = extractVisibleText(htmlContent);
        // console.log('Visible Text Extracted:\n');
        // console.log(visibleText.split(" "));
        return visibleText.split(" ")
    }
    return null;

    
}
module.exports={
    arrayCreator
};
