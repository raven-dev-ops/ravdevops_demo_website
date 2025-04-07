import { useState, useEffect } from 'react';

// Simple hook to manage and play a sound effect
const useSound = (soundUrl, { volume = 1.0 } = {}) => {
  const [audio, setAudio] = useState(null);

  // Create Audio object once on mount
  useEffect(() => {
    const audioInstance = new Audio(soundUrl);
    audioInstance.volume = volume;
    setAudio(audioInstance);

    // Optional: Cleanup function to pause audio if component unmounts while playing
    return () => {
      if (audioInstance) {
        audioInstance.pause();
        audioInstance.currentTime = 0;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundUrl]); // Re-create if soundUrl changes (unlikely here)

  const play = () => {
    if (audio) {
      // Reset playback position to allow rapid re-triggering
      audio.currentTime = 0;
      audio.play().catch(error => {
        // Autoplay restrictions might prevent playing without user interaction first
        // Or other errors
        console.error("Audio play failed:", error);
      });
    }
  };

  return play; // Return only the play function
};

export default useSound;