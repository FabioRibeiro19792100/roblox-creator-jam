import Header from '../components/Header'
import ExpedicaoNaEstradaHeroSection from '../components/ExpedicaoNaEstradaHeroSection'
import ExpedicaoNaEstradaAtividadesSection from '../components/ExpedicaoNaEstradaAtividadesSection'
import EventosNaEstradaSection from '../components/EventosNaEstradaSection'
import FooterSection from '../components/FooterSection'

function ExpedicaoNaEstrada() {
  return (
    <div className="app">
      <Header />
      <ExpedicaoNaEstradaHeroSection />
      <ExpedicaoNaEstradaAtividadesSection />
      <EventosNaEstradaSection />
      <FooterSection />
    </div>
  )
}

export default ExpedicaoNaEstrada

