
import { useState, useEffect } from 'react';
import './App.css';

const ASCII_TITLE = `
 ____  _    _ _              ______ _____ _____  ______ 
|  _ \\| |  | | |        /\\  |  ____|  __ \\_   _|/  ____|
| |_) | |  | | |       /  \\ | |__  | |  | || | |  (___  
|  _ <| |  | | |      / /\\ \\|  __| | |  | || |  \\___ \\ 
| |_) | |__| | |____ / ____ \\ |    | |__| || |_ ____) |
|____/ \\____/|______/_/    \\_\\_|    |_____/_____|_____/ 
`;

const ASCII_PLAYER = `
   O
  /|\\
  / \\
`;

const sections = [
  {
    id: 'intro',
    text: "Welcome to Dylan's Interactive CV! Use arrow keys or type 'next' to continue.",
    choices: ['next']
  },
  {
    id: 'education',
    text: "🎓 Education:\n- MSc. AI for Medicine @ UCD (2024-2025)\n- BSc. Data Science @ UCC (2020-2024)",
    choices: ['experience', 'projects', 'skills']
  },
  {
    id: 'experience',
    text: "💼 Experience:\n- Microsoft Research (2024)\n- UCC Lab Demonstrator\n- Agnicio Data Science Intern",
    choices: ['education', 'projects', 'skills']
  },
  {
    id: 'projects',
    text: "🚀 Projects:\n- Deep RL Agents\n- Basic LLM in C\n- Sign Language Recognizer\n- Orbital Mechanics Simulation",
    choices: ['education', 'experience', 'skills']
  },
  {
    id: 'skills',
    text: "🛠 Skills:\n- Python, R, TypeScript, C#, Haskell, C++\n- CUDA, Git, React, .NET, Docker, Linux, MySQL",
    choices: ['education', 'experience', 'projects']
  }
];

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);

  const addToOutput = (text) => {
    setOutput(prev => [...prev, text]);
  };

  const handleCommand = (cmd) => {
    const command = cmd.toLowerCase().trim();
    if (command === 'next' && currentSection === 0) {
      setCurrentSection(1);
      addToOutput('Loading education section...');
    } else if (sections[currentSection].choices.includes(command)) {
      const newIndex = sections.findIndex(s => s.id === command);
      setCurrentSection(newIndex);
      addToOutput(`Loading ${command} section...`);
    } else {
      addToOutput('Invalid command. Try: ' + sections[currentSection].choices.join(', '));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToOutput(`> ${input}`);
    handleCommand(input);
    setInput('');
  };

  useEffect(() => {
    addToOutput(ASCII_TITLE);
    addToOutput(ASCII_PLAYER);
    addToOutput(sections[0].text);
  }, []);

  return (
    <main className="terminal">
      <div className="output">
        {output.map((line, i) => (
          <pre key={i}>{line}</pre>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <span className="prompt">{'>'}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          spellCheck="false"
        />
      </form>
    </main>
  );
}
