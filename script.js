const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
// Selects the element where results will be displayed
const result = document.getElementById("result"); 
// Selects the element for playing sound
const sound = document.getElementById("sound");
 // Selects the search button
const btn = document.getElementById("search-btn");

// Add a click event to the search button
// Take the text from the input box and save it in a variable
btn.addEventListener("click", () => {
    // Get the input word from the user
    let inpWord = document.getElementById("inp-word").value;

    // This code gets information about a word from an API and shows it on the screen.
    // It creates a dynamic HTML with the word, its meaning, and an example.
fetch(`${url}${inpWord}`)
// Convert the API response to JSON
.then((response) => response.json())
.then((data) => {
    console.log(data);// Log the data in the console for debugging
    const sound = document.getElementById("sound");
    // Create dynamic HTML to display the word details
    result.innerHTML = `
    <div class="word">
                <h3>${inpWord}</h3>     <!-- Show the input word -->
                <button onclick="playSound()">     <!-- Add a button to play sound -->
                    <i class="fa-solid fa-volume-high" title="volume"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>     <!-- Show the part of speech -->
                <p>/${data[0].phonetic}/</p>     <!-- Show the word's phonetic spelling -->
            </div>
            <p class="word-meaning">
             ${data[0].meanings[0].definitions[0].definition}    <!-- Show the word's definition -->
            </p>
            <p class="word-example">
               ${data[0].meanings[0].definitions[0].example || ""}      <!-- Show an example or leave blank -->
            </p>`;
            // Set the audio source for pronunciation
            sound.setAttribute("src", `${data[0].phonetics[1].audio}`);
            console.log(data[0].phonetics);     // Log phonetics data for debugging
})
.catch( () => {
     // If the word is not found, show an error message
    result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`
});
});   

// Function to play the pronunciation sound
function playSound() {
    sound.play();  //play the sound
    
}