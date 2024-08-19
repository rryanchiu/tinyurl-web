import './App.css'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import TinyUrlBody from './components/TinyUrlBody.tsx'

function App() {


    return (

        <div className="w-full h-screen flex flex-col min-h-screen w-full">
            <Header/>
            <TinyUrlBody/>
            <Footer/>
        </div>
    )
}

export default App
