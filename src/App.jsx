
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

import { ReadmeFile } from './components/About';
import { MicrosoftFile, UCCFile } from './components/Experience';
import { MscFile, BscFile } from './components/Education';
import { TechnicalFile, SoftFile } from './components/Skills';
import { RLFile, LLMFile } from './components/Projects';
import { EmailFile, SocialFile } from './components/Contact';

const fileComponents = {
  '/about/readme.txt': ReadmeFile,
  '/home/experience/microsoft.txt': MicrosoftFile,
  '/home/experience/ucc.txt': UCCFile,
  '/home/education/msc.txt': MscFile,
  '/home/education/bsc.txt': BscFile,
  '/home/skills/technical.txt': TechnicalFile,
  '/home/skills/soft.txt': SoftFile,
  '/home/projects/rl.txt': RLFile,
  '/home/projects/llm.txt': LLMFile,
  '/home/contact/email.txt': EmailFile,
  '/home/contact/social.txt': SocialFile
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
        if (fileComponents[filePath]) {
          const Component = fileComponents[filePath];
          addToOutput(<Component />);
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
