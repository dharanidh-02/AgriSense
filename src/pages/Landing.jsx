import React from 'react';
import './Landing.css';

export default function Landing({ onStart }) {
    return (
        <div className="landing-container">
            {/* Organic ambient background elements instead of generic blobs */}
            <div className="ambient-shape ambient-top"></div>
            <div className="ambient-shape ambient-bottom"></div>
            <div className="ambient-pattern"></div>

            <main className="landing-content">
                <div className="landing-hero">
                    <div className="hero-brand">
                        <span className="brand-dot"></span>
                        <span className="brand-name">AgriSense</span>
                    </div>

                    <h1 className="hero-title">
                        Grow smarter,<br />
                        <span className="title-highlight">not harder.</span>
                    </h1>

                    <p className="hero-subtitle">
                        Your intelligent farming companion. Get real-time disease analysis, market insights, and voice-guided advice tailored for your crops.
                    </p>

                    <button className="cta-button" onClick={onStart}>
                        <span>Start Exploring</span>
                        <div className="cta-arrow">→</div>
                    </button>
                </div>

                <div className="landing-showcase">
                    <div className="showcase-item">
                        <div className="item-marker">01</div>
                        <div className="item-content">
                            <h3>Voice Assistant</h3>
                            <p>Speak naturally. Get farming advice instantly in your native language.</p>
                        </div>
                    </div>

                    <div className="showcase-item offset">
                        <div className="item-marker">02</div>
                        <div className="item-content">
                            <h3>Plant Diagnostics</h3>
                            <p>Scan leaves to detect diseases. Precision AI identifies the exact issue.</p>
                        </div>
                    </div>

                    <div className="showcase-item">
                        <div className="item-marker">03</div>
                        <div className="item-content">
                            <h3>Live Market Rates</h3>
                            <p>Track real-time Mandi prices to maximize your harvest's profitability.</p>
                        </div>
                    </div>

                    <div className="showcase-item offset" style={{marginTop: "20px"}}>
                        <div className="item-marker">04</div>
                        <div className="item-content">
                            <h3>Schemes & Subsidies</h3>
                            <p>Discover government and private agricultural schemes. Access the latest farming subsidies easily.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
