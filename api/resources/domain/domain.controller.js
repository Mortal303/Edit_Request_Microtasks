/** 
 * Api Domain Controller Handler
*/
const fetch = require('node-fetch');
const cheerio = require("cheerio");



//Function to validate if a source exist or not
var validateUrl = async function (req, res, next) {
    try {
        fetch(req.body.url)
            .then((response) => {
                return res.status(200).json({
                    code: response.status
                })
            })
            .catch((error) => {
                return res.status(200).json({
                    code: 404
                })
            });
    } catch (error) {
        console.log("error");
        return res.status(409).json({
            message: "Something Went Wrong"
        })
    }
}

//Final submission of edit request after all successful checks
var submitEditRequest = async function (req, res, next) {
    if (req) {
        return res.status(200).json({
            success: true,
            message: "Submitted Edit Request"
        })
    } else {
        return res.status(409).json({
            success: false,
            message: "Something Went Wrong"
        })
    }
}

//Function to extract raw data from website
const getRawData = async (URL) => {
    return fetch(URL)
        .then((response) => response.text())
        .then((data) => {
            return data;
        });
};

//Function to validate if given quote is from given source or not
var validateSource = async function (req, res, next) {
    var quote = req.body.quote;
    var url = req.body.url;
    const rawData = await getRawData(url);
    const $ = cheerio.load(rawData);
    var allText = $('html').text();
    allText = allText.replace(/(\r\n|\n|\r)/gm, "");
    allText = allText.replace(/\s/g,'');
    quote = quote.replace(/(\r\n|\n|\r)/gm, "");
    quote = quote.replace(/\s/g,'');
    console.log(allText);
    console.log('\n');
    console.log(quote);
    if (allText.includes(quote)) {
        return res.status(200).json({
            success: true,
        })
    } else {
        return res.status(409).json({
            success: false,
            message: "Quote Is Not From Source"
        })
    }
    
}

module.exports.validateUrl = validateUrl;
module.exports.submitEditRequest = submitEditRequest;
module.exports.validateSource = validateSource;