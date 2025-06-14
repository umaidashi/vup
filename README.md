# vup

A Tauri-based desktop application.

## Setup

### Prerequisites
- Rust (latest stable)
- Node.js v18+
- npm or pnpm

### Installation
```bash
# Install dependencies
npm install

# Run in development mode
npm run tauri dev

# Build for production
npm run tauri build
```

## Development

- Frontend: Located in `src/` directory
- Backend: Located in `src-tauri/` directory
- Main entry point: `src-tauri/src/main.rs`

### Icons

App icons should be placed in `src-tauri/icons/` directory. Tauri expects the following icon files:
- `icon.png` - Main app icon (1024x1024px recommended)
- `icon.icns` - macOS icon
- `icon.ico` - Windows icon

You can generate these from a single PNG using `tauri icon` command.

## Project Structure
```
vup/
├── src-tauri/          # Rust backend
│   ├── src/
│   │   ├── main.rs     # Entry point
│   │   └── lib.rs      # Shared library
│   ├── Cargo.toml      # Rust dependencies
│   ├── tauri.conf.json # Tauri configuration
│   └── build.rs        # Build script
├── src/                # Frontend
│   ├── index.html      # Entry HTML
│   ├── main.js         # Main JavaScript
│   └── style.css       # Styles
├── package.json        # Node.js dependencies
├── vite.config.js      # Vite configuration
└── README.md           # This file
```

## Features

- Cross-platform desktop application
- Built with Tauri and Vite
- Basic IPC communication example (greet command)

## License

TBD