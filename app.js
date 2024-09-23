// Function to fetch a random quote from the API
async function fetchQuote() {
    try {
        const response = await fetch('http://api.quotable.io/random');
        const data = await response.json();
        console.log(data);
        return {
            text: data.content,  // Return the quote text
            author: data.author // Return the author's name
        };
    } catch (error) {
        console.error('Error fetching the quote:', error);
        return {
            text: "Life is 10% what happens to us and 90% how we react to it.",
            author: "Charles R. Swindoll"
        }; // Fallback quote and author
    }
}

async function displayQuote() {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('author');

    // Remove the show class before updating the content
    quoteElement.classList.remove('show');
    authorElement.classList.remove('show');

    const quoteData = await fetchQuote();
    const translatedQuote = await translateQuote(quoteData.text);

    quoteElement.textContent = quoteData.text;
    authorElement.textContent = `- ${quoteData.author}`;

    // Re-add the show class to trigger the animation
    setTimeout(() => {
        quoteElement.classList.add('show');
        authorElement.classList.add('show');
    }, 100); // Adding a slight delay to ensure the class removal is applied
}

// Function to translate text using Google Translate API
async function translateQuote(quote) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=id&dt=t&q=${encodeURIComponent(quote)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data[0][0][0]; // Extract translated text
    } catch (error) {
        console.error('Error translating the quote:', error);
        return quote; // Return original quote if translation fails
    }
}

// Display a quote when the page loads
window.onload = displayQuote;
