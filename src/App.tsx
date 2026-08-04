import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';

type Page = 'home' | 'about' | 'services' | 'contact' | 'piano' | 'drums' | 'guitar' | 'harmonica' | 'login' | 'register';

type NavItem = {
  label: string;
  path: string;
  page: Page;
};

const navItems: NavItem[] = [
  { label: 'Home', path: '/', page: 'home' },
  { label: 'About', path: '/about', page: 'about' },
  { label: 'Services', path: '/services', page: 'services' },
  { label: 'Contact', path: '/contact', page: 'contact' },
];

const routeMap: Record<string, Page> = {
  '/': 'home',
  '/index.html': 'home',
  '/ict-proj-instruments': 'home',
  '/ict%20proj%20instruments.html': 'home',
  '/about': 'about',
  '/about.html': 'about',
  '/services': 'services',
  '/services.html': 'services',
  '/contact': 'contact',
  '/contact.html': 'contact',
  '/piano': 'piano',
  '/piano.html': 'piano',
  '/drums': 'drums',
  '/drums.html': 'drums',
  '/guitar': 'guitar',
  '/guitar.html': 'guitar',
  '/harmonica': 'harmonica',
  '/harmonica.html': 'harmonica',
  '/login': 'login',
  '/login.html': 'login',
  '/register': 'register',
  '/register.html': 'register',
};

const instrumentCards = [
  { title: 'Piano', image: '/img/Piano.png', page: 'piano' as Page, className: 'image-container' },
  { title: 'Drums', image: '/img/Drums.jpg', page: 'drums' as Page, className: 'Drums-container' },
  { title: 'Guitar', image: '/img/Guitar.jpg', page: 'guitar' as Page, className: 'Guitar-container' },
  { title: 'Harmonica', image: '/img/harmonica.jpg', page: 'harmonica' as Page, className: 'Harmonica-container' },
];

const pianoKeys = [
  { note: 'a', type: 'white' },
  { note: 'w', type: 'black' },
  { note: 's', type: 'white' },
  { note: 'e', type: 'black' },
  { note: 'd', type: 'white' },
  { note: 'f', type: 'white' },
  { note: 't', type: 'black' },
  { note: 'g', type: 'white' },
  { note: 'y', type: 'black' },
  { note: 'h', type: 'white' },
  { note: 'u', type: 'black' },
  { note: 'j', type: 'white' },
  { note: 'k', type: 'white' },
  { note: 'o', type: 'black' },
  { note: 'l', type: 'white' },
  { note: 'p', type: 'black' },
  { note: ';', type: 'white' },
];

const drumPads = [
  { id: 'crash1', label: 'Crash', className: 'drum cymbal crash-left', src: '/Drums-aud/crash1.wav', key: 'j' },
  { id: 'tom1', label: 'Tom 1', className: 'drum tom tom1', src: '/Drums-aud/tom1.wav', key: 'f' },
  { id: 'tom2', label: 'Tom 2', className: 'drum tom tom2', src: '/Drums-aud/tom2.wav', key: 'g' },
  { id: 'tom3', label: 'Tom 3', className: 'drum tom tom3', src: '/Drums-aud/tom3.wav', key: 'h' },
  { id: 'crash2', label: 'Crash', className: 'drum cymbal crash-right', src: '/Drums-aud/crash2.wav', key: 'k' },
  { id: 'hihat', label: 'Hi-Hat', className: 'drum hihat', src: '/Drums-aud/hihat.wav', key: 'd' },
  { id: 'snare', label: 'Snare', className: 'drum snare', src: '/Drums-aud/snare.wav', key: 's' },
  { id: 'kick', label: 'Kick', className: 'drum kick kick-left', src: '/Drums-aud/kick.wav', key: 'a' },
  { id: 'kick2', label: 'Kick', className: 'drum kick kick-right', src: '/Drums-aud/kick.wav', key: 'l' },
];

const guitarStrings = [
  { id: 'string1', src: '/Sounds/String1.wav', key: 'a' },
  { id: 'string2', src: '/Sounds/String2.wav', key: 's' },
  { id: 'string3', src: '/Sounds/String3.wav', key: 'd' },
  { id: 'string4', src: '/Sounds/String4.wav', key: 'f' },
  { id: 'string5', src: '/Sounds/String5.wav', key: 'g' },
];

type DrumMode = 'acoustic' | 'electronic' | 'arena';
type GuitarMode = 'acoustic' | 'clean' | 'overdrive';

const drumModes: Array<{ id: DrumMode; label: string; description: string }> = [
  { id: 'acoustic', label: 'Acoustic Kit', description: 'Warm, roomy, and natural' },
  { id: 'electronic', label: 'Electronic Kit', description: 'Tight, punchy, and polished' },
  { id: 'arena', label: 'Arena Kit', description: 'Big, open, and cinematic' },
];

const guitarModes: Array<{ id: GuitarMode; label: string; description: string }> = [
  { id: 'acoustic', label: 'Acoustic', description: 'Airy and organic' },
  { id: 'clean', label: 'Electric', description: 'Bright with subtle space' },
  { id: 'overdrive', label: 'Overdrive', description: 'Gritty and expressive' },
];

const drumRecipes: Record<
  DrumMode,
  {
    gain: number;
    reverb: number;
    reverbTime: number;
    reverbDecay: number;
    distortion: number;
    threshold: number;
    ratio: number;
    attack: number;
    release: number;
  }
> = {
  acoustic: {
    gain: 1,
    reverb: 0.18,
    reverbTime: 1.4,
    reverbDecay: 2.4,
    distortion: 0.02,
    threshold: -22,
    ratio: 4,
    attack: 0.004,
    release: 0.18,
  },
  electronic: {
    gain: 1.05,
    reverb: 0.08,
    reverbTime: 0.8,
    reverbDecay: 1.4,
    distortion: 0.12,
    threshold: -16,
    ratio: 8,
    attack: 0.001,
    release: 0.08,
  },
  arena: {
    gain: 1.08,
    reverb: 0.28,
    reverbTime: 1.9,
    reverbDecay: 3.4,
    distortion: 0.04,
    threshold: -20,
    ratio: 5,
    attack: 0.006,
    release: 0.22,
  },
};

const guitarRecipes: Record<
  GuitarMode,
  {
    gain: number;
    reverb: number;
    reverbTime: number;
    reverbDecay: number;
    delayMix: number;
    delayTime: number;
    delayFeedback: number;
    distortion: number;
    lowPass: number;
  }
> = {
  acoustic: {
    gain: 0.96,
    reverb: 0.22,
    reverbTime: 1.2,
    reverbDecay: 2.2,
    delayMix: 0,
    delayTime: 0,
    delayFeedback: 0,
    distortion: 0,
    lowPass: 12500,
  },
  clean: {
    gain: 0.94,
    reverb: 0.14,
    reverbTime: 1,
    reverbDecay: 1.8,
    delayMix: 0.12,
    delayTime: 0.09,
    delayFeedback: 0.16,
    distortion: 0.01,
    lowPass: 15000,
  },
  overdrive: {
    gain: 1,
    reverb: 0.1,
    reverbTime: 0.9,
    reverbDecay: 1.4,
    delayMix: 0.06,
    delayTime: 0.11,
    delayFeedback: 0.2,
    distortion: 0.26,
    lowPass: 9800,
  },
};

function getAudioContext() {
  const contextClass = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!contextClass) {
    return null;
  }
  return new contextClass();
}

function createImpulseResponse(context: AudioContext, durationSeconds: number, decay: number) {
  const length = Math.max(1, Math.floor(context.sampleRate * durationSeconds));
  const buffer = context.createBuffer(2, length, context.sampleRate);

  for (let channel = 0; channel < buffer.numberOfChannels; channel += 1) {
    const data = buffer.getChannelData(channel);
    for (let index = 0; index < length; index += 1) {
      data[index] = (Math.random() * 2 - 1) * Math.pow(1 - index / length, decay);
    }
  }

  return buffer;
}

function createDistortionCurve(amount: number) {
  const curve = new Float32Array(44100);
  const drive = Math.max(0.001, amount);
  const k = drive * 100;

  for (let index = 0; index < curve.length; index += 1) {
    const x = (index * 2) / curve.length - 1;
    curve[index] = ((3 + k) * x * 20 * (Math.PI / 180)) / (Math.PI + k * Math.abs(x));
  }

  return curve;
}

function getFilterForDrum(padId: string, mode: DrumMode) {
  const filters: Record<string, BiquadFilterType> = {
    kick: 'lowpass',
    kick2: 'lowpass',
    snare: 'bandpass',
    hihat: 'highpass',
    tom1: 'bandpass',
    tom2: 'bandpass',
    tom3: 'bandpass',
    crash1: 'highpass',
    crash2: 'highpass',
  };

  const frequencies: Record<string, number> = {
    kick: mode === 'electronic' ? 260 : 180,
    kick2: mode === 'electronic' ? 280 : 190,
    snare: mode === 'arena' ? 3400 : 2500,
    hihat: 6500,
    tom1: 2400,
    tom2: 2200,
    tom3: 2000,
    crash1: 5200,
    crash2: 5400,
  };

  return {
    type: filters[padId] ?? 'lowpass',
    frequency: frequencies[padId] ?? 4000,
    q: padId === 'snare' ? 1.4 : 0.9,
    detune: (Math.random() - 0.5) * (mode === 'arena' ? 10 : 6),
    playbackRate:
      padId === 'kick' || padId === 'kick2'
        ? mode === 'electronic'
          ? 0.96
          : 1
        : padId === 'hihat' || padId === 'crash1' || padId === 'crash2'
          ? 1.01
          : 1 + (Math.random() - 0.5) * 0.03,
  };
}

function getFilterForGuitar(mode: GuitarMode, stringIndex: number) {
  return {
    type: 'lowpass' as BiquadFilterType,
    frequency: guitarRecipes[mode].lowPass,
    q: 0.7,
    detune: (Math.random() - 0.5) * (mode === 'overdrive' ? 8 : 5),
    playbackRate:
      mode === 'overdrive'
        ? 1 + stringIndex * 0.006
        : mode === 'clean'
          ? 1 + stringIndex * 0.004
          : 1 + stringIndex * 0.002,
  };
}

function pageFromPath(pathname: string): Page {
  return routeMap[pathname.toLowerCase()] ?? 'home';
}

function navigate(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function App() {
  const [page, setPage] = useState<Page>(() => pageFromPath(window.location.pathname));

  useEffect(() => {
    const handleRouteChange = () => setPage(pageFromPath(window.location.pathname));
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  useEffect(() => {
    document.title = page === 'home' ? 'Rhythm Realm' : `${page[0].toUpperCase()}${page.slice(1)} - Rhythm Realm`;
  }, [page]);

  return (
    <>
      <Nav />
      {page === 'home' && <Home />}
      {page === 'about' && <About />}
      {page === 'services' && <Services />}
      {page === 'contact' && <Contact />}
      {page === 'piano' && <Piano />}
      {page === 'drums' && <Drums />}
      {page === 'guitar' && <Guitar />}
      {page === 'harmonica' && <Harmonica />}
      {page === 'login' && <Login />}
      {page === 'register' && <Register />}
      {page !== 'login' && page !== 'register' && (
        <Footer text={page === 'drums' || page === 'guitar' || page === 'harmonica' ? 'My Website' : 'Rhythm Realm'} />
      )}
    </>
  );
}
function Nav() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.path}>
            <a
              href={item.path}
              onClick={(event) => {
                event.preventDefault();
                navigate(item.path);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Home() {
  return (
    <main className="page page-home">
      <header className="header">
        <h1>Rhythm Realm</h1>
        <p>Online Instruments</p>
      </header>

      <section className="home-content">
        {instrumentCards.map((instrument) => (
          <button
            className={instrument.className}
            key={instrument.title}
            onClick={() => navigate(`/${instrument.page}`)}
            type="button"
            aria-label={`Open ${instrument.title}`}
          >
            <img src={instrument.image} alt={instrument.title} />
          </button>
        ))}
      </section>
      <AdSenseUnit />
    </main>
  );
}

function About() {
  return (
    <main className="page page-content">
      <header className="header">
        <h1>About Rhythm Realm</h1>
        <p>Discover Our Musical Journey</p>
      </header>

      <section className="stacked-content">
        <article className="about-section">
          <h2>Our Story</h2>
          <p>
            Rhythm Realm was born out of a passion for music and a desire to make playing instruments
            accessible to everyone. Founded in 2024, we've been on a mission to bring the joy of music to
            people's homes through our innovative online instrument platform.
          </p>
        </article>

        <article className="about-section">
          <h2>Our Mission</h2>
          <p>
            At Rhythm Realm, we believe that music has the power to inspire, heal, and connect people. Our
            mission is to provide a user-friendly platform where anyone, regardless of their musical background,
            can explore and play various instruments online.
          </p>
        </article>

        <article className="about-section">
          <h2>What We Offer</h2>
          <ul>
            <li>Interactive online instruments (Piano, Drums, Guitar)</li>
            <li>User-friendly interface for beginners and experienced musicians</li>
            <li>High-quality sound samples for an authentic playing experience</li>
            <li>Accessible from any device with an internet connection</li>
          </ul>
        </article>
      </section>
      <AdSenseUnit />
    </main>
  );
}

function Services() {
  return (
    <main className="page page-content">
      <header className="header">
        <h1>Our Services</h1>
        <p>Explore the World of Online Instruments</p>
      </header>

      <section className="services-content">
        {[
          {
            title: 'Online Piano',
            image: '/img/Piano.png',
            text: 'Experience the joy of playing piano anytime, anywhere. Our online piano features realistic sound and responsive keys, perfect for beginners and experienced pianists alike.',
            link: 'Try Piano',
            page: 'piano' as Page,
          },
          {
            title: 'Virtual Drums',
            image: '/img/Drums.jpg',
            text: "Beat out rhythms and create dynamic percussion with our virtual drum kit. Featuring multiple drum pads and cymbals, it's a great way to practice or lay down beats.",
            link: 'Try Drums',
            page: 'drums' as Page,
          },
          {
            title: 'Digital Guitar',
            image: '/img/Guitar.jpg',
            text: 'Strum, pick, and shred on our digital guitar. With various sound options and effects, you can explore different styles and techniques from classical to rock.',
            link: 'Try Guitar',
            page: 'guitar' as Page,
          },
          {
            title: 'Digital Harmonica',
            image: '/img/harmonica.jpg',
            text: 'Play the blues or folk tunes with our digital diatonic harmonica. Synthesizing rich reed tones with precise blowing and drawing frequencies.',
            link: 'Try Harmonica',
            page: 'harmonica' as Page,
          },
        ].map((service) => (
          <article className="service-section" key={service.title}>
            <h2>{service.title}</h2>
            <img src={service.image} alt={`${service.title} Interface`} className="service-image" />
            <p>{service.text}</p>
            <button className="service-link" type="button" onClick={() => navigate(`/${service.page}`)}>
              {service.link}
            </button>
          </article>
        ))}
      </section>
      <AdSenseUnit />
    </main>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  }

  return (
    <main className="page page-content">
      <header className="header">
        <h1>Contact Us</h1>
        <p>Get in Touch with Rhythm Realm</p>
      </header>

      <section className="contact-content">
        <article className="contact-section">
          <h2>Send Us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required />
            </div>
            <button type="submit" className="submit-btn">
              Send Message
            </button>
            {submitted && <p className="form-status">Message received.</p>}
          </form>
        </article>

        <article className="contact-info">
          <h2>Contact Information</h2>
          <p>
            <strong>Email:</strong> info@rhythmrealm.com
          </p>
          <p>
            <strong>Phone:</strong> +92 (345) 678-9876
          </p>
          <p>
            <strong>Address:</strong> 123 Music Street, Harmony City, MU 12345
          </p>
        </article>
      </section>
      <AdSenseUnit />
    </main>
  );
}

function Login() {
  const [errors, setErrors] = useState({ email: false, password: false });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');
    const nextErrors = {
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      password: password.length < 6,
    };
    setErrors(nextErrors);
    if (!nextErrors.email && !nextErrors.password) {
      navigate('/');
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="logo">
          <h2>Rhythm Realm</h2>
        </div>
        <section className="auth-card">
          <div className="auth-header">
            <h1>Welcome</h1>
            <p>Sign in to continue to Rhythm Realm</p>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input type="email" name="email" placeholder="Email address" required />
              {errors.email && <div className="error-message">Please enter a valid email address</div>}
            </div>
            <div className="form-group">
              <input type="password" name="password" placeholder="Password" required />
              {errors.password && <div className="error-message">Password must be at least 6 characters</div>}
            </div>
            <button type="submit" className="login-button">
              Sign In
            </button>
            <div className="forgot-password">
              <a href="/login" onClick={(event) => event.preventDefault()}>
                Forgot Password?
              </a>
            </div>
            <div className="divider" />
            <div className="create-account">
              <button type="button" className="create-account-button" onClick={() => navigate('/register')}>
                Create New Account
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

function Register() {
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const username = String(form.get('username') ?? '');
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');
    const confirmPassword = String(form.get('confirmPassword') ?? '');
    const nextErrors = {
      username: username.length < 3,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      password: password.length < 6,
      confirmPassword: password !== confirmPassword,
    };
    setErrors(nextErrors);
    if (!Object.values(nextErrors).some(Boolean)) {
      navigate('/login');
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="logo">
          <h2>Rhythm Realm</h2>
        </div>
        <section className="auth-card register-card">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Join Rhythm Realm today</p>
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" placeholder="Create a username" required />
              {errors.username && <div className="error-message">Username must be at least 3 characters</div>}
            </div>
            <div className="form-group">
              <label htmlFor="register-email">Email</label>
              <input type="email" id="register-email" name="email" placeholder="Your email address" required />
              {errors.email && <div className="error-message">Please enter a valid email address</div>}
            </div>
            <div className="form-group">
              <label htmlFor="register-password">Password</label>
              <input
                type="password"
                id="register-password"
                name="password"
                placeholder="Create a password"
                required
              />
              {errors.password && <div className="error-message">Password must be at least 6 characters</div>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                required
              />
              {errors.confirmPassword && <div className="error-message">Passwords do not match</div>}
            </div>
            <button type="submit" className="register-button">
              Create Account
            </button>
          </form>
          <div className="login-redirect">
            <p>
              Already have an account?{' '}
              <a
                href="/login"
                onClick={(event) => {
                  event.preventDefault();
                  navigate('/login');
                }}
              >
                Sign In
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function Piano() {
  const [volume, setVolume] = useState(0.5);
  const [showKeys, setShowKeys] = useState(true);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const validKeys = useMemo(() => pianoKeys.map((key) => key.note), []);

  function playTune(note: string) {
    const audio = audioRef.current ?? new Audio(`/Tunes/${note}.wav`);
    audioRef.current = audio;
    audio.src = `/Tunes/${note}.wav`;
    audio.volume = volume;
    void audio.play();
    setActiveKey(note);
    window.setTimeout(() => setActiveKey((current) => (current === note ? null : current)), 150);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (validKeys.includes(event.key)) {
        playTune(event.key);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [validKeys, volume]);

  return (
    <main className="instrument-page piano-page">
      <section className="wrapper">
        <header>
          <h2>Piano</h2>
          <div className="column volume-slider">
            <span>Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              value={volume}
              step="any"
              onChange={(event) => setVolume(Number(event.target.value))}
            />
          </div>
          <div className="column keys-checkbox">
            <span>Show keys</span>
            <input type="checkbox" checked={showKeys} onChange={() => setShowKeys((value) => !value)} />
          </div>
        </header>
        <ul className="piano-keys">
          {pianoKeys.map((key) => (
            <li
              className={`key ${key.type} ${showKeys ? '' : 'hide'} ${activeKey === key.note ? 'active' : ''}`}
              data-key={key.note}
              key={key.note}
              onClick={() => playTune(key.note)}
            >
              <span>{key.note}</span>
            </li>
          ))}
        </ul>
      </section>
      <AdSenseUnit />
    </main>
  );
}

function Drums() {
  const [mode, setMode] = useState<DrumMode>('acoustic');
  const audioContextRef = useRef<AudioContext | null>(null);
  const bufferCacheRef = useRef<Record<string, AudioBuffer | undefined>>({});
  const impulseCacheRef = useRef<Record<string, AudioBuffer | undefined>>({});
  const keyMap = useMemo(() => Object.fromEntries(drumPads.map((pad) => [pad.key, pad.id])), []);

  async function ensureContext() {
    if (!audioContextRef.current) {
      audioContextRef.current = getAudioContext();
    }
    const context = audioContextRef.current;
    if (context && context.state === 'suspended') {
      await context.resume();
    }
    return context;
  }

  async function loadBuffer(context: AudioContext, src: string) {
    const cached = bufferCacheRef.current[src];
    if (cached) {
      return cached;
    }
    const response = await fetch(src);
    const data = await response.arrayBuffer();
    const buffer = await context.decodeAudioData(data);
    bufferCacheRef.current[src] = buffer;
    return buffer;
  }

  async function getImpulse(context: AudioContext, key: string, durationSeconds: number, decay: number) {
    const cacheKey = `${key}-${durationSeconds}-${decay}`;
    const cached = impulseCacheRef.current[cacheKey];
    if (cached) {
      return cached;
    }
    const buffer = createImpulseResponse(context, durationSeconds, decay);
    impulseCacheRef.current[cacheKey] = buffer;
    return buffer;
  }

  async function playSound(soundId: string) {
    const context = await ensureContext();
    const pad = drumPads.find((item) => item.id === soundId);
    if (!context || !pad) {
      return;
    }

    const buffer = await loadBuffer(context, pad.src);
    const recipe = drumRecipes[mode];
    const filterRecipe = getFilterForDrum(soundId, mode);
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const compressor = context.createDynamicsCompressor();
    const dryGain = context.createGain();
    const wetGain = context.createGain();
    const master = context.createGain();
    const convolver = context.createConvolver();
    const shaper = context.createWaveShaper();

    source.buffer = buffer;
    source.playbackRate.value = filterRecipe.playbackRate;
    source.detune.value = filterRecipe.detune;

    filter.type = filterRecipe.type;
    filter.frequency.value = filterRecipe.frequency;
    filter.Q.value = filterRecipe.q;

    compressor.threshold.value = recipe.threshold;
    compressor.knee.value = 22;
    compressor.ratio.value = recipe.ratio;
    compressor.attack.value = recipe.attack;
    compressor.release.value = recipe.release;

    shaper.curve = recipe.distortion > 0 ? createDistortionCurve(recipe.distortion) : null;
    shaper.oversample = '4x';

    dryGain.gain.value = 1 - recipe.reverb * 0.7;
    wetGain.gain.value = recipe.reverb;
    master.gain.value = recipe.gain;
    convolver.buffer = await getImpulse(context, `${mode}-drum`, recipe.reverbTime, recipe.reverbDecay);

    source.connect(filter);
    filter.connect(shaper);
    shaper.connect(compressor);
    compressor.connect(dryGain);
    compressor.connect(convolver);
    convolver.connect(wetGain);
    dryGain.connect(master);
    wetGain.connect(master);
    master.connect(context.destination);
    const cleanup = () => {
      [source, filter, shaper, compressor, dryGain, wetGain, master, convolver].forEach((node) => {
        try {
          node.disconnect();
        } catch {
          // Ignore nodes that already disconnected.
        }
      });
    };

    source.onended = cleanup;
    window.setTimeout(cleanup, 5000);
    source.start();
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const soundId = keyMap[event.key.toLowerCase()];
      if (soundId) {
        void playSound(soundId);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keyMap]);

  return (
    <main className="instrument-page drums-page">
      <section className="instrument-shell">
        <header className="instrument-header">
          <div>
            <p className="eyebrow">Percussion Studio</p>
            <h1>Drums</h1>
            <p className="instrument-copy">
              Switch between acoustic, electronic, and arena-style kits while keeping the pads responsive and
              musical.
            </p>
          </div>
          <div className="mode-switcher" role="tablist" aria-label="Drum kit styles">
            {drumModes.map((item) => (
              <button
                className={`mode-chip ${mode === item.id ? 'is-active' : ''}`}
                key={item.id}
                onClick={() => setMode(item.id)}
                type="button"
              >
                <strong>{item.label}</strong>
                <span>{item.description}</span>
              </button>
            ))}
          </div>
        </header>

        <div className="instrument-grid">
          <aside className="instrument-notes">
            <h2>Keyboard map</h2>
            <ul>
              <li>A : Kick</li>
              <li>S : Snare</li>
              <li>D : Hi-Hat</li>
              <li>F : Tom 1</li>
              <li>G : Tom 2</li>
              <li>H : Tom 3</li>
              <li>J : Crash 1</li>
              <li>K : Crash 2</li>
              <li>L : Kick 2</li>
            </ul>
          </aside>

          <section className="drumkit-shell">
            <div className="drumkit-stage">
              <div className="stage-glow stage-glow-one" />
              <div className="stage-glow stage-glow-two" />
              <div className="drumkit" aria-label="Virtual drum kit">
                {drumPads.map((pad) => (
                  <button className={pad.className} key={pad.id} onClick={() => void playSound(pad.id)} type="button">
                    {pad.label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
      <AdSenseUnit />
    </main>
  );
}

function Guitar() {
  const [mode, setMode] = useState<GuitarMode>('acoustic');
  const [activeString, setActiveString] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const bufferCacheRef = useRef<Record<string, AudioBuffer | undefined>>({});
  const impulseCacheRef = useRef<Record<string, AudioBuffer | undefined>>({});
  const keyMap = useMemo(() => Object.fromEntries(guitarStrings.map((string) => [string.key, string.id])), []);

  async function ensureContext() {
    if (!audioContextRef.current) {
      audioContextRef.current = getAudioContext();
    }
    const context = audioContextRef.current;
    if (context && context.state === 'suspended') {
      await context.resume();
    }
    return context;
  }

  async function loadBuffer(context: AudioContext, src: string) {
    const cached = bufferCacheRef.current[src];
    if (cached) {
      return cached;
    }
    const response = await fetch(src);
    const data = await response.arrayBuffer();
    const buffer = await context.decodeAudioData(data);
    bufferCacheRef.current[src] = buffer;
    return buffer;
  }

  async function getImpulse(context: AudioContext, key: string, durationSeconds: number, decay: number) {
    const cacheKey = `${key}-${durationSeconds}-${decay}`;
    const cached = impulseCacheRef.current[cacheKey];
    if (cached) {
      return cached;
    }
    const buffer = createImpulseResponse(context, durationSeconds, decay);
    impulseCacheRef.current[cacheKey] = buffer;
    return buffer;
  }

  async function playSound(id: string) {
    const string = guitarStrings.find((item) => item.id === id);
    const stringIndex = guitarStrings.findIndex((item) => item.id === id);
    const context = await ensureContext();
    if (!string || !context) {
      return;
    }

    const buffer = await loadBuffer(context, string.src);
    const recipe = guitarRecipes[mode];
    const filterRecipe = getFilterForGuitar(mode, stringIndex);
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const compressor = context.createDynamicsCompressor();
    const dryGain = context.createGain();
    const wetGain = context.createGain();
    const master = context.createGain();
    const convolver = context.createConvolver();
    const delay = context.createDelay(0.8);
    const delayFeedback = context.createGain();
    const delayMix = context.createGain();
    const shaper = context.createWaveShaper();

    source.buffer = buffer;
    source.playbackRate.value = filterRecipe.playbackRate;
    source.detune.value = filterRecipe.detune;

    filter.type = filterRecipe.type;
    filter.frequency.value = filterRecipe.frequency;
    filter.Q.value = filterRecipe.q;

    compressor.threshold.value = mode === 'overdrive' ? -24 : -18;
    compressor.knee.value = 20;
    compressor.ratio.value = mode === 'overdrive' ? 8 : 3.5;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.15;

    shaper.curve = recipe.distortion > 0 ? createDistortionCurve(recipe.distortion) : null;
    shaper.oversample = '4x';

    dryGain.gain.value = 1 - recipe.reverb * 0.6 - recipe.delayMix * 0.6;
    wetGain.gain.value = recipe.reverb;
    delayMix.gain.value = recipe.delayMix;
    delayFeedback.gain.value = recipe.delayFeedback;
    master.gain.value = recipe.gain;

    convolver.buffer = await getImpulse(context, `${mode}-guitar`, recipe.reverbTime, recipe.reverbDecay);
    delay.delayTime.value = recipe.delayTime;

    source.connect(filter);
    filter.connect(shaper);
    shaper.connect(compressor);
    compressor.connect(dryGain);
    compressor.connect(convolver);
    compressor.connect(delay);
    convolver.connect(wetGain);
    delay.connect(delayFeedback);
    delay.connect(delayMix);
    delayFeedback.connect(delay);
    dryGain.connect(master);
    wetGain.connect(master);
    delayMix.connect(master);
    master.connect(context.destination);
    const cleanup = () => {
      [source, filter, shaper, compressor, dryGain, wetGain, master, convolver, delay, delayFeedback, delayMix].forEach((node) => {
        try {
          node.disconnect();
        } catch {
          // Ignore nodes that already disconnected.
        }
      });
    };

    source.onended = cleanup;
    window.setTimeout(cleanup, 5000);
    source.start();

    setActiveString(id);
    window.setTimeout(() => setActiveString((current) => (current === id ? null : current)), 180);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const stringId = keyMap[event.key.toLowerCase()];
      if (stringId) {
        void playSound(stringId);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keyMap]);

  return (
    <main className="instrument-page guitar-page">
      <section className="instrument-shell guitar-shell">
        <header className="instrument-header">
          <div>
            <p className="eyebrow">String Studio</p>
            <h1>Guitar</h1>
            <p className="instrument-copy">
              Move between acoustic warmth, clean electric shimmer, and overdriven grit with the same instrument
              layout.
            </p>
          </div>
          <div className="mode-switcher" role="tablist" aria-label="Guitar styles">
            {guitarModes.map((item) => (
              <button
                className={`mode-chip ${mode === item.id ? 'is-active' : ''}`}
                key={item.id}
                onClick={() => setMode(item.id)}
                type="button"
              >
                <strong>{item.label}</strong>
                <span>{item.description}</span>
              </button>
            ))}
          </div>
        </header>

        <div className="instrument-grid guitar-grid">
          <aside className="instrument-notes guitar-notes">
            <h2>Keyboard map</h2>
            <ul>
              <li>A : String 1</li>
              <li>S : String 2</li>
              <li>D : String 3</li>
              <li>F : String 4</li>
              <li>G : String 5</li>
            </ul>
          </aside>

          <section className="guitar-stage" aria-label="Digital guitar">
            <div className="stage-glow stage-glow-one" />
            <div className="stage-glow stage-glow-two" />
            <div className="guitar">
              <div className="headstock">
                <span className="tuner tuner-left tuner-top" />
                <span className="tuner tuner-left tuner-bottom" />
                <span className="tuner tuner-right tuner-top" />
                <span className="tuner tuner-right tuner-bottom" />
              </div>
              <div className="neck">
                {Array.from({ length: 9 }, (_, index) => (
                  <span className="fret" key={index} />
                ))}
                <span className="fret-dot fret-dot-one" />
                <span className="fret-dot fret-dot-two" />
              </div>
              <div className="guitar-body">
                <div className="body-shoulder body-shoulder-left" />
                <div className="body-shoulder body-shoulder-right" />
                <div className="soundhole" />
                <div className="rosette" />
                <div className="bridge" />
              </div>
              <div className="strings">
                {guitarStrings.map((string, index) => (
                  <button
                    aria-label={string.id}
                    className={`string string-${index + 1} ${activeString === string.id ? 'is-plucked' : ''}`}
                    key={string.id}
                    onClick={() => void playSound(string.id)}
                    type="button"
                  >
                    <span>{string.key.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
      <AdSenseUnit />
    </main>
  );
}

const harmonicaHoles = [
  { hole: 1, blowNote: 'C4', blowFreq: 261.63, blowKey: '1', drawNote: 'D4', drawFreq: 293.66, drawKey: 'q' },
  { hole: 2, blowNote: 'E4', blowFreq: 329.63, blowKey: '2', drawNote: 'G4', drawFreq: 392.00, drawKey: 'w' },
  { hole: 3, blowNote: 'G4', blowFreq: 392.00, blowKey: '3', drawNote: 'B4', drawFreq: 493.88, drawKey: 'e' },
  { hole: 4, blowNote: 'C5', blowFreq: 523.25, blowKey: '4', drawNote: 'D5', drawFreq: 587.33, drawKey: 'r' },
  { hole: 5, blowNote: 'E5', blowFreq: 659.25, blowKey: '5', drawNote: 'F5', drawFreq: 698.46, drawKey: 't' },
  { hole: 6, blowNote: 'G5', blowFreq: 783.99, blowKey: '6', drawNote: 'A5', drawFreq: 880.00, drawKey: 'y' },
  { hole: 7, blowNote: 'C6', blowFreq: 1046.50, blowKey: '7', drawNote: 'B5', drawFreq: 987.77, drawKey: 'u' },
  { hole: 8, blowNote: 'E6', blowFreq: 1318.51, blowKey: '8', drawNote: 'D6', drawFreq: 1174.66, drawKey: 'i' },
  { hole: 9, blowNote: 'G6', blowFreq: 1567.98, blowKey: '9', drawNote: 'F6', drawFreq: 1396.91, drawKey: 'o' },
  { hole: 10, blowNote: 'C7', blowFreq: 2093.00, blowKey: '0', drawNote: 'A6', drawFreq: 1760.00, drawKey: 'p' },
];

function Harmonica() {
  const [activeNotes, setActiveNotes] = useState<Record<string, boolean>>({});
  const audioContextRef = useRef<AudioContext | null>(null);
  const activeOscillatorsRef = useRef<Record<string, { osc: OscillatorNode; subOsc: OscillatorNode; gain: GainNode }>>({});

  const playNote = (freq: number, noteId: string) => {
    if (activeOscillatorsRef.current[noteId]) return;

    if (!audioContextRef.current) {
      const contextClass = window.AudioContext ?? (window as any).webkitAudioContext;
      if (contextClass) {
        audioContextRef.current = new contextClass();
      }
    }
    const ctx = audioContextRef.current;
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      void ctx.resume();
    }

    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    const subOsc = ctx.createOscillator();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(freq * 2, ctx.currentTime);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, ctx.currentTime);
    filter.Q.setValueAtTime(1.2, ctx.currentTime);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.04);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    subOsc.start();

    activeOscillatorsRef.current[noteId] = { osc, subOsc, gain: gainNode };
    setActiveNotes(prev => ({ ...prev, [noteId]: true }));
  };

  const stopNote = (noteId: string) => {
    const active = activeOscillatorsRef.current[noteId];
    if (active) {
      const ctx = audioContextRef.current;
      if (ctx) {
        active.gain.gain.cancelScheduledValues(ctx.currentTime);
        active.gain.gain.setValueAtTime(active.gain.gain.value, ctx.currentTime);
        active.gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        const osc = active.osc;
        const subOsc = active.subOsc;
        setTimeout(() => {
          try {
            osc.stop();
            subOsc.stop();
          } catch (e) {}
        }, 200);
      }
      delete activeOscillatorsRef.current[noteId];
      setActiveNotes(prev => ({ ...prev, [noteId]: false }));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const key = e.key.toLowerCase();
      harmonicaHoles.forEach(h => {
        if (h.blowKey === key) {
          playNote(h.blowFreq, `blow-${h.hole}`);
        }
        if (h.drawKey === key) {
          playNote(h.drawFreq, `draw-${h.hole}`);
        }
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      harmonicaHoles.forEach(h => {
        if (h.blowKey === key) {
          stopNote(`blow-${h.hole}`);
        }
        if (h.drawKey === key) {
          stopNote(`draw-${h.hole}`);
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      Object.keys(activeOscillatorsRef.current).forEach(stopNote);
    };
  }, []);

  return (
    <main className="page page-harmonica">
      <header className="header">
        <h1>Digital Harmonica</h1>
        <p>Key of C Diatonic</p>
      </header>

      <section className="harmonica-wrapper">
        <div className="harmonica-instructions">
          <div className="instruction-row">
            <span className="inst-label">Blow Keys:</span>
            <div className="keys-row">
              {harmonicaHoles.map(h => (
                <kbd key={`blow-kbd-${h.hole}`} className={activeNotes[`blow-${h.hole}`] ? 'active' : ''}>{h.blowKey}</kbd>
              ))}
            </div>
          </div>
          <div className="instruction-row">
            <span className="inst-label">Draw Keys:</span>
            <div className="keys-row">
              {harmonicaHoles.map(h => (
                <kbd key={`draw-kbd-${h.hole}`} className={activeNotes[`draw-${h.hole}`] ? 'active' : ''}>{h.drawKey}</kbd>
              ))}
            </div>
          </div>
        </div>

        <div className="harmonica-body-wrapper">
          <div className="harmonica-bracket left">
            <div className="screw"></div>
          </div>

          <div className="harmonica-metal-casing">
            <div className="cover-plate top">
              <div className="engraving">Rhythm Realm</div>
            </div>

            <div className="harmonica-comb">
              <div className="harmonica-mouthpiece">
                {harmonicaHoles.map(h => (
                  <div key={`hole-${h.hole}`} className="harmonica-hole">
                    <button
                      type="button"
                      className={`reed-btn blow ${activeNotes[`blow-${h.hole}`] ? 'active-blow' : ''}`}
                      onMouseDown={() => playNote(h.blowFreq, `blow-${h.hole}`)}
                      onMouseUp={() => stopNote(`blow-${h.hole}`)}
                      onMouseLeave={() => stopNote(`blow-${h.hole}`)}
                      onTouchStart={(e) => { e.preventDefault(); playNote(h.blowFreq, `blow-${h.hole}`); }}
                      onTouchEnd={() => stopNote(`blow-${h.hole}`)}
                    >
                      <span className="action">Blow</span>
                      <span className="note">{h.blowNote}</span>
                    </button>
                    <div className="hole-label">{h.hole}</div>
                    <button
                      type="button"
                      className={`reed-btn draw ${activeNotes[`draw-${h.hole}`] ? 'active-draw' : ''}`}
                      onMouseDown={() => playNote(h.drawFreq, `draw-${h.hole}`)}
                      onMouseUp={() => stopNote(`draw-${h.hole}`)}
                      onMouseLeave={() => stopNote(`draw-${h.hole}`)}
                      onTouchStart={(e) => { e.preventDefault(); playNote(h.drawFreq, `draw-${h.hole}`); }}
                      onTouchEnd={() => stopNote(`draw-${h.hole}`)}
                    >
                      <span className="action">Draw</span>
                      <span className="note">{h.drawNote}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="cover-plate bottom"></div>
          </div>

          <div className="harmonica-bracket right">
            <div className="screw"></div>
          </div>
        </div>
      </section>
      <AdSenseUnit />
    </main>
  );
}

function AdSenseUnit() {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e) {
      // Ignore if block or already pushed
    }
  }, []);

  return (
    <div className="partner-holder">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2576666615199262"
        data-ad-slot="1234567890"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

function Footer({ text }: { text: string }) {
  return (
    <footer className="footer">
      <p>&copy; 2024 {text} | All rights reserved.</p>
    </footer>
  );
}

export { App };
