import React from 'react'
import Header from '../components/Header'
import ProximosEventosSection from '../components/ProximosEventosSection'
import HomeHeroSection from '../components/HomeHeroSection'
import ExpedicaoRobloxSection from '../components/ExpedicaoRobloxSection'
import OQueERobloxStudioSection from '../components/OQueERobloxStudioSection'
import ManifestoSection from '../components/ManifestoSection'
import FooterSection from '../components/FooterSection'
import RobloxFloatButton from '../components/RobloxFloatButton'

function Home() {
  return (
    <div className="app">
      <Header />
      <ProximosEventosSection />
      <HomeHeroSection />
      <ManifestoSection />
      <ExpedicaoRobloxSection />
      <OQueERobloxStudioSection />
      {/* Outras seções podem ser adicionadas aqui */}
      <FooterSection />
      <RobloxFloatButton />
    </div>
  )
}

export default Home
