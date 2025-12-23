'use client';
import React, { useState, useEffect } from 'react';

interface TutorialStep {
    title: string;
    description: string;
    position: { top?: string; bottom?: string; left?: string; right?: string };
    highlightArea?: { top?: string; bottom?: string; left?: string; right?: string; width: string; height: string };
    emoji: string;
}

const TUTORIAL_STEPS: TutorialStep[] = [
    {
        title: "Welcome to Heart in a Box! 💙",
        description: "Let me show you how to send a heartfelt message in just 3 easy steps!",
        position: { top: '50%', left: '50%' },
        emoji: "🎁",
    },
    {
        title: "Step 1: Write Your Message",
        description: "Type your heartfelt message in the text box below. Don't hold back - say what's in your heart!",
        position: { bottom: '180px', left: '50%' },
        highlightArea: { top: '65%', left: '23%', width: '54%', height: '180px' },
        emoji: "✍️",
    },
    {
        title: "Step 2: Choose Special Words (Optional)",
        description: "Click on words in the top box to transform them into beautiful 3D letter cards. These will appear inside the gift box as a surprise!",
        position: { top: '52%', left: '50%' },
        highlightArea: { top: '45%', left: '23%', width: '54%', height: '70px' },
        emoji: "✨",
    },
    {
        title: "Step 3: Pick a Scene",
        description: "Choose a beautiful background scene (1-12) that matches the mood of your message.",
        position: { top: '30%', right: '320px' },
        highlightArea: { top: '15%', right: '50px', width: '290px', height: '250px' },
        emoji: "🎬",
    },
    {
        title: "Preview & Send!",
        description: "Use the 👁️ button to preview, then hit SEND to deliver your heart in a box! Your recipient can even send a hug back! 🤗",
        position: { top: '58%', right: '150px' },
        highlightArea: { top: '53%', right: '50px', width: '290px', height: '90px' },
        emoji: "🚀",
    },
];

interface TutorialOverlayProps {
    onComplete: () => void;
}

export default function TutorialOverlay({ onComplete }: TutorialOverlayProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Check if user has seen tutorial before
        const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
        if (hasSeenTutorial) {
            setIsVisible(false);
            onComplete();
        }
    }, [onComplete]);

    const handleNext = () => {
        if (currentStep < TUTORIAL_STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleComplete();
        }
    };

    const handleSkip = () => {
        handleComplete();
    };

    const handleComplete = () => {
        localStorage.setItem('hasSeenTutorial', 'true');
        setIsVisible(false);
        onComplete();
    };

    if (!isVisible) return null;

    const step = TUTORIAL_STEPS[currentStep];

    return (
        <>
            {/* DARK OVERLAY */}
            <div 
                style={{ 
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.85)',
                    zIndex: 9998,
                    animation: 'fadeIn 0.3s ease',
                }}
                onClick={handleSkip}
            />

            {/* HIGHLIGHT AREA */}
            {step.highlightArea && (
                <div 
                    style={{
                        position: 'fixed',
                        top: step.highlightArea.top,
                        left: step.highlightArea.left,
                        right: step.highlightArea.right,
                        bottom: step.highlightArea.bottom,
                        width: step.highlightArea.width,
                        height: step.highlightArea.height,
                        border: '3px solid #0070f3',
                        borderRadius: '20px',
                        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.85), 0 0 30px rgba(0, 112, 243, 0.8)',
                        zIndex: 9999,
                        pointerEvents: 'none',
                        animation: 'pulse 2s ease-in-out infinite',
                    }}
                />
            )}

            {/* TUTORIAL CARD */}
            <div 
                style={{
                    position: 'fixed',
                    top: step.position.top === '50%' ? '50%' : step.position.top,
                    left: step.position.left === '50%' ? '50%' : step.position.left,
                    right: step.position.right,
                    bottom: step.position.bottom,
                    transform: (step.position.top === '50%' || step.position.left === '50%') 
                        ? 'translate(-50%, -50%)' 
                        : 'none',
                    background: 'linear-gradient(135deg, rgba(0, 112, 243, 0.95) 0%, rgba(0, 80, 200, 0.95) 100%)',
                    backdropFilter: 'blur(10px)',
                    padding: '35px 40px',
                    borderRadius: '25px',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 20px 60px rgba(0, 112, 243, 0.5), 0 0 40px rgba(0, 112, 243, 0.3)',
                    zIndex: 10000,
                    maxWidth: '450px',
                    animation: 'slideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* EMOJI */}
                <div style={{
                    fontSize: '60px',
                    textAlign: 'center',
                    marginBottom: '20px',
                    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
                }}>
                    {step.emoji}
                </div>

                {/* TITLE */}
                <h2 style={{
                    color: '#fff',
                    fontSize: '1.8rem',
                    fontWeight: 'bold',
                    marginBottom: '15px',
                    textAlign: 'center',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                }}>
                    {step.title}
                </h2>

                {/* DESCRIPTION */}
                <p style={{
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    textAlign: 'center',
                    marginBottom: '25px',
                }}>
                    {step.description}
                </p>

                {/* PROGRESS DOTS */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                    marginBottom: '25px',
                }}>
                    {TUTORIAL_STEPS.map((_, index) => (
                        <div
                            key={index}
                            style={{
                                width: index === currentStep ? '30px' : '10px',
                                height: '10px',
                                borderRadius: '5px',
                                background: index === currentStep 
                                    ? '#fff' 
                                    : 'rgba(255, 255, 255, 0.3)',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer',
                            }}
                            onClick={() => setCurrentStep(index)}
                        />
                    ))}
                </div>

                {/* BUTTONS */}
                <div style={{
                    display: 'flex',
                    gap: '15px',
                    justifyContent: 'center',
                }}>
                    <button
                        onClick={handleSkip}
                        style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            border: '2px solid rgba(255, 255, 255, 0.4)',
                            borderRadius: '50px',
                            padding: '12px 30px',
                            color: '#fff',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                        }}
                    >
                        Skip Tutorial
                    </button>

                    <button
                        onClick={handleNext}
                        style={{
                            background: '#fff',
                            border: '2px solid #fff',
                            borderRadius: '50px',
                            padding: '12px 35px',
                            color: '#0070f3',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 255, 255, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.3)';
                        }}
                    >
                        {currentStep === TUTORIAL_STEPS.length - 1 ? "Let's Go! 🚀" : "Next →"}
                    </button>
                </div>

                {/* STEP COUNTER */}
                <div style={{
                    textAlign: 'center',
                    marginTop: '20px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.9rem',
                }}>
                    Step {currentStep + 1} of {TUTORIAL_STEPS.length}
                </div>
            </div>

            {/* ANIMATIONS */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%) scale(1);
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.85), 
                                    0 0 30px rgba(0, 112, 243, 0.8);
                    }
                    50% {
                        box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.85), 
                                    0 0 50px rgba(0, 112, 243, 1);
                    }
                }
            `}</style>
        </>
    );
}
