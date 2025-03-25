
import React from 'react';

export const BlogListFile = () => {
  return (
    <div className="blog-entry">
      <h3>📝 Blog Posts</h3>
      <ul>
        <li>react-terminal - Building this terminal portfolio</li>
        <li>reinforcement-learning - My journey with RL</li>
        <li>microsoft-internship - Reflections on MSR</li>
      </ul>
      <p>Use 'read post-name' to open a post (e.g., 'read react-terminal')</p>
    </div>
  );
};

export const ReactTerminalPost = () => {
  return (
    <div className="blog-post">
      <h2>Building a Terminal Portfolio in React</h2>
      <p>I decided to create this terminal-style portfolio to showcase my work in a unique way.
         The project uses React and features tab completion, command history, and file system simulation.</p>
      <p>Key features implemented:</p>
      <ul>
        <li>Command parsing and execution</li>
        <li>Tab completion system</li>
        <li>File system simulation</li>
        <li>Interactive demos</li>
      </ul>
    </div>
  );
};

export const RLPost = () => {
  return (
    <div className="blog-post">
      <h2>My Journey with Reinforcement Learning</h2>
      <p>Working with RL algorithms has been fascinating. From implementing basic Q-learning
         to tackling complex environments with Deep RL, each project brought new insights.</p>
      <p>Check out my RL projects using the 'run rl' command!</p>
    </div>
  );
};

export const MicrosoftPost = () => {
  return (
    <div className="blog-post">
      <h2>Microsoft Research Internship Experience</h2>
      <p>My time at Microsoft Research Dublin has been incredible. Working on state-of-the-art
         projects and collaborating with talented researchers has broadened my perspective.</p>
      <p>Key learnings:</p>
      <ul>
        <li>Building scalable testing solutions</li>
        <li>Working with large codebases</li>
        <li>Contributing to research projects</li>
      </ul>
    </div>
  );
};
