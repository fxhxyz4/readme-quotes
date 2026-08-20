import { Theme } from '../models/theme';

export const themes: Theme[] = [
  {
    name: 'telegram',
    bg: '#1c1c1c',
    text: '#00ffe5ff',
    author: '#ffffffff',
  },
  {
    name: 'github',
    bg: '#0d1117',
    text: '#c9d1d9',
    author: '#58a6ff',
  },
  {
    name: 'dracula',
    bg: '#282a36',
    text: '#f8f8f2',
    author: '#ff79c6',
  },
  {
    name: 'monokai',
    bg: '#272822',
    text: '#f8f8f2',
    author: '#a6e22e',
  },
  {
    name: 'nord',
    bg: '#2e3440',
    text: '#d8dee9',
    author: '#88c0d0',
  },
  {
    name: 'ocean',
    bg: '#1a1f3a',
    text: '#e0e7ff',
    author: '#60a5fa',
  },
  {
    name: 'sunset',
    bg: '#1a0b2e',
    text: '#f4e4ba',
    author: '#ff6f61',
  },
  {
    name: 'forest',
    bg: '#1b2e1f',
    text: '#e8f5e9',
    author: '#66bb6a',
  },
  {
    name: 'rose',
    bg: '#2d1b2e',
    text: '#fce4ec',
    author: '#f48fb1',
  },
  {
    name: 'cyberpunk',
    bg: '#0a0e27',
    text: '#00ff9f',
    author: '#ff2e97',
  },
  {
    name: 'solarized-dark',
    bg: '#002b36',
    text: '#839496',
    author: '#2aa198',
  },
  {
    name: 'matrix',
    bg: '#0d0208',
    text: '#00ff41',
    author: '#008f11',
  },
  {
    name: 'synthwave',
    bg: '#262335',
    text: '#36f9f6',
    author: '#ff7edb',
  },
  {
    name: 'one-dark',
    bg: '#282c34',
    text: '#abb2bf',
    author: '#61afef',
  },
  {
    name: 'tokyo-night',
    bg: '#1a1b26',
    text: '#c0caf5',
    author: '#7aa2f7',
  },
  {
    name: 'catppuccin',
    bg: '#1e1e2e',
    text: '#cdd6f4',
    author: '#f5c2e7',
  },
  {
    name: 'gruvbox',
    bg: '#282828',
    text: '#ebdbb2',
    author: '#fabd2f',
  },
  {
    name: 'vscode',
    bg: '#1e1e1e',
    text: '#d4d4d4',
    author: '#4ec9b0',
  },
  {
    name: 'coffee',
    bg: '#2c221e',
    text: '#dcd7d0',
    author: '#d79921',
  },
  {
    name: 'neon-mint',
    bg: '#0f172a',
    text: '#38bdf8',
    author: '#34d399',
  }
];

export const DEFAULT_THEME = themes[0];