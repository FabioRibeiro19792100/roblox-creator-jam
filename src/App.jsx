import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ComoParticiparSection from './components/ComoParticiparSection'
import EscolhaTemaSection from './components/EscolhaTemaSection'
import TrustedConnectionSection from './components/TrustedConnectionSection'
import DesafioJamSection from './components/DesafioJamSection'
import RegrasJamSection from './components/RegrasJamSection'
import EntregaDesafioSection from './components/EntregaDesafioSection'
import PremiacaoSection from './components/PremiacaoSection'
import DatasCanaisSection from './components/DatasCanaisSection'
import FooterSection from './components/FooterSection'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <HeroSection />
      <ComoParticiparSection />
      <TrustedConnectionSection />
      <EscolhaTemaSection />
      <DesafioJamSection />
      <RegrasJamSection />
      <EntregaDesafioSection />
      <PremiacaoSection />
      <DatasCanaisSection />
      <FooterSection />
    </div>
  )
}

export default App
