import { useEffect , useState , useRef } from "react";

const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState([]);
  const synth = useRef();
  
  const updateVoices = () => {
    setVoices(synth.current.getVoices());
  };
  
  const speak = (text, voice, pitch = 1, rate = 1) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = rate;
    synth.current.speak(utterance);
  }
  
  useEffect(() => {
    if (typeof window !== 'object' || !window.speechSynthesis) return;
    synth.current = window.speechSynthesis;
    synth.current.onvoiceschanged = updateVoices;
    updateVoices();
    
    return () => {
      synth.current.onvoiceschanged = null
    }
  }, []);
  
  return ([
    voices,
    speak,
  ]);
}

export default () => {
  const [ voices, speak ] = useSpeechSynthesis();
  const [ currentVoice, setCurrentVoice ] = useState();
  const [ text, setText ] = useState('may i have some hooks, please');
  
  useEffect(() => {
    if (!currentVoice) {
      setCurrentVoice(voices.filter(v => v.default)[0] || voices[0]);
    }
  }, [voices])
  
  const handleVoiceChange = e => {
    setCurrentVoice(voices.filter(v => v.name === e.target.value)[0]);
  }
  
  const handleTextChange = e => {
    setText(e.target.value);
  }
  
  const handleSpeak = e => {
    e.preventDefault();
    speak(text, currentVoice);
  }

  return (
    <form className="contain" onSubmit={handleSpeak}>
      <div className="center-container">
      <div className="select">
        <select value={currentVoice ? currentVoice.name : ''} onChange={handleVoiceChange}>
          {voices.map((v, index) => (
            <option key={index} value={v.name}>{`${v.name}`}</option>
          ))}
        </select>
      </div>

      {/* <input type="text" value={text} onChange={handleTextChange} /> */}

      <button type="submit">🗣</button>
      </div>
    </form>
  );
};