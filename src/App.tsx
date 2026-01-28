import gsap from 'gsap';
import { Draggable } from 'gsap/all';

import { Dock, Navbar, Welcome} from './components'
import './index.css'
import { 
  Resume, 
  Safari, 
  Terminal, 
  Finder, 
  Text, 
  ImageWindowContent, 
  Contact 
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
    </main>
  )
}

export default App
