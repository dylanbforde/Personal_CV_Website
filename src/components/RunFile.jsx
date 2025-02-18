
import React, { useState, useEffect } from 'react';

const ProjectDemo = ({ project }) => {
  const [step, setStep] = useState(0);

  switch(project) {
    case 'rl':
      return (
        <div className="project-demo">
          <h3>🤖 Reinforcement Learning Demo</h3>
          <div className="demo-container">
            {/* Animated visualization of RL agent */}
            <div className="agent" style={{
              transform: `translateX(${step * 50}px)`,
              transition: 'transform 0.5s ease'
            }}>🤖</div>
            <div className="goal">🎯</div>
          </div>
          <button onClick={() => setStep(prev => (prev + 1) % 5)}>Step Agent</button>
        </div>
      );
    case 'llm':
      return (
        <div className="project-demo">
          <h3>🧠 Language Model Demo</h3>
          <div className="demo-container">
            <div className="typing-effect">
              Hello, I am a basic language model...
            </div>
          </div>
        </div>
      );
    default:
      return <div>Demo not found. Try 'run rl' or 'run llm'</div>;
  }
};

export const RunFile = ({ fileName }) => {
  return <ProjectDemo project={fileName} />;
};
