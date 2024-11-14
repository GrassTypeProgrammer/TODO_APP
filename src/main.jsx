import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


const DATA = [
  { id: "todo-0", name: "Eat", completed: true, description: "description-0"},
  { id: "todo-1", name: "Sleep", completed: false, description: "description-1"},
  { id: "todo-2", name: "Repeat", completed: false, description: "description-2"},
];

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App tasks={DATA}/>
  </StrictMode>,
)
