const apiUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent("https://api.quotable.io/random");

const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const speakButton = document.querySelector("#speak-button");
const newQuoteButton = document.querySelector("#new-quote-button");

function fetchQuote() {
    quoteText.innerText = "Loading...";
    authorText.innerText = "";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const quoteData = JSON.parse(data.contents);
            quoteText.innerText = `"${quoteData.content}"`;
            authorText.innerText = `- ${quoteData.author}`;
        })
        .catch(error => {
            console.error("Error fetching the quote:", error);
            quoteText.innerText = "Oops! Something went wrong.";
            authorText.innerText = "";
        });
}

function speakQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;

    if (!quote || quote === "Loading..." || quote === "Oops! Something went wrong.") {
        alert("No quote available to speak.");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(`${quote} ${author}`);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
}

newQuoteButton.addEventListener("click", fetchQuote);
speakButton.addEventListener("click", speakQuote);

fetchQuote();
