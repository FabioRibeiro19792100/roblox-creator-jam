import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ComoParticiparSection from './components/ComoParticiparSection'
import RegrasPareamentoSection from './components/RegrasPareamentoSection'
import EscolhaTemaSection from './components/EscolhaTemaSection'
import TrustedConnectionSection from './components/TrustedConnectionSection'
import DesafioJamSection from './components/DesafioJamSection'
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
      <RegrasPareamentoSection />
      <TrustedConnectionSection />
      <EscolhaTemaSection />
      <DesafioJamSection />
      <EntregaDesafioSection />
      <PremiacaoSection />
      <DatasCanaisSection />
      <FooterSection />
    </div>
  )
}

export default App
