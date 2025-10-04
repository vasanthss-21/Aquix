import { useState } from "react";
import "./styles.css"

const AudioChallenge = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audio = new Audio("/assets/scam_audio.mp3");

  const handlePlay = () => {
    if (!isPlaying) {
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false); // Reset state when audio ends
    }
  };

  return (
    <div className="audio-challenge-container">
      <h2>Final Scam Awareness Challenge</h2>
      <p>Listen to the audio and answer the question.</p>
      
      <div className="audio-section">
        <img src="/assets/audio_icon.png" alt="Audio Icon" className="audio-icon" />
        <button className="play-button" onClick={handlePlay} disabled={isPlaying}>
          {isPlaying ? "Playing..." : "Play Audio"}
        </button>
      </div>

      <h3>What action should you take after hearing this?</h3>
      <button className="answer-button">Report as Scam</button>
      <button className="answer-button">Ignore</button>
    </div>
  );
};

export default AudioChallenge;
