
import { useState, useEffect } from 'react';
import './App.css';

const ASCII_TITLE = `
   _____                              
  |  __ \\                             
  | |__) |___  ___ _   _ _ __ ___  ___ 
  |  _  // _ \\/ __| | | | '_ \` _ \\/ _ \\
  | | \\ \\  __/\\__ \\ |_| | | | | | |  __/
  |_|  \\_\\___||___/\\__,_|_| |_| |_|\\___|
`;

const fileSystem = {
  '/': ['experience', 'education', 'skills', 'projects'],
  '/experience': ['microsoft.txt', 'ucc.txt'],
  '/education': ['msc.txt', 'bsc.txt'],
  '/skills': ['technical.txt', 'soft.txt'],
  '/projects': ['rl.txt', 'llm.txt']
};

const fileContents = {
  '/experience/microsoft.txt': '🏢 Microsoft Research (2024)\n- Software Engineering Intern\n- Development of state and API mocking solutions',
  '/experience/ucc.txt': '🎓 UCC Lab Demonstrator\n- Teaching assistant for programming courses',
  '/education/msc.txt': '🎓 MSc. AI for Medicine @ UCD (2024-2025)',
  '/education/bsc.txt': '🎓 BSc. Data Science @ UCC (2020-2024)',
  '/skills/technical.txt': '💻 Technical Skills:\n- Python, R, TypeScript, C#, Haskell, C++\n- CUDA, Git, React, .NET, Docker, Linux, MySQL',
  '/skills/soft.txt': '🤝 Soft Skills:\n- Problem Solving\n- Team Collaboration\n- Technical Writing',
  '/projects/rl.txt': '🤖 Deep RL Agents\n- Implemented reinforcement learning algorithms',
  '/projects/llm.txt': '🧠 Basic LLM in C\n- Built a simple language model from scratch'
};

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

  const [currentPath, setCurrentPath] = useState('/');

  const handleCommand = (cmd) => {
    const [command, ...args] = cmd.trim().split(' ');
    
    switch(command.toLowerCase()) {
      case 'ls':
        const contents = fileSystem[currentPath] || [];
        addToOutput(contents.join('  '));
        break;
        
      case 'cd':
        const newPath = args[0];
        if (!newPath || newPath === '/') {
          setCurrentPath('/');
          addToOutput('Changed to root directory');
        } else if (fileSystem[`${currentPath}${newPath}`]) {
          setCurrentPath(`${currentPath}${newPath}`);
          addToOutput(`Changed to ${newPath}`);
        } else if (fileSystem[newPath]) {
          setCurrentPath(newPath);
          addToOutput(`Changed to ${newPath}`);
        } else {
          addToOutput('Directory not found');
        }
        break;
        
      case 'pwd':
        addToOutput(currentPath);
        break;
        
      case 'cat':
        const filePath = args[0].startsWith('/') ? args[0] : `${currentPath}${args[0]}`;
        if (fileContents[filePath]) {
          addToOutput(fileContents[filePath]);
        } else {
          addToOutput('File not found');
        }
        break;
        
      case 'help':
        addToOutput('Available commands:\nls - list contents\ncd <dir> - change directory\npwd - print working directory\ncat <file> - view file contents\nclear - clear screen');
        break;
        
      case 'clear':
        setOutput([ASCII_TITLE]);
        break;
        
      default:
        addToOutput('Command not found. Type "help" for available commands');
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
    addToOutput(ASCII_DIVIDER);
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
