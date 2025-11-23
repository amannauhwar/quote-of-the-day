const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
const quoteContainer = document.getElementById('quote-container');

// Show Loading Spinner
function showLoadingSpinner() {
    loader.style.display = 'block';
    quoteContainer.style.visibility = 'hidden';
}

// Hide Loading Spinner
function removeLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.style.visibility = 'visible';
        loader.style.display = 'none';
    }
}

// Get Quote From API
async function getQuote() {
    showLoadingSpinner();
    const apiUrl = 'https://dummyjson.com/quotes/random';
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // If author is blank, replace with 'Unknown'
        if (data.author === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.author;
        }

        // Reduce font size for very long quotes to keep design clean
        if (data.quote.length > 120) {
            quoteText.style.fontSize = '1.5rem';
        } else {
            quoteText.style.fontSize = '2rem';
        }

        quoteText.innerText = data.quote;
        removeLoadingSpinner();
    } catch (error) {
        console.log('Whoops, no quote', error);
        // Fallback quote in case of error
        quoteText.innerText = "The only way to do great work is to love what you do.";
        authorText.innerText = "Steve Jobs";
        removeLoadingSpinner();
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();