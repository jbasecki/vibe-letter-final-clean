'use client';
import React, { useState, useEffect } from 'react';
import TutorialOverlay from './TutorialOverlay';
import TutorialOverlayMobile from './TutorialOverlayMobile';

interface SmartTutorialProps {
    onComplete: () => void;
}

export default function SmartTutorial({ onComplete }: SmartTutorialProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect if mobile device
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile ? (
        <TutorialOverlayMobile onComplete={onComplete} />
    ) : (
        <TutorialOverlay onComplete={onComplete} />
    );
}
