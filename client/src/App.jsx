// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'
import { Narbar, Footer,  Welcome, Transations } from "./components"
// function App() {
const App = () => {
  // const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Narbar />
          <Welcome />
        </div>        
        <Transations />
        <Footer />
    </div>
  );
}

export default App
