import React from 'react';
import './LandingPage.css';

const LandingPage: React.FC = () => {
    return (
        <div className="landing-page">
            <header className="landing-page-header">
                <h1>Welcome to CodeAlpha</h1>
                <p>Your collaboration editor</p>
                <button className="cta-button">Get Started</button>
            </header>
        </div>
    );
};

export default LandingPage;