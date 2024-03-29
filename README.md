# Edit Request Validation

This repo is to show case microtasks of [Edit Request Wizard]() for Outreacy and GSOC.

## Overview 

## How to use website

To know detail about how to use and different functionalities used in website please refer to [HOW_TO_USE.md](./HOW_TO_USE.md)

## How To Use


# Entering A Quote

First you need to go at my microtask [https://abhigya-pandey-editrequest.herokuapp.com/](https://abhigya-pandey-editrequest.herokuapp.com/).
Then you will see a webpage something like -

<p align="center"><img src="public/images/home.png"></p>

Now enter a quote from a valid source to complete your edit request.
If you enter a null string or same charatcher repeated in complete string, you will recive an error saying "Not a Valid Quote" on submiting the form.

<p align="center"><img src="public/images/invalidQuote1.png"></p>

Function to validate Quote is as follows in [./public/js/app/index.js](./public/js/app/index.js) file.

<p align="center"><img src="public/images/validateTextarea.png"></p>


# Selecting A Source

Once you enter a valid Quote you will be asked to select a source type from which your quote belongs.
Then some input fields will appear according to your selected source type. You need to provide link to your source which is mandetory.

<p align="center"><img src="public/images/selectSource.png"></p>

If your provided link does not exist or is broken then you will recive an error message saying "Not a Valid Source" on submiting the form.

<p align="center"><img src="public/images/invalidSource.png"></p>

The API call which validates the URL of a source is written in [./public/js/app/index.js](./public/js/app/index.js) and [./api/resources/domain/domain.controller.js](./api/resources/domain/domain.controller.js).

<p align="center"><img src="public/images/validateUrl.png"></p> <p align="center"><img src="public/images/validateUrl2.png"></p>


# Validating The Quote

Once you enter a valid Quote and Source your quote will be checked from source if quote belongs to that particular source or not.
If your provided quote that does not exist on the given source then you will recive an error message saying "Quote Is Not From Source" on submiting the form.

<p align="center"><img src="public/images/quoteFromSource.png"></p>

The API call which validates the URL of a source is written in [./public/js/app/index.js](./public/js/app/index.js) and [./api/resources/domain/domain.controller.js](./api/resources/domain/domain.controller.js), validation is done using cheerio web scrapper.

<p align="left"><img src="public/images/quoteFromSource1.png"></p> <p align="right"><img src="public/images/quoteFromSource2.png"></p>

Finally if all the validations are passed your edit request is submitted successfully.

<p align="center"><img src="public/images/successful.png"></p>
