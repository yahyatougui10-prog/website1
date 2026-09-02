# ⬡ DockerBloom — L'Art de l'Orchestration

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?logo=vercel)](https://vercel.com)

**DockerBloom** is a high-fidelity, immersive educational experience designed to transform the way developers learn Docker and containerization. Instead of dry documentation, DockerBloom offers a cinematic journey through the layers of the Docker ecosystem.

## ✨ Key Features

- **🌌 Cinematic Intro**: A high-performance loading sequence powered by **GSAP**, setting the stage for a deep-dive into the cosmic void of orchestration.
- **🌀 3D Immersive Background**: A real-time 3D starfield created with **Three.js** that reacts to user scrolling, creating a feeling of floating through data.
- **🎨 Vibrant "About" Experience**: A glassmorphic design system featuring neon gradients and organic floating elements.
- **🛠️ Interactive Playground**: A real-time terminal simulation where users can execute Docker commands and visualize the architecture flow instantly.
- **🍱 Bento-Grid Learning**: A modern, modular grid layout for exploring Docker concepts with a built-in "Mastery" progression system.

## 🚀 Tech Stack

### Frontend
- **Three.js**: For the 3D particle system and spatial rendering.
- **GSAP (GreenSock)**: For high-end cinematic animations and scroll-triggered reveals.
- **CSS3 Modern**: Utilizing `backdrop-filter` (Glassmorphism), `conic-gradients`, and custom cubic-bezier easing.
- **JavaScript (ES6+)**: Hyper-fluid core logic and state management.

### Backend
- **Python / Flask**: Powers the command execution API and site data delivery.

## 🛠️ Installation & Setup

### Local Development
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yahyatougui10-prog/website1.git
   cd website1
   ```

2. **Set up the backend**:
   ```bash
   pip install flask
   python app.py
   ```

3. **Open the site**:
   Navigate to `http://127.0.0.1:5000` in your browser.

## 🗺️ Project Structure

```text
website1/
├── assets/
│   ├── css/
│   │   ├── style.css            # Base cosmic obsidian theme
│   │   └── enhanced-effects.css # Neon & Holographic effects
│   ├── js/
│   │   └── main.js             # Three.js & GSAP core logic
│   └── images/                 # Visual assets
├── data.json                   # Site content & concept data
├── app.py                      # Flask backend server
└── index.html                  # Main immersive entry point
```

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

---
*Designed with precision for the next generation of Cloud-Native Engineers.* 🚀
