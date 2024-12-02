// API URL for fetching random quotes
const apiUrl = "http://api.quotable.io/random";

// Select HTML elements
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const speakButton = document.querySelector("#speak-button");
const newQuoteButton = document.querySelector("#new-quote-button");

// Function to fetch a new quote
function fetchQuote() {
    quoteText.innerText = "Loading...";
    authorText.innerText = "";

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch the quote");
            }
            return response.json();
        })
        .then(data => {
            // Update the text with the fetched quote
            quoteText.innerText = `"${data.content}"`;
            authorText.innerText = `- ${data.author}`;
        })
        .catch(error => {
            console.error("Error fetching the quote:", error);
            quoteText.innerText = "Oops! Something went wrong.";
            authorText.innerText = "";
        });
}

// Function to use speech synthesis
function speakQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;

    if (!quote || quote === "Loading..." || quote === "Oops! Something went wrong.") {
        alert("No quote available to speak.");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(`${quote} ${author}`);
    utterance.lang = "en-US"; // Language setting for the speech
    speechSynthesis.speak(utterance);
}

// Add event listeners for buttons
newQuoteButton.addEventListener("click", fetchQuote);
speakButton.addEventListener("click", speakQuote);

// Fetch the initial quote when the page loads
fetchQuote();
