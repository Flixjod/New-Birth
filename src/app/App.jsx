import { useEffect } from 'react';
import { birthdayConfig } from '../config/birthday';
import { AudioProvider } from '../components/Audio/AudioManager';
import Experience from './Experience';

/**
 * New-Birth — one continuous story:
 * intro → mystery → countdown → midnight → memory-world → sketchbook →
 * scrapbook → gallery → personal-message → appreciation → surprise →
 * phone-message → cake → final-letter → ending.
 */
export default function App() {
  useEffect(() => {
    document.title = `New-Birth ✦ Happy Birthday ${birthdayConfig.name}`;
  }, []);

  return (
    <AudioProvider config={birthdayConfig}>
      <div className="nb-app">
        <Experience config={birthdayConfig} />
      </div>
    </AudioProvider>
  );
}
