import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IndexPage = () => {
    const [loaderVisible, setLoaderVisible] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoaderVisible(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!loaderVisible) {
            const chatBubbles = document.querySelectorAll('.animated-chat-bubble');
            chatBubbles.forEach((bubble, index) => {
                setTimeout(() => {
                    bubble.classList.add('is-visible');
                }, index * 600);
            });
        }
    }, [loaderVisible]);

    const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate('/mvp');
    };

    return (
        <div className="text-gray-800">
            <style>{`
                html { scroll-behavior: smooth; }
                body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #FFFFFF; }
                .font-mono { font-family: 'Space Mono', monospace; }
                .text-accent { color: #00C8FF; }
                .bg-accent { background-color: #00C8FF; }
                .hero-bg { background-color: #ffffff; background-image: radial-gradient(rgba(0, 200, 255, 0.2) 1px, transparent 1px); background-size: 20px 20px; animation: pulse-bg 10s infinite ease-in-out; }
                @keyframes pulse-bg { 0%, 100% { background-size: 20px 20px; } 50% { background-size: 25px 25px; } }
                .chat-bubble-user { background-color: #00C8FF; color: #1F2937; border-radius: 20px 20px 5px 20px; align-self: flex-end; }
                .chat-bubble-chip { background-color: #F3F4F6; color: #1F2937; border-radius: 20px 20px 20px 5px; align-self: flex-start; }
                .feature-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
                .feature-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }
                .loader-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #FFFFFF; display: flex; justify-content: center; align-items: center; z-index: 9999; transition: opacity 0.5s ease; opacity: ${loaderVisible ? 1 : 0}; pointer-events: ${loaderVisible ? 'all' : 'none'}; }
                .typing-loader { display: flex; align-items: center; justify-content: center; }
                .typing-dot { width: 8px; height: 8px; margin: 0 3px; background-color: #00C8FF; border-radius: 50%; animation: typing-bounce 1.4s infinite ease-in-out both; }
                .typing-dot:nth-child(1) { animation-delay: -0.32s; }
                .typing-dot:nth-child(2) { animation-delay: -0.16s; }
                @keyframes typing-bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1.0); } }
                @keyframes logo-pulse { 50% { transform: scale(1.1); } }
                .logo-pulse-animation { animation: logo-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                .animated-chat-bubble { opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease-out, transform 0.5s ease-out; }
                .animated-chat-bubble.is-visible { opacity: 1; transform: translateY(0); }
                .tech-table td { padding: 0.75rem 1rem; border-bottom: 1px solid #e5e7eb; }
            `}</style>

            <div id="loader" className="loader-container">
                <div className="flex flex-col items-center">
                    <img src="logo.svg" alt="CHIP Logo" className="w-24 h-24 logo-pulse-animation" />
                    <div className="typing-loader mt-8">
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                        <div className="typing-dot"></div>
                    </div>
                </div>
            </div>

            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <img src="logo.svg" alt="CHIP Logo" className="w-10 h-10" />
                        <span className="text-2xl font-bold text-gray-800">CHIP</span>
                    </div>
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#how-it-works" className="text-gray-600 hover:text-accent transition">How It Works</a>
                        <a href="#features" className="text-gray-600 hover:text-accent transition">Features</a>
                        <a href="#security" className="text-gray-600 hover:text-accent transition">Security</a>
                        <a href="#tech" className="text-gray-600 hover:text-accent transition">Tech</a>
                    </nav>
                    <a href="https://github.com/chandan989/C.H.I.P." target="_blank" rel="noopener noreferrer" className="bg-accent text-black font-bold px-5 py-2.5 rounded-full hover:bg-opacity-80 transition shadow-sm hover:shadow-md">GitHub</a>
                </div>
            </header>

            <main className="hero-bg">
                <section className="container mx-auto px-6 py-20 md:py-32 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="font-extrabold text-5xl md:text-7xl leading-tight text-gray-900">
                            Shop the entire internet through <span className="text-accent">one conversation.</span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            CHIP is your friendly AI shopping companion. It finds what you want, adds it to a universal cart, and buys it for you. Stop scrolling, start talking.
                        </p>
                        <div className="mt-10 flex justify-center items-center gap-4">
                            <a href="#cta" onClick={handleCTAClick} className="bg-accent text-black font-bold px-8 py-4 rounded-full hover:bg-opacity-80 transition shadow-lg hover:shadow-xl transform hover:scale-105">Try our MVP</a>
                        </div>
                    </div>

                    <div id="chat-demo" className="mt-20 max-w-2xl mx-auto">
                        <div className="bg-white p-6 rounded-3xl shadow-2xl flex flex-col space-y-4">
                            <div className="animated-chat-bubble flex items-start space-x-3 chat-bubble-chip p-4">
                                <img src="logo.svg" alt="CHIP avatar" className="w-8 h-8 flex-shrink-0" />
                                <p className="text-left">Hey! What are we shopping for today?</p>
                            </div>
                            <div className="animated-chat-bubble chat-bubble-user p-4 max-w-xs md:max-w-sm font-medium">
                                <p>I want some new running sneakers, around $100.</p>
                            </div>
                            <div className="animated-chat-bubble flex items-start space-x-3 chat-bubble-chip p-4">
                                <img src="logo.svg" alt="CHIP avatar" className="w-8 h-8 flex-shrink-0" />
                                <p className="text-left">Great! Any brand you like? I'm searching the web now...</p>
                            </div>
                            <div className="animated-chat-bubble flex items-start space-x-3 chat-bubble-chip p-4">
                                <img src="logo.svg" alt="CHIP avatar" className="w-8 h-8 flex-shrink-0" />
                                <p className="text-left">Okay, I found three great options for you!</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <section id="how-it-works" className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="font-bold text-4xl md:text-5xl">End-to-End Commerce Automation</h2>
                        <p className="mt-4 text-lg text-gray-600">C.H.I.P. combines expert consultation AI with autonomous transaction execution in three phases.</p>
                    </div>
                    <div className="mt-16 grid md:grid-cols-3 gap-10 lg:gap-16 items-start font-mono">
                        <div className="text-center">
                            <div className="flex items-center justify-center h-16 w-16 mx-auto bg-accent/10 text-accent rounded-full text-2xl font-bold border border-accent/20">1</div>
                            <h3 className="text-xl font-semibold mt-6 text-gray-800">PHASE 1: NEURAL DISCOVERY</h3>
                            <ul className="mt-4 text-gray-600 space-y-2 text-left">
                                <li><span className="text-accent mr-2">├──</span>Natural language processing</li>
                                <li><span className="text-accent mr-2">├──</span>Preference learning algorithms</li>
                                <li><span className="text-accent mr-2">└──</span>Budget optimization parameters</li>
                            </ul>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center h-16 w-16 mx-auto bg-accent/10 text-accent rounded-full text-2xl font-bold border border-accent/20">2</div>
                            <h3 className="text-xl font-semibold mt-6 text-gray-800">PHASE 2: WEB SURVEILLANCE</h3>
                            <ul className="mt-4 text-gray-600 space-y-2 text-left">
                                <li><span className="text-accent mr-2">├──</span>Distributed web crawling</li>
                                <li><span className="text-accent mr-2">├──</span>Product intelligence gathering</li>
                                <li><span className="text-accent mr-2">└──</span>Real-time price analysis</li>
                            </ul>
                        </div>
                        <div className="text-center">
                            <div className="flex items-center justify-center h-16 w-16 mx-auto bg-accent/10 text-accent rounded-full text-2xl font-bold border border-accent/20">3</div>
                            <h3 className="text-xl font-semibold mt-6 text-gray-800">PHASE 3: AUTONOMOUS DELIVERY</h3>
                            <ul className="mt-4 text-gray-600 space-y-2 text-left">
                                <li><span className="text-accent mr-2">├──</span>Universal cart synchronization</li>
                                <li><span className="text-accent mr-2">├──</span>Multi-vendor checkout automation</li>
                                <li><span className="text-accent mr-2">└──</span>Single payment gateway</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id="features" className="py-24 bg-gray-50/70">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="font-bold text-4xl md:text-5xl">Advanced Capabilities Matrix</h2>
                        <p className="mt-4 text-lg text-gray-600">CHIP isn't just a chatbot, it's a powerful shopping tool with military-grade features.</p>
                    </div>
                    <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="feature-card bg-white p-8 rounded-2xl shadow-sm">
                            <h3 className="text-xl font-semibold mt-4">🧠 Conversational Intelligence</h3>
                            <p className="mt-2 text-gray-600">Advanced neural language processing for natural requirement extraction.</p>
                        </div>
                        <div className="feature-card bg-white p-8 rounded-2xl shadow-sm">
                            <h3 className="text-xl font-semibold mt-4">🌐 Omninet Web Scanning</h3>
                            <p className="mt-2 text-gray-600">Multi-dimensional e-commerce surveillance across infinite digital marketplaces.</p>
                        </div>
                        <div className="feature-card bg-white p-8 rounded-2xl shadow-sm">
                            <h3 className="text-xl font-semibold mt-4">🛒 Quantum Cart Technology</h3>
                            <p className="mt-2 text-gray-600">Unified product aggregation from parallel vendor universes.</p>
                        </div>
                        <div className="feature-card bg-white p-8 rounded-2xl shadow-sm">
                            <h3 className="text-xl font-semibold mt-4">⚡ Lightning Checkout Protocol</h3>
                            <p className="mt-2 text-gray-600">Single-point payment interface with distributed transaction execution.</p>
                        </div>
                        <div className="feature-card bg-white p-8 rounded-2xl shadow-sm">
                            <h3 className="text-xl font-semibold mt-4">🎯 Adaptive Learning Core</h3>
                            <p className="mt-2 text-gray-600">Continuous preference optimization and behavioral pattern recognition.</p>
                        </div>
                        <div className="feature-card bg-white p-8 rounded-2xl shadow-sm">
                            <h3 className="text-xl font-semibold mt-4">🔐 Fortress Security Framework</h3>
                            <p className="mt-2 text-gray-600">Military-grade encryption with quantum-resistant payment isolation.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="security" className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="font-bold text-4xl md:text-5xl">Quantum Payment Architecture</h2>
                        <p className="mt-4 text-lg text-gray-600">Our advanced payment system operates on a dual-phase quantum security model, ensuring complete financial isolation.</p>
                    </div>
                    <div className="mt-16 grid md:grid-cols-2 gap-12 items-center font-mono">
                        <div className="bg-gray-900 text-white p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-accent">PHASE ALPHA: Credit Acquisition</h3>
                            <pre className="mt-4 text-sm whitespace-pre-wrap text-gray-300">USER PAYMENT → STRIPE QUANTUM GATEWAY → C.H.I.P. TREASURY</pre>
                            <ul className="mt-4 space-y-2 text-sm">
                                <li><span className="text-accent">1.</span> Consolidated Invoice</li>
                                <li><span className="text-accent">2.</span> Quantum Gateway (zero user data retention)</li>
                                <li><span className="text-accent">3.</span> Treasury Integration</li>
                            </ul>
                        </div>
                        <div className="bg-gray-900 text-white p-6 rounded-lg">
                            <h3 className="text-lg font-bold text-accent">PHASE OMEGA: Distributed Transaction</h3>
                            <pre className="mt-4 text-sm whitespace-pre-wrap text-gray-300">{`FOR EACH TARGET_MERCHANT:
  ├── GENERATE_VCC(merchant_id, amount)
  ├── DEPLOY_PURCHASE_BOT(...)
  ├── EXECUTE_STEALTH_CHECKOUT()
  └── DEACTIVATE_VCC() // Auto-destruct`}</pre>
                        </div>
                    </div>
                </div>
            </section>

            <section id="tech" className="py-24 bg-gray-50/70">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="font-bold text-4xl md:text-5xl">Technology Matrix</h2>
                        <p className="mt-4 text-lg text-gray-600">The powerful technologies behind C.H.I.P.'s neural architecture.</p>
                    </div>
                    <div className="mt-12 max-w-4xl mx-auto">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <table className="min-w-full text-left text-sm font-mono tech-table">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="p-4">SYSTEM COMPONENT</th>
                                        <th className="p-4">IMPLEMENTATION</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    <tr><td>AI Consciousness</td><td className="font-bold text-accent">Sensay Neural Platform</td></tr>
                                    <tr><td>Interface Layer</td><td>React Quantum, TypeScript, Neural CSS</td></tr>
                                    <tr><td>Command Center</td><td>Node.js, Express Hyperdrive, PostgreSQL</td></tr>
                                    <tr><td>Bot Framework</td><td>Puppeteer Stealth, Docker Swarm 🐳</td></tr>
                                    <tr><td>Cloud Infrastructure</td><td>Google Cloud, Kubernetes, GitHub Actions</td></tr>
                                    <tr><td>Financial Systems</td><td>Stripe Quantum, Stripe Issuing (VCC)</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <section id="cta" className="bg-accent">
                <div className="container mx-auto px-6 py-20 text-center">
                    <h2 className="font-bold text-4xl md:text-5xl text-black">Stop juggling tabs. Start shopping smarter.</h2>
                    <p className="mt-4 text-lg text-gray-800 max-w-2xl mx-auto">Join the waitlist and be the first to experience the future of online shopping. It's time to get your own personal shopper.</p>
                    <div className="mt-8">
                        <a href="#" onClick={handleCTAClick} className="bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-gray-200 transition shadow-lg hover:shadow-xl transform hover:scale-105 inline-block">Try our MVP</a>
                    </div>
                </div>
            </section>

            <footer className="bg-white border-t border-gray-200">
                <div className="container mx-auto px-6 py-12">
                    <div className="md:flex md:justify-between md:items-center">
                        <div className="flex items-center space-x-3 mb-6 md:mb-0">
                            <img src="logo.svg" alt="CHIP Logo" className="w-10 h-10" />
                            <span className="text-2xl font-bold text-gray-800">CHIP</span>
                        </div>
                        <div className="flex space-x-6">
                            {/*<a href="#" className="text-gray-500 hover:text-accent transition">*/}
                            {/*    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>*/}
                            {/*</a>*/}
                            <a href="https://github.com/chandan989/C.H.I.P." target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-accent transition">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12.014c0 4.437 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.014C22 6.477 17.523 2 12 2z" clipRule="evenodd" /></svg>
                            </a>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
                        <p>&copy; 2024 CHIP. All Rights Reserved. A project for the Sensay Connect Hackathon.</p>
                        <p className="mt-2">Powered by <a href="https://sensay.io" className="font-semibold text-accent hover:underline">Sensay</a></p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default IndexPage;
