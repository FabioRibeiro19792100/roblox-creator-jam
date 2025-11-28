import './FooterSection.css'

function FooterSection() {
  const links = [
    {
      text: 'Regulamento da JAM',
      href: '#'
    },
    {
      text: 'Perguntas frequentes',
      href: '#'
    },
    {
      text: 'Dúvidas? Entre em contato',
      href: '#'
    },
    {
      text: 'Conheça a Expedição Roblox',
      href: '#'
    }
  ]

  return (
    <section id="footer" className="footer-section">
      <div className="footer-cta">
        <div className="footer-cta-container">
          <div className="footer-title">
            <h1 className="footer-title-roblox">Roblox</h1>
            <h2 className="footer-title-creator-jam">Creator Jam</h2>
          </div>
          <div className="footer-cta-button-wrapper">
            <button className="footer-cta-button">inscreva-se</button>
          </div>
        </div>
      </div>
      <div className="footer-container-wrapper">
        <div className="footer-container">
          <ul className="footer-links">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href} className="footer-link">
                <span className="footer-arrow">→</span>
                <span className="footer-link-text">{link.text}</span>
              </a>
            </li>
          ))}
          </ul>
        </div>
      </div>
      <div className="footer-final">
        <div className="footer-final-container">
          <p className="footer-final-text">
            Expedição Roblox é um projeto da Mastertech junto com o Roblox
          </p>
          <div className="footer-final-social">
            <a href="#" className="footer-social-link" aria-label="Instagram">Instagram</a>
            <a href="#" className="footer-social-link" aria-label="WhatsApp">WhatsApp</a>
            <a href="#" className="footer-social-link" aria-label="TikTok">TikTok</a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FooterSection

