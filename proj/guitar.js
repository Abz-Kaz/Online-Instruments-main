// Select all string elements
const strings = document.querySelectorAll('.string');

// Function to play sound
function playSound(event) {
    // Get the sound file from the data-sound attribute
    const soundFile = event.currentTarget.getAttribute('data-sound');
    
    // Create a new audio object using the sound file path
    const audio = new Audio(soundFile);
    
    // Play the sound
    audio.play();
}

// Add click event listeners to each string
strings.forEach(string => {
    string.addEventListener('click', playSound);
});