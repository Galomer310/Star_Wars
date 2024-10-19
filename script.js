// Get the elements from the DOM
const fetchCharacterBtn = document.getElementById('fetch-character-btn');
const loadingMessage = document.getElementById('loading-message');
const characterName = document.getElementById('character-name');
const characterHeight = document.getElementById('character-height');
const characterMass = document.getElementById('character-mass');
const characterHairColor = document.getElementById('character-hair-color');
const characterSkinColor = document.getElementById('character-skin-color');
const characterEyeColor = document.getElementById('character-eye-color');
const characterGender = document.getElementById('character-gender');
const characterBirthYear = document.getElementById('character-birth-year');
const characterHomeworld = document.getElementById('character-homeworld');

// Function to fetch a random character from the API
function fetchRandomCharacter() {
    const randomId = Math.floor(Math.random() * 83) + 1; // Random ID between 1 and 83
    const apiUrl = `https://www.swapi.tech/api/people/${randomId}`;

    // Display the loading message
    loadingMessage.style.display = 'block';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Fetch the homeworld data
            const characterData = data.result.properties;
            const homeworldUrl = characterData.homeworld;
            return fetch(homeworldUrl)
                .then(response => response.json())
                .then(homeworldData => {
                    characterData.homeworldName = homeworldData.result.properties.name;
                    return characterData;
                });
        })
        .then(characterData => {
            // Hide the loading message
            loadingMessage.style.display = 'none';
            
            // Update the DOM with character information
            characterName.textContent = characterData.name;
            characterHeight.textContent = characterData.height + " " + "cm";
            characterMass.textContent = characterData.mass + " " + "kg";
            characterHairColor.textContent = characterData.hair_color;
            characterSkinColor.textContent = characterData.skin_color;
            characterEyeColor.textContent = characterData.eye_color;
            characterGender.textContent = characterData.gender;
            characterBirthYear.textContent = characterData.birth_year;
            characterHomeworld.textContent = characterData.homeworldName;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            loadingMessage.style.display = 'none';
            alert('Failed to load character data. Please try again.');
        });
}

// Add click event listener to the button
fetchCharacterBtn.addEventListener('click', fetchRandomCharacter);
