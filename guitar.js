document.addEventListener('DOMContentLoaded', () => {
    window.playSound = function playSound(id) {
        const stringElement = document.getElementById(id);
        if (stringElement) {
            const soundPath = stringElement.getAttribute('data-sound');
            const audio = new Audio(soundPath);
            audio.play();
        }
    };

    // Map keys to string IDs
    const keyMap = {
        'a': 'string1',
        's': 'string2',
        'd': 'string3',
        'f': 'string4',
        'g': 'string5'
    };

    // Add keydown event listener
    document.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();
        if (keyMap[key]) {
            window.playSound(keyMap[key]);
        }
    });
});
