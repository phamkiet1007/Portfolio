import gsap from 'gsap';
import { Draggable } from 'gsap/all';

import { Dock, Navbar, Welcome, Home} from './components'
import './index.css'
import { 
  Resume, 
  Safari, 
  Terminal, 
  Finder, 
  Text, 
  ImageWindowContent, 
  Contact,
  Photos
} from '#windows';



gsap.registerPlugin(Draggable);

function App() {
  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock/>

      <Terminal/>
      <Safari/>
      <Resume/>
      <Finder/>
      <Text/>
      <ImageWindowContent/>
      <Contact />
      <Photos/>

      <Home/>
    </main>
  )
}

export default App
