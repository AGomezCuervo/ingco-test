import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Theme, ThemePanel } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
		<Theme appearance="dark" accentColor="crimson" grayColor="sand" scaling="100%">
			<App />
		</Theme>
  </StrictMode>,
)
