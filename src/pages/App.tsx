import './App.css'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import TinyUrlBody from './components/TinyUrlBody.tsx'

function App() {


    return (
        <div id='container' className="container h-full w-screen flex fullscreen">
            <Header/>
            <TinyUrlBody/>
            <Footer/>
        </div>
    )
}

export default App
