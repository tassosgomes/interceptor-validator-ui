# Interceptor Validator UI

> A modern, visual tool for validating and configuring Sensedia Interceptors via YAML.

![Project Status](https://img.shields.io/badge/status-MVP-success)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🎯 Objective

The **Interceptor Validator UI** is a frontend application designed to simplify the developer experience when working with Sensedia API Gateway interceptors.

Instead of writing complex YAML configurations blindly, developers can use this tool to:
- **Edit YAML** with syntax highlighting and validation (Monaco Editor).
- **Visualize** the interceptor flow in real-time.
- **Validate** configuration grouping by execution points (`FIRST`, `SECOND`) and order.
- **Detect Errors** instantly before deploying to the gateway.

## 🚀 Tech Stack

This project is built with a modern, performance-focused stack:

- **Core**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/) (The power behind VS Code)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Containerization**: Docker & Nginx (Alpine)

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (optional, for container usage)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tassosgomes/interceptor-validator-ui.git
   cd interceptor-validator-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

Start the development server with hot-reload:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

Create an optimized static build:

```bash
npm run build
```

The output will be in the `dist` directory.

## 🐳 Docker & Deployment

### Build Image

```bash
docker build -t interceptor-validator-ui:latest .
```

### Run Container

```bash
docker run -p 3000:80 interceptor-validator-ui:latest
```

### Docker Swarm (with Traefik)

The project includes a `docker-compose.yml` configured for Docker Swarm and Traefik reverse proxy.

1. Adjust the labels in `docker-compose.yml` (domain, network).
2. Deploy the stack:
   ```bash
   docker stack deploy -c docker-compose.yml interceptor-ui
   ```

## 🤝 Contribution Guide

We welcome contributions! Please follow these steps to contribute:

1.  **Fork the repository**.
2.  **Create a feature branch**:
    ```bash
    git checkout -b feature/my-new-feature
    ```
3.  **Commit your changes**:
    - Use clear and descriptive commit messages.
    - Follow the existing code style (Prettier/ESLint).
4.  **Push to the branch**:
    ```bash
    git push origin feature/my-new-feature
    ```
5.  **Open a Pull Request**.

### Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Editor.tsx    # Monaco Editor wrapper
│   ├── Visualizer.tsx # Flow visualization logic
│   └── InterceptorCard.tsx # Individual interceptor UI
├── lib/              # Utilities (Tailwind merge, etc.)
├── App.tsx           # Main application layout and logic
└── index.css         # Global styles and Tailwind directives
```

---
Developed with ❤️ for better API Management.
