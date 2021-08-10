// Get quotes from api
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];
//Loading spinner shown
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Remove loading spinner  m
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//Show new quote
function newQuote() {
    //Pick a random quote from  apiQuotes Array
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //Check if the author field is blank and replace with 'Unknown'
    if (!quote.author) {
        authorText.textContent = unknown;
    } else {
        authorText.textContent = quote.author;
    }
    // Checking quote length to determine styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //Catch Error here 
    }
}

//On Load
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
getQuotes();