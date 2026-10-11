import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import { initializeAnalytics } from './analytics';
import '@fontsource-variable/cormorant-garamond';
import '@fontsource-variable/cormorant-garamond/wght-italic.css';
import '@fontsource-variable/plus-jakarta-sans';
import '@fontsource-variable/jetbrains-mono';
import './index.css';
const root = document.getElementById('root')!;
const app = <StrictMode><App initialPath={window.location.pathname} /></StrictMode>;
if (root.hasChildNodes()) hydrateRoot(root, app); else createRoot(root).render(app);

if (document.readyState === 'complete') initializeAnalytics();
else window.addEventListener('load', initializeAnalytics, { once: true });
