// Function to play sound based on the sound ID
function playSound(soundId) {
    const audioElement = document.getElementById(soundId);
    if (audioElement) {
        audioElement.currentTime = 0; // Reset to the start
        audioElement.play().catch(error => {
            console.error("Error playing sound:", error);
        });
    } else {
        console.error("Audio element not found for ID:", soundId);
    }
}

// Get all drum elements
const drums = document.querySelectorAll('.drum');

// Add click event listener to each drum element
drums.forEach(drum => {
    drum.addEventListener('click', () => {
        const soundId = drum.getAttribute('data-sound'); // Get the sound ID from data attribute
        playSound(soundId); // Play the corresponding sound
    });
});

// Map keyboard keys to sound IDs
const keyMap = {
    'a': 'kick',      // Key 'A' for Kick
    's': 'snare',     // Key 'S' for Snare
    'd': 'hihat',     // Key 'D' for Hi-Hat
    'f': 'tom1',      // Key 'F' for Tom 1
    'g': 'tom2',      // Key 'G' for Tom 2
    'h': 'tom3',      // Key 'H' for Tom 3
    'j': 'crash1',    // Key 'J' for Crash 1
    'k': 'crash2',    // Key 'K' for Crash 2
    'l': 'kick2'      // Key 'L' for Kick 2
};

// Add keydown event listener to the document
document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase(); // Get the pressed key
    const soundId = keyMap[key]; // Get the corresponding sound ID from the keyMap
    if (soundId) {
        playSound(soundId); // Play the sound if a valid key is pressed
    }
});