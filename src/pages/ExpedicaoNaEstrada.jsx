import Header from '../components/Header'
import ExpedicaoNaEstradaContentSection from '../components/ExpedicaoNaEstradaContentSection'
import EventosNaEstradaSection from '../components/EventosNaEstradaSection'
import FooterSection from '../components/FooterSection'

function ExpedicaoNaEstrada() {
  return (
    <div className="app">
      <Header />
      <ExpedicaoNaEstradaContentSection />
      <EventosNaEstradaSection />
      <FooterSection />
    </div>
  )
}

export default ExpedicaoNaEstrada

