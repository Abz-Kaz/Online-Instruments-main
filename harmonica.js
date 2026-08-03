const harmonicaHoles = [
  { hole: 1, blowFreq: 261.63, blowKey: '1', drawFreq: 293.66, drawKey: 'q' },
  { hole: 2, blowFreq: 329.63, blowKey: '2', drawFreq: 392.00, drawKey: 'w' },
  { hole: 3, blowFreq: 392.00, blowKey: '3', drawFreq: 493.88, drawKey: 'e' },
  { hole: 4, blowFreq: 523.25, blowKey: '4', drawFreq: 587.33, drawKey: 'r' },
  { hole: 5, blowFreq: 659.25, blowKey: '5', drawFreq: 698.46, drawKey: 't' },
  { hole: 6, blowFreq: 783.99, blowKey: '6', drawFreq: 880.00, drawKey: 'y' },
  { hole: 7, blowFreq: 1046.50, blowKey: '7', drawFreq: 987.77, drawKey: 'u' },
  { hole: 8, blowFreq: 1318.51, blowKey: '8', drawFreq: 1174.66, drawKey: 'i' },
  { hole: 9, blowFreq: 1567.98, blowKey: '9', drawFreq: 1396.91, drawKey: 'o' },
  { hole: 10, blowFreq: 2093.00, blowKey: '0', drawFreq: 1760.00, drawKey: 'p' },
];

let audioCtx = null;
const activeOscillators = {};

function initAudio() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playNote(freq, noteId) {
  initAudio();
  if (activeOscillators[noteId]) return;

  const osc = audioCtx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

  const subOsc = audioCtx.createOscillator();
  subOsc.type = 'triangle';
  subOsc.frequency.setValueAtTime(freq * 2, audioCtx.currentTime);

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1400, audioCtx.currentTime);
  filter.Q.setValueAtTime(1.2, audioCtx.currentTime);

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.04);

  osc.connect(filter);
  subOsc.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start();
  subOsc.start();

  activeOscillators[noteId] = { osc, subOsc, gain };

  const isBlow = noteId.startsWith('blow-');
  const btn = document.querySelector(`.reed-btn[data-note="${noteId}"]`);
  if (btn) {
    btn.classList.add(isBlow ? 'active-blow' : 'active-draw');
  }
  const kbd = document.querySelector(`kbd[data-kbd="${noteId}"]`);
  if (kbd) {
    kbd.classList.add('active');
  }
}

function stopNote(noteId) {
  const active = activeOscillators[noteId];
  if (active) {
    active.gain.gain.cancelScheduledValues(audioCtx.currentTime);
    active.gain.gain.setValueAtTime(active.gain.gain.value, audioCtx.currentTime);
    active.gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
    const osc = active.osc;
    const subOsc = active.subOsc;
    setTimeout(() => {
      try {
        osc.stop();
        subOsc.stop();
      } catch (e) {}
    }, 200);

    delete activeOscillators[noteId];

    const isBlow = noteId.startsWith('blow-');
    const btn = document.querySelector(`.reed-btn[data-note="${noteId}"]`);
    if (btn) {
      btn.classList.remove(isBlow ? 'active-blow' : 'active-draw');
    }
    const kbd = document.querySelector(`kbd[data-kbd="${noteId}"]`);
    if (kbd) {
      kbd.classList.remove('active');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.reed-btn');
  buttons.forEach(btn => {
    const freq = parseFloat(btn.getAttribute('data-freq'));
    const noteId = btn.getAttribute('data-note');

    btn.addEventListener('mousedown', () => playNote(freq, noteId));
    btn.addEventListener('mouseup', () => stopNote(noteId));
    btn.addEventListener('mouseleave', () => stopNote(noteId));

    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      playNote(freq, noteId);
    });
    btn.addEventListener('touchend', () => stopNote(noteId));
  });
});

const pressedKeys = {};
window.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  const key = e.key.toLowerCase();
  pressedKeys[key] = true;

  harmonicaHoles.forEach(h => {
    if (h.blowKey === key) {
      playNote(h.blowFreq, `blow-${h.hole}`);
    }
    if (h.drawKey === key) {
      playNote(h.drawFreq, `draw-${h.hole}`);
    }
  });
});

window.addEventListener('keyup', (e) => {
  const key = e.key.toLowerCase();
  delete pressedKeys[key];

  harmonicaHoles.forEach(h => {
    if (h.blowKey === key) {
      stopNote(`blow-${h.hole}`);
    }
    if (h.drawKey === key) {
      stopNote(`draw-${h.hole}`);
    }
  });
});
