const quoteElement = document.getElementById("quote");
const authorElement = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const speakQuoteButton = document.getElementById("speak-quote");

// Fetch random quotes
async function fetchQuote() {
    try {
        const response = await fetch("http://api.quotable.io/random");
        const data = await response.json();
        quoteElement.textContent = `"${data.content}"`;
        authorElement.textContent = `- ${data.author}`;
    } catch (error) {
        quoteElement.textContent = "Oops! Unable to fetch a quote.";
        authorElement.textContent = "- Error";
    }
}

// Speak the current quote
function speakQuote() {
    const quote = quoteElement.textContent;
    const author = authorElement.textContent;
    const utterance = new SpeechSynthesisUtterance(`${quote} ${author}`);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
}

// Event listeners
newQuoteButton.addEventListener("click", fetchQuote);
speakQuoteButton.addEventListener("click", speakQuote);
