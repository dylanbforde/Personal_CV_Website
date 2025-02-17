
import { useState, useEffect } from 'react';
import './App.css';

const fileSystem = {
  '/': ['home', 'about'],
  '/home': ['experience', 'education', 'skills', 'projects', 'contact'],
  '/home/experience': ['microsoft.txt', 'ucc.txt'],
  '/home/education': ['msc.txt', 'bsc.txt'],
  '/home/skills': ['technical.txt', 'soft.txt'],
  '/home/projects': ['rl.txt', 'llm.txt'],
  '/home/contact': ['email.txt', 'social.txt'],
  '/about': ['readme.txt']
};

const fileContents = {
  '/about/readme.txt': '📝 Welcome to my interactive CV!\nNavigate through directories using cd and ls commands.\nType "help" for more information.',
  '/home/experience/microsoft.txt': '🏢 Microsoft Research (2024)\n- Software Engineering Intern\n- Development of state and API mocking solutions',
  '/home/experience/ucc.txt': '🎓 UCC Lab Demonstrator\n- Teaching assistant for programming courses',
  '/home/education/msc.txt': '🎓 MSc. AI for Medicine @ UCD (2024-2025)',
  '/home/education/bsc.txt': '🎓 BSc. Data Science @ UCC (2020-2024)',
  '/home/skills/technical.txt': '💻 Technical Skills:\n- Python, R, TypeScript, C#, Haskell, C++\n- CUDA, Git, React, .NET, Docker, Linux, MySQL',
  '/home/skills/soft.txt': '🤝 Soft Skills:\n- Problem Solving\n- Team Collaboration\n- Technical Writing',
  '/home/projects/rl.txt': '🤖 Deep RL Agents\n- Implemented reinforcement learning algorithms',
  '/home/projects/llm.txt': '🧠 Basic LLM in C\n- Built a simple language model from scratch',
  '/home/contact/email.txt': '📧 Email: forde.dylan@gmail.com',
  '/home/contact/social.txt': '🔗 LinkedIn: linkedin.com/in/dylanbforde/'
};

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const [currentPath, setCurrentPath] = useState('/');

  const addToOutput = (text) => {
    setOutput(prev => [...prev, text]);
  };

  const getPrompt = () => {
    return `visitor@portfolio:${currentPath}$ `;
  };

  const handleCommand = (cmd) => {
    const [command, ...args] = cmd.trim().split(' ');
    
    switch(command.toLowerCase()) {
      case 'ls':
        const contents = fileSystem[currentPath] || [];
        addToOutput(`${getPrompt()}${cmd}`);
        addToOutput(contents.join('  '));
        break;
        
      case 'cd':
        const newPath = args[0];
        addToOutput(`${getPrompt()}${cmd}`);
        
        if (!newPath || newPath === '/') {
          setCurrentPath('/');
        } else if (newPath === '..') {
          const parentPath = currentPath.split('/').slice(0, -1).join('/') || '/';
          setCurrentPath(parentPath);
        } else {
          const targetPath = newPath.startsWith('/') ? newPath : 
            `${currentPath === '/' ? '' : currentPath}/${newPath}`;
          if (fileSystem[targetPath]) {
            setCurrentPath(targetPath);
          } else {
            addToOutput('Directory not found');
          }
        }
        break;
        
      case 'pwd':
        addToOutput(`${getPrompt()}${cmd}`);
        addToOutput(currentPath);
        break;
        
      case 'cat':
        addToOutput(`${getPrompt()}${cmd}`);
        const filePath = args[0]?.startsWith('/') ? args[0] : 
          `${currentPath === '/' ? '' : currentPath}/${args[0]}`;
        if (fileContents[filePath]) {
          addToOutput(fileContents[filePath]);
        } else {
          addToOutput('File not found');
        }
        break;
        
      case 'clear':
        setOutput([]);
        break;
        
      case 'help':
        addToOutput(`${getPrompt()}${cmd}`);
        addToOutput(
          'Available commands:\n' +
          'ls           - list directory contents\n' +
          'cd <dir>    - change directory (use .. to go up)\n' +
          'pwd         - print working directory\n' +
          'cat <file>  - view file contents\n' +
          'clear       - clear screen\n' +
          'help        - show this help message'
        );
        break;
        
      default:
        addToOutput(`${getPrompt()}${cmd}`);
        addToOutput('Command not found. Type "help" for available commands');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    addToOutput('Welcome to Dylan\'s Interactive CV Terminal\n');
    addToOutput('Type "help" to see available commands\n');
  }, []);

  return (
    <main className="terminal">
      <div className="output">
        {output.map((line, i) => (
          <pre key={i}>{line}</pre>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <span className="prompt">{getPrompt()}</span>
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
