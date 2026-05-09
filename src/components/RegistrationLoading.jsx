import React, { useState, useEffect } from 'react';
import { Shield, Globe, Database, Zap, CheckCircle2, Loader2 } from 'lucide-react';
import './RegistrationLoading.css';

const steps = [
  { id: 1, text: "Securing your membership credentials...", icon: <Shield size={24} /> },
  { id: 2, text: "Connecting to global deals network...", icon: <Globe size={24} /> },
  { id: 3, text: "Synchronizing your personalized dashboard...", icon: <Database size={24} /> },
  { id: 4, text: "Generating exclusive discount links...", icon: <Zap size={24} /> },
  { id: 5, text: "Finalizing your portal access...", icon: <Loader2 size={24} className="spinning" /> }
];

export default function RegistrationLoading({ color = '#22c55e' }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Cycle through steps every 8-10 seconds to cover the 40-50s window
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 9000);

    // Smooth progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev; // Stop at 95% until backend returns
        return prev + 0.2;
      });
    }, 100);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="registration-loading-overlay">
      <div className="registration-loading-card" style={{ '--accent-color': color }}>
        <div className="loading-header">
          <div className="loading-spinner-container">
            <div className="main-spinner"></div>
            <div className="spinner-icon">
              {steps[currentStep].icon}
            </div>
          </div>
          <h2>Setting Up Your Portal</h2>
          <p>Please wait while we prepare your exclusive deals...</p>
        </div>

        <div className="loading-steps">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`loading-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
            >
              <div className="step-indicator">
                {index < currentStep ? <CheckCircle2 size={16} /> : <div className="step-dot" />}
              </div>
              <span className="step-text">{step.text}</span>
            </div>
          ))}
        </div>

        <div className="progress-container">
          <div className="progress-bar-wrapper">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%`, backgroundColor: color }}
            />
          </div>
          <div className="progress-stats">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>

        <div className="loading-footer">
          <p>This might take some moments. Please don't close this window</p>
        </div>
      </div>
    </div>
  );
}
