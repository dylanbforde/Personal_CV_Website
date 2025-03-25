import { useState, useEffect } from "react";
import "./App.css";

const fileSystem = {
  "/": ["home", "about"],
  "/home": ["experience", "education", "skills", "projects", "contact", "blog"],
  "/home/blog": ["react-terminal.txt"],
  "/home/experience": [
    "microsoftInternship.txt",
    "ucc.txt",
    "microsoftPlacement.txt",
    "agnicio.txt",
    "dwyers.txt",
  ],
  "/home/education": ["msc.txt", "bsc.txt"],
  "/home/skills": ["technical.txt", "soft.txt"],
  "/home/projects": ["rl.txt", "llm.txt"],
  "/home/contact": ["email.txt", "social.txt"],
  "/about": ["readme.txt"],
};

import { ReadmeFile } from "./components/About";
import { RunFile } from "./components/RunFile";
import {
  AgnicioFile,
  DwyersFile,
  MicrosoftFile,
  MicrosoftPlacementFile,
  UCCFile,
} from "./components/Experience";
import { MscFile, BscFile } from "./components/Education";
import { TechnicalFile, SoftFile } from "./components/Skills";
import { RLFile, LLMFile } from "./components/Projects";
import { EmailFile, SocialFile } from "./components/Contact";
import { BlogListFile, BlogPost } from "./components/Blog";

const fileComponents = {
  "/home/blog/posts.txt": BlogListFile,
  "/home/blog/react-terminal.txt": () => <BlogPost postId="react-terminal" />,
  "/about/readme.txt": ReadmeFile,
  "/home/experience/microsoftInternship.txt": MicrosoftFile,
  "/home/experience/ucc.txt": UCCFile,
  "/home/experience/agnicio.txt": AgnicioFile,
  "/home/experience/dwyers.txt": DwyersFile,
  "/home/experience/microsoftPlacement.txt": MicrosoftPlacementFile,
  "/home/education/msc.txt": MscFile,
  "/home/education/bsc.txt": BscFile,
  "/home/skills/technical.txt": TechnicalFile,
  "/home/skills/soft.txt": SoftFile,
  "/home/projects/rl.txt": RLFile,
  "/home/projects/llm.txt": LLMFile,
  "/home/contact/email.txt": EmailFile,
  "/home/contact/social.txt": SocialFile,
};

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [currentPath, setCurrentPath] = useState("/");

  const addToOutput = (text) => {
    setOutput((prev) => [...prev, text]);
  };

  const getPrompt = () => {
    return `visitor@portfolio:${currentPath}$ `;
  };

  const handleCommand = (cmd) => {
    const [command, ...args] = cmd.trim().split(" ");

    switch (command.toLowerCase()) {
      case "ls":
        const contents = fileSystem[currentPath] || [];
        addToOutput(`${getPrompt()}${cmd}`);
        addToOutput(contents.join("  "));
        break;

      case "cd":
        const newPath = args[0];
        addToOutput(`${getPrompt()}${cmd}`);

        if (!newPath || newPath === "/") {
          setCurrentPath("/");
        } else if (newPath === "..") {
          const parentPath =
            currentPath.split("/").slice(0, -1).join("/") || "/";
          setCurrentPath(parentPath);
        } else {
          const targetPath = newPath.startsWith("/")
            ? newPath
            : `${currentPath === "/" ? "" : currentPath}/${newPath}`;
          if (fileSystem[targetPath]) {
            setCurrentPath(targetPath);
          } else {
            addToOutput("Directory not found");
          }
        }
        break;

      case "pwd":
        addToOutput(`${getPrompt()}${cmd}`);
        addToOutput(currentPath);
        break;

      case "cat":
        addToOutput(`${getPrompt()}${cmd}`);
        const filePath = args[0]?.startsWith("/")
          ? args[0]
          : `${currentPath === "/" ? "" : currentPath}/${args[0]}`;
        if (fileComponents[filePath]) {
          const Component = fileComponents[filePath];
          addToOutput(<Component />);
        } else {
          addToOutput("File not found");
        }
        break;

      case "clear":
        setOutput([]);
        break;

      case "help":
        addToOutput(`${getPrompt()}${cmd}`);
        addToOutput(
          "Available commands:\n" +
            "ls           - list directory contents\n" +
            "cd <dir>    - change directory (use .. to go up)\n" +
            "pwd         - print working directory\n" +
            "cat <file>  - view file contents\n" +
            "clear       - clear screen\n" +
            "run <demo>  - run interactive demos (try: run rl, run llm)\n" +
            "read <post> - read a blog post\n" +
            "help        - show this help message",
        );
        break;

      case "read":
        addToOutput(`${getPrompt()}${cmd}`);
        const postName = args[0];
        const postPath = `/home/blog/${postName}.txt`;
        if (fileComponents[postPath]) {
          const Component = fileComponents[postPath];
          addToOutput(<Component />);
        } else {
          addToOutput(
            "Blog post not found. Use 'cat /home/blog/posts.txt' to see available posts.",
          );
        }
        break;

      case "run":
        addToOutput(`${getPrompt()}${cmd}`);
        if (args[0]) {
          const Component = RunFile;
          addToOutput(<Component fileName={args[0]} />);
        } else {
          addToOutput("Please specify what to run (e.g., run rl, run llm)");
        }
        break;

      default:
        addToOutput(`${getPrompt()}${cmd}`);
        addToOutput('Command not found. Type "help" for available commands');
    }
  };

  const getAvailableCommands = (forCommand) => {
    const basicCommands = ["ls", "cd", "pwd", "cat", "clear", "help", "run"];

    if (!forCommand) {
      return basicCommands;
    }

    // For 'cat' command, only return files in current directory
    if (forCommand === "cat") {
      const files = fileSystem[currentPath] || [];
      return files.filter((file) => file.endsWith(".txt"));
    }

    // For 'cd' command, only return directories
    if (forCommand === "cd") {
      const currentDirs = fileSystem[currentPath] || [];
      return currentDirs.filter((item) => !item.endsWith(".txt"));
    }

    return [];
  };

  const [lastPartial, setLastPartial] = useState("");

  const handleTabComplete = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const parts = input.split(" ");
      const commands = getAvailableCommands();

      if (parts.length > 1) {
        // Handle command arguments
        const command = parts[0];
        const currentArg = parts[parts.length - 1].toLowerCase();

        // If this is a new tab sequence, store the partial
        if (currentArg !== lastPartial) {
          setLastPartial(currentArg);
        }

        const availableOptions = getAvailableCommands(command);
        const matches = availableOptions.filter((opt) =>
          opt.toLowerCase().startsWith(lastPartial),
        );

        if (matches.length > 0) {
          const currentIndex = matches.findIndex(
            (match) => match.toLowerCase() === currentArg.toLowerCase(),
          );
          const nextIndex =
            currentIndex === -1 ? 0 : (currentIndex + 1) % matches.length;

          const nextMatch = matches[nextIndex];

          parts[parts.length - 1] = nextMatch;
          setInput(parts.join(" "));
        }
      } else {
        // Handle single command
        const basicCommands = [
          "ls",
          "cd",
          "pwd",
          "cat",
          "clear",
          "help",
          "run",
        ];
        const matches = basicCommands.filter((cmd) =>
          cmd.startsWith(input.toLowerCase()),
        );
        if (matches.length > 0) {
          const currentIndex = matches.findIndex(
            (match) => match === input.toLowerCase(),
          );
          const nextIndex =
            currentIndex === -1 ? 0 : (currentIndex + 1) % matches.length;
          setInput(matches[nextIndex]);
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput("");
    }
  };

  useEffect(() => {
    addToOutput("Welcome to Dylan's Interactive CV Terminal\n");
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
          onKeyDown={handleTabComplete}
          autoFocus
          spellCheck="false"
        />
      </form>
    </main>
  );
}
