import React from 'react'
import Header from '../components/Header'
import ProximosEventosSection from '../components/ProximosEventosSection'
import HomeHeroSection from '../components/HomeHeroSection'
import ManifestoSection from '../components/ManifestoSection'
import ExpedicaoRobloxSection from '../components/ExpedicaoRobloxSection'
import OQueERobloxStudioSection from '../components/OQueERobloxStudioSection'
import QuerCriarTitleSection from '../components/QuerCriarTitleSection'
import QuerCriarSection from '../components/QuerCriarSection'
import FooterSection from '../components/FooterSection'

function Home() {
  return (
    <div className="app">
      <Header />
      <ProximosEventosSection />
      <HomeHeroSection />
      <ManifestoSection />
      <ExpedicaoRobloxSection />
      <OQueERobloxStudioSection />
      <QuerCriarTitleSection />
      <QuerCriarSection />
      {/* Outras seções podem ser adicionadas aqui */}
      <FooterSection />
    </div>
  )
}

export default Home
