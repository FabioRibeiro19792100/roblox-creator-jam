import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import EscolhaTemaSection from '../components/EscolhaTemaSection'
import DesafioJamSection from '../components/DesafioJamSection'
import RegrasJamSection from '../components/RegrasJamSection'
import EntregaDesafioSection from '../components/EntregaDesafioSection'
import PremiacaoSection from '../components/PremiacaoSection'
import FooterSection from '../components/FooterSection'

function Jam() {
  return (
    <div className="app" id="jam">
      <Header />
      <HeroSection />
      <DesafioJamSection />
      <EscolhaTemaSection />
      <RegrasJamSection />
      <EntregaDesafioSection />
      <PremiacaoSection />
      <FooterSection />
    </div>
  )
}

export default Jam







