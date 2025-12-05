import { useState, useEffect } from 'react'
import { siteConfig } from '../config/siteConfig'
import './Admin.css'

function Admin() {
  const [config, setConfig] = useState(() => {
    try {
      if (!siteConfig || typeof siteConfig !== 'object') {
        console.error('siteConfig não é um objeto válido')
        return {}
      }
      return siteConfig
    } catch (e) {
      console.error('Erro ao carregar siteConfig:', e)
      return {}
    }
  })
  const [activeSection, setActiveSection] = useState('home-hero')
  const [saved, setSaved] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Carregar configuração salva do localStorage
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('siteConfig')
      if (savedConfig) {
        try {
          const parsed = JSON.parse(savedConfig)
          setConfig(parsed)
        } catch (e) {
          console.error('Erro ao carregar configuração salva:', e)
        }
      }
    } catch (e) {
      console.error('Erro ao acessar localStorage:', e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Detectar mudanças (otimizado para evitar travamentos)
  useEffect(() => {
    // Usar setTimeout para não bloquear a UI
    const timeoutId = setTimeout(() => {
      try {
        const original = JSON.stringify(siteConfig)
        const current = JSON.stringify(config)
        setHasChanges(original !== current)
      } catch (e) {
        console.error('Erro ao comparar configurações:', e)
        setHasChanges(false)
      }
    }, 100)
    
    return () => clearTimeout(timeoutId)
  }, [config])

  const updateConfig = (path, value) => {
    const keys = path.split('.')
    const newConfig = JSON.parse(JSON.stringify(config)) // Deep clone
    let current = newConfig

    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {}
      }
      current = current[keys[i]]
    }

    current[keys[keys.length - 1]] = value
    setConfig(newConfig)
    setSaved(false)
  }

  const updateArrayItem = (path, index, value) => {
    const keys = path.split('.')
    const newConfig = JSON.parse(JSON.stringify(config)) // Deep clone
    let current = newConfig

    for (const key of keys) {
      current = current[key]
    }

    if (Array.isArray(current)) {
      current[index] = value
      setConfig(newConfig)
      setSaved(false)
    }
  }

  // Função wrapper para atualizar config diretamente
  const updateConfigDirectly = (updater) => {
    const newConfig = JSON.parse(JSON.stringify(config))
    updater(newConfig)
    setConfig(newConfig)
    setSaved(false)
  }

  const handleSave = () => {
    try {
      localStorage.setItem('siteConfig', JSON.stringify(config))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
      console.log('Configuração salva com sucesso!')
    } catch (e) {
      console.error('Erro ao salvar configuração:', e)
      alert('Erro ao salvar. O objeto pode ser muito grande para o localStorage.')
    }
  }

  const handleReset = () => {
    if (confirm('Tem certeza que deseja restaurar as configurações originais?')) {
      setConfig(siteConfig)
      localStorage.removeItem('siteConfig')
      setSaved(false)
      setHasChanges(false)
    }
  }

  const [expandedPages, setExpandedPages] = useState({
    home: true,
    jam: false,
    biblioteca: false,
    global: false
  })

  const pages = {
    home: {
      label: '🏠 Home',
      sections: [
        { id: 'home-menu', label: 'Menu/Header', icon: '📋' },
        { id: 'home-proximos', label: 'Próximos Eventos', icon: '📅' },
        { id: 'home-hero', label: 'Hero', icon: '⭐' },
        { id: 'home-manifesto', label: 'Manifesto', icon: '📖' },
        { id: 'home-expedicao', label: 'Expedição Roblox', icon: '🚀' },
        { id: 'home-roblox-studio', label: 'O Que é Roblox Studio', icon: '🎮' },
        { id: 'home-quer-criar-title', label: 'Quer Criar Title', icon: '💬' },
        { id: 'home-quer-criar', label: 'Quer Criar Section', icon: '💭' },
        { id: 'home-footer', label: 'Footer', icon: '📄' },
        { id: 'home-convide', label: 'Convide Amigos', icon: '👥' },
        { id: 'home-glossario', label: 'Glossário', icon: '📚' },
      ]
    },
    jam: {
      label: '🎮 JAM',
      sections: [
        { id: 'jam-menu', label: 'Menu/Header', icon: '📋' },
        { id: 'jam-hero', label: 'Hero', icon: '⭐' },
        { id: 'jam-como-participar', label: 'Como Participar', icon: '📝' },
        { id: 'jam-escolha-tema', label: 'Escolha Tema', icon: '🎯' },
        { id: 'jam-desafio', label: 'Desafio JAM', icon: '⚔️' },
        { id: 'jam-regras', label: 'Regras JAM', icon: '📋' },
        { id: 'jam-entrega', label: 'Entrega Desafio', icon: '📦' },
        { id: 'jam-premiacao', label: 'Premiação', icon: '🏆' },
        { id: 'jam-datas-canais', label: 'Datas e Canais', icon: '📅' },
        { id: 'jam-footer', label: 'Footer', icon: '📄' },
      ]
    },
    biblioteca: {
      label: '📚 Biblioteca',
      sections: [
        { id: 'biblioteca-menu', label: 'Menu/Header', icon: '📋' },
        { id: 'biblioteca-hero', label: 'Hero', icon: '⭐' },
        { id: 'biblioteca-tutorial', label: 'Tutorial Roblox Studios', icon: '🎓' },
        { id: 'biblioteca-mochilao', label: 'Mochilão', icon: '🎒' },
        { id: 'biblioteca-acampamento', label: 'Acampamento', icon: '⛺' },
        { id: 'biblioteca-sobrevivencia', label: 'Sobrevivência', icon: '🌲' },
        { id: 'biblioteca-footer', label: 'Footer', icon: '📄' },
      ]
    },
    expedicaoNaEstrada: {
      label: '🚌 Expedição na Estrada',
      sections: [
        { id: 'expedicao-na-estrada-menu', label: 'Menu/Header', icon: '📋' },
        { id: 'expedicao-na-estrada-hero', label: 'Hero', icon: '⭐' },
        { id: 'expedicao-na-estrada-content', label: 'Conteúdo', icon: '📝' },
        { id: 'expedicao-na-estrada-footer', label: 'Footer', icon: '📄' },
      ]
    },
    global: {
      label: '⚙️ Configurações Globais',
      sections: [
        { id: 'global-colors', label: 'Cores', icon: '🎨' },
        { id: 'global-fonts', label: 'Fontes', icon: '✍️' },
        { id: 'global-forms', label: 'Formulários', icon: '📝' },
      ]
    }
  }

  const togglePage = (pageKey) => {
    setExpandedPages(prev => ({
      ...prev,
      [pageKey]: !prev[pageKey]
    }))
  }

  const getCurrentSection = () => {
    // Determinar qual página e seção está ativa
    for (const [pageKey, page] of Object.entries(pages)) {
      const section = page.sections.find(s => s.id === activeSection)
      if (section) {
        return { pageKey, section }
      }
    }
    return null
  }

  if (isLoading) {
    return (
      <div className="admin-container">
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Carregando painel admin...</h2>
        </div>
      </div>
    )
  }

  if (!config || Object.keys(config).length === 0) {
    return (
      <div className="admin-container">
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Erro ao carregar configuração</h2>
          <p>Verifique o console do navegador para mais detalhes.</p>
          <button onClick={() => window.location.reload()}>Recarregar página</button>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>⚙️ Painel de Administração</h1>
        <p>Edite textos, cores e configurações do site</p>
        <div className="admin-actions">
          <button 
            className="admin-btn admin-btn-save" 
            onClick={handleSave}
            disabled={!hasChanges}
          >
            {saved ? '✓ Salvo!' : '💾 Salvar Alterações'}
          </button>
          <button 
            className="admin-btn admin-btn-reset" 
            onClick={handleReset}
          >
            🔄 Restaurar Original
          </button>
          <a href="/" className="admin-btn admin-btn-back">
            ← Voltar ao Site
          </a>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-sidebar">
          <h3>Navegação</h3>
          <nav className="admin-nav">
            {Object.entries(pages).map(([pageKey, page]) => (
              <div key={pageKey} className="admin-nav-page">
                <button
                  className={`admin-nav-page-header ${expandedPages[pageKey] ? 'expanded' : ''}`}
                  onClick={() => togglePage(pageKey)}
                >
                  <span className="admin-nav-page-icon">{expandedPages[pageKey] ? '▼' : '▶'}</span>
                  <span>{page.label}</span>
                </button>
                {expandedPages[pageKey] && (
                  <div className="admin-nav-page-sections">
                    {page.sections.map(section => (
                      <button
                        key={section.id}
                        className={`admin-nav-item admin-nav-subitem ${activeSection === section.id ? 'active' : ''}`}
                        onClick={() => setActiveSection(section.id)}
                      >
                        <span className="admin-nav-icon">{section.icon}</span>
                        {section.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="admin-main">
          {/* HOME PAGE SECTIONS */}
          {activeSection === 'home-menu' && (
            <MenuEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'home-proximos' && (
            <ProximosEventosEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'home-hero' && (
            <HeroEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'home-manifesto' && (
            <ManifestoEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'home-expedicao' && (
            <ExpedicaoEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'home-roblox-studio' && (
            <RobloxStudioEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'home-quer-criar-title' && (
            <QuerCriarTitleEditor config={config} updateConfig={updateConfig} />
          )}
          {activeSection === 'home-quer-criar' && (
            <QuerCriarEditor config={config} updateConfig={updateConfig} />
          )}
          {activeSection === 'home-footer' && (
            <FooterEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'home-convide' && (
            <ConvideEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'home-glossario' && (
            <GlossarioEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}

          {/* JAM PAGE SECTIONS */}
          {activeSection === 'jam-menu' && (
            <MenuEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'jam-hero' && (
            <JamHeroEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'jam-como-participar' && (
            <ComoParticiparEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'jam-escolha-tema' && (
            <EscolhaTemaEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'jam-desafio' && (
            <DesafioJamEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'jam-regras' && (
            <RegrasJamEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'jam-entrega' && (
            <EntregaDesafioEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'jam-premiacao' && (
            <PremiacaoEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'jam-datas-canais' && (
            <DatasCanaisEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'jam-footer' && (
            <FooterEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}

          {/* BIBLIOTECA PAGE SECTIONS */}
          {activeSection === 'biblioteca-menu' && (
            <MenuEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'biblioteca-hero' && (
            <BibliotecaHeroEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'biblioteca-tutorial' && (
            <BibliotecaSectionEditor config={config} updateConfig={updateConfig} sectionKey="tutorial" />
          )}
          {activeSection === 'biblioteca-mochilao' && (
            <BibliotecaSectionEditor config={config} updateConfig={updateConfig} sectionKey="mochilao" />
          )}
          {activeSection === 'biblioteca-acampamento' && (
            <BibliotecaSectionEditor config={config} updateConfig={updateConfig} sectionKey="acampamento" />
          )}
          {activeSection === 'biblioteca-sobrevivencia' && (
            <BibliotecaSectionEditor config={config} updateConfig={updateConfig} sectionKey="sobrevivencia" />
          )}
          {activeSection === 'biblioteca-footer' && (
            <FooterEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}

          {/* EXPEDIÇÃO NA ESTRADA PAGE SECTIONS */}
          {activeSection === 'expedicao-na-estrada-menu' && (
            <MenuEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'expedicao-na-estrada-hero' && (
            <ExpedicaoNaEstradaHeroEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'expedicao-na-estrada-content' && (
            <ExpedicaoNaEstradaContentEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}
          {activeSection === 'expedicao-na-estrada-footer' && (
            <FooterEditor config={config} updateConfig={updateConfig} updateConfigDirectly={updateConfigDirectly} />
          )}

          {/* GLOBAL SECTIONS */}
          {activeSection === 'global-colors' && (
            <ColorsEditor config={config} updateConfig={updateConfig} />
          )}
          {activeSection === 'global-fonts' && (
            <FontsEditor config={config} updateConfig={updateConfig} />
          )}
          {activeSection === 'global-forms' && (
            <FormsEditor config={config} updateConfig={updateConfig} />
          )}
        </div>
      </div>
    </div>
  )
}

// Componente para editar Hero
function HeroEditor({ config, updateConfig, updateConfigDirectly }) {
  if (!config?.hero?.home) {
    return <div className="admin-section"><p>Carregando...</p></div>
  }

  return (
    <div className="admin-section">
      <h2>🏠 Hero - Página Inicial</h2>
      
      <div className="admin-field-group">
        <label>Label (EXPEDIÇÃO ROBLOX)</label>
        <input
          type="text"
          value={config.hero?.home?.label || ''}
          onChange={(e) => updateConfig('hero.home.label', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Título - Linha 1</label>
        <input
          type="text"
          value={config.hero?.home?.title?.line1 || ''}
          onChange={(e) => updateConfig('hero.home.title.line1', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Título - Linha 2</label>
        <input
          type="text"
          value={config.hero?.home?.title?.line2 || ''}
          onChange={(e) => updateConfig('hero.home.title.line2', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Descrição - Parágrafo 1</label>
        <textarea
          value={config.hero?.home?.description?.[0] || ''}
          onChange={(e) => {
            updateConfigDirectly((newConfig) => {
              if (!newConfig.hero) newConfig.hero = {}
              if (!newConfig.hero.home) newConfig.hero.home = {}
              if (!newConfig.hero.home.description) newConfig.hero.home.description = ['', '']
              newConfig.hero.home.description[0] = e.target.value
            })
          }}
          className="admin-textarea"
          rows="3"
        />
      </div>

      <div className="admin-field-group">
        <label>Descrição - Parágrafo 2</label>
        <textarea
          value={config.hero?.home?.description?.[1] || ''}
          onChange={(e) => {
            updateConfigDirectly((newConfig) => {
              if (!newConfig.hero) newConfig.hero = {}
              if (!newConfig.hero.home) newConfig.hero.home = {}
              if (!newConfig.hero.home.description) newConfig.hero.home.description = ['', '']
              newConfig.hero.home.description[1] = e.target.value
            })
          }}
          className="admin-textarea"
          rows="3"
        />
      </div>

      <h3>Hero - Biblioteca</h3>
      <div className="admin-field-group">
        <label>Label Biblioteca</label>
        <input
          type="text"
          value={config.hero?.biblioteca?.label || ''}
          onChange={(e) => updateConfig('hero.biblioteca.label', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Título Biblioteca - Linha 1</label>
        <input
          type="text"
          value={config.hero?.biblioteca?.title?.line1 || ''}
          onChange={(e) => updateConfig('hero.biblioteca.title.line1', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Título Biblioteca - Linha 2</label>
        <input
          type="text"
          value={config.hero?.biblioteca?.title?.line2 || ''}
          onChange={(e) => updateConfig('hero.biblioteca.title.line2', e.target.value)}
          className="admin-input"
        />
      </div>
    </div>
  )
}

// Componente para editar Menu
function MenuEditor({ config, updateConfig, updateConfigDirectly }) {
  if (!config?.menu?.home) {
    return <div className="admin-section"><p>Carregando...</p></div>
  }

  return (
    <div className="admin-section">
      <h2>📋 Menu de Navegação</h2>
      
      <h3>Call to Action (Botão do Menu)</h3>
      <div className="admin-field-group">
        <label>CTA - Linha 1</label>
        <input
          type="text"
          value={config.menu?.home?.cta?.line1 || ''}
          onChange={(e) => updateConfig('menu.home.cta.line1', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>CTA - Linha 2</label>
        <input
          type="text"
          value={config.menu?.home?.cta?.line2 || ''}
          onChange={(e) => updateConfig('menu.home.cta.line2', e.target.value)}
          className="admin-input"
        />
      </div>

      <h3>Itens do Menu - Home</h3>
      {config.menu?.home?.items?.map((item, index) => (
        <div key={index} className="admin-field-group">
          <label>Item {index + 1} - {item.label || 'Sem label'}</label>
          <input
            type="text"
            value={item.label || ''}
            onChange={(e) => {
              updateConfigDirectly((newConfig) => {
                if (!newConfig.menu) newConfig.menu = {}
                if (!newConfig.menu.home) newConfig.menu.home = {}
                if (!newConfig.menu.home.items) newConfig.menu.home.items = []
                if (!newConfig.menu.home.items[index]) newConfig.menu.home.items[index] = {}
                newConfig.menu.home.items[index].label = e.target.value
              })
            }}
            className="admin-input"
          />
        </div>
      )) || <p>Nenhum item encontrado</p>}
    </div>
  )
}

// Componente para editar Cores
function ColorsEditor({ config, updateConfig }) {
  if (!config?.colors) {
    return <div className="admin-section"><p>Carregando...</p></div>
  }

  const colorFields = [
    { key: 'primary', label: 'Cor Primária' },
    { key: 'secondary', label: 'Cor Secundária' },
    { key: 'accent', label: 'Cor de Destaque' },
    { key: 'tutorial', label: 'Cor Tutorial' },
    { key: 'footer', label: 'Cor Footer' },
    { key: 'white', label: 'Branco' },
    { key: 'black', label: 'Preto' },
    { key: 'gray', label: 'Cinza' },
    { key: 'lightGray', label: 'Cinza Claro' },
  ]

  return (
    <div className="admin-section">
      <h2>🎨 Cores do Site</h2>
      
      {colorFields.map(field => {
        const colorValue = config.colors?.[field.key] || '#000000'
        const hexValue = colorValue.replace(/[^0-9A-Fa-f]/g, '').substring(0, 6) || '000000'
        
        return (
          <div key={field.key} className="admin-field-group">
            <label>{field.label}</label>
            <div className="admin-color-input-group">
              <input
                type="text"
                value={colorValue}
                onChange={(e) => updateConfig(`colors.${field.key}`, e.target.value)}
                className="admin-input admin-color-input"
                placeholder="rgb(0, 0, 0) ou #000000"
              />
              <input
                type="color"
                value={`#${hexValue}`}
                onChange={(e) => {
                  const rgb = hexToRgb(e.target.value)
                  if (rgb) {
                    updateConfig(`colors.${field.key}`, `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)
                  }
                }}
                className="admin-color-picker"
              />
              <div 
                className="admin-color-preview"
                style={{ backgroundColor: colorValue }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Componente para editar Fontes
function FontsEditor({ config, updateConfig }) {
  if (!config?.fonts) {
    return <div className="admin-section"><p>Carregando...</p></div>
  }

  return (
    <div className="admin-section">
      <h2>✍️ Tamanhos de Fonte</h2>
      
      <h3>Título Hero</h3>
      <div className="admin-field-group">
        <label>Mobile</label>
        <input
          type="text"
          value={config.fonts?.heroTitle?.mobile || ''}
          onChange={(e) => updateConfig('fonts.heroTitle.mobile', e.target.value)}
          className="admin-input"
          placeholder="ex: 2.5rem"
        />
      </div>
      <div className="admin-field-group">
        <label>Tablet</label>
        <input
          type="text"
          value={config.fonts?.heroTitle?.tablet || ''}
          onChange={(e) => updateConfig('fonts.heroTitle.tablet', e.target.value)}
          className="admin-input"
          placeholder="ex: 3.5rem"
        />
      </div>
      <div className="admin-field-group">
        <label>Desktop</label>
        <input
          type="text"
          value={config.fonts?.heroTitle?.desktop || ''}
          onChange={(e) => updateConfig('fonts.heroTitle.desktop', e.target.value)}
          className="admin-input"
          placeholder="ex: 4.5rem"
        />
      </div>

      <h3>Título de Seção</h3>
      <div className="admin-field-group">
        <label>Mobile</label>
        <input
          type="text"
          value={config.fonts?.sectionTitle?.mobile || ''}
          onChange={(e) => updateConfig('fonts.sectionTitle.mobile', e.target.value)}
          className="admin-input"
        />
      </div>
      <div className="admin-field-group">
        <label>Tablet</label>
        <input
          type="text"
          value={config.fonts?.sectionTitle?.tablet || ''}
          onChange={(e) => updateConfig('fonts.sectionTitle.tablet', e.target.value)}
          className="admin-input"
        />
      </div>
      <div className="admin-field-group">
        <label>Desktop</label>
        <input
          type="text"
          value={config.fonts?.sectionTitle?.desktop || ''}
          onChange={(e) => updateConfig('fonts.sectionTitle.desktop', e.target.value)}
          className="admin-input"
        />
      </div>
    </div>
  )
}

// Componente para editar Footer
function FooterEditor({ config, updateConfig, updateConfigDirectly }) {
  if (!config?.footer) {
    return <div className="admin-section"><p>Carregando...</p></div>
  }

  return (
    <div className="admin-section">
      <h2>📄 Footer</h2>
      
      <h3>CTA - Pais e Responsáveis</h3>
      <div className="admin-field-group">
        <label>Título</label>
        <input
          type="text"
          value={config.footer?.cta?.title || ''}
          onChange={(e) => updateConfig('footer.cta.title', e.target.value)}
          className="admin-input"
        />
      </div>
      <div className="admin-field-group">
        <label>Texto</label>
        <input
          type="text"
          value={config.footer?.cta?.text || ''}
          onChange={(e) => updateConfig('footer.cta.text', e.target.value)}
          className="admin-input"
        />
      </div>
      <div className="admin-field-group">
        <label>Link Download</label>
        <input
          type="text"
          value={config.footer?.cta?.links?.download || ''}
          onChange={(e) => updateConfig('footer.cta.links.download', e.target.value)}
          className="admin-input"
        />
      </div>
      <div className="admin-field-group">
        <label>Link Vídeo</label>
        <input
          type="text"
          value={config.footer?.cta?.links?.video || ''}
          onChange={(e) => updateConfig('footer.cta.links.video', e.target.value)}
          className="admin-input"
        />
      </div>

      <h3>Central da Expedição</h3>
      <div className="admin-field-group">
        <label>Título</label>
        <input
          type="text"
          value={config.footer?.centralExpedicao?.title || ''}
          onChange={(e) => updateConfig('footer.centralExpedicao.title', e.target.value)}
          className="admin-input"
        />
      </div>

      <h4>Links</h4>
      {config.footer?.centralExpedicao?.links?.map((link, index) => (
        <div key={index} className="admin-field-group">
          <label>Link {index + 1}</label>
          <input
            type="text"
            value={link?.text || ''}
            onChange={(e) => {
              updateConfigDirectly((newConfig) => {
                if (!newConfig.footer) newConfig.footer = {}
                if (!newConfig.footer.centralExpedicao) newConfig.footer.centralExpedicao = {}
                if (!newConfig.footer.centralExpedicao.links) newConfig.footer.centralExpedicao.links = []
                if (!newConfig.footer.centralExpedicao.links[index]) newConfig.footer.centralExpedicao.links[index] = {}
                newConfig.footer.centralExpedicao.links[index].text = e.target.value
              })
            }}
            className="admin-input"
          />
        </div>
      )) || <p>Nenhum link encontrado</p>}

      <h4>Título "Escolha uma das trilhas"</h4>
      <div className="admin-field-group">
        <label>Texto</label>
        <input
          type="text"
          value={config.footer?.centralExpedicao?.callsTitle || ''}
          onChange={(e) => updateConfig('footer.centralExpedicao.callsTitle', e.target.value)}
          className="admin-input"
        />
      </div>

      <h4>Trilhas</h4>
      {config.footer?.centralExpedicao?.trilhas?.map((trilha, index) => (
        <div key={index} className="admin-card">
          <h4>Trilha {index + 1}</h4>
          <div className="admin-field-group">
            <label>Label</label>
            <input
              type="text"
              value={trilha.label}
              onChange={(e) => {
                updateConfigDirectly((newConfig) => {
                  newConfig.footer.centralExpedicao.trilhas[index].label = e.target.value
                })
              }}
              className="admin-input"
            />
          </div>
          <div className="admin-field-group">
            <label>Título</label>
            <input
              type="text"
              value={trilha.title}
              onChange={(e) => {
                updateConfigDirectly((newConfig) => {
                  if (!newConfig.footer) newConfig.footer = {}
                  if (!newConfig.footer.centralExpedicao) newConfig.footer.centralExpedicao = {}
                  if (!newConfig.footer.centralExpedicao.trilhas) newConfig.footer.centralExpedicao.trilhas = []
                  if (!newConfig.footer.centralExpedicao.trilhas[index]) newConfig.footer.centralExpedicao.trilhas[index] = {}
                  newConfig.footer.centralExpedicao.trilhas[index].title = e.target.value
                })
              }}
              className="admin-input"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// Componente para editar Formulários
function FormsEditor({ config, updateConfig }) {
  return (
    <div className="admin-section">
      <h2>📝 Formulários</h2>
      
      <h3>Formulário de Contato</h3>
      <div className="admin-field-group">
        <label>Título</label>
        <input
          type="text"
          value={config.forms.contact.title}
          onChange={(e) => updateConfig('forms.contact.title', e.target.value)}
          className="admin-input"
        />
      </div>

      <h3>Popup de Contato</h3>
      <div className="admin-field-group">
        <label>Título</label>
        <input
          type="text"
          value={config.forms.contactPopup.title}
          onChange={(e) => updateConfig('forms.contactPopup.title', e.target.value)}
          className="admin-input"
        />
      </div>
    </div>
  )
}

// Componente para editar Expedição
function ExpedicaoEditor({ config, updateConfig, updateConfigDirectly }) {
  if (!config?.expedicaoRoblox) {
    return <div className="admin-section"><p>Carregando...</p></div>
  }

  return (
    <div className="admin-section">
      <h2>🚀 Expedição Roblox</h2>
      
      <div className="admin-field-group">
        <label>Título - Linha 1</label>
        <input
          type="text"
          value={config.expedicaoRoblox?.title?.line1 || ''}
          onChange={(e) => updateConfig('expedicaoRoblox.title.line1', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Título - Linha 2</label>
        <input
          type="text"
          value={config.expedicaoRoblox?.title?.line2 || ''}
          onChange={(e) => updateConfig('expedicaoRoblox.title.line2', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Subtítulo</label>
        <input
          type="text"
          value={config.expedicaoRoblox?.subtitle || ''}
          onChange={(e) => updateConfig('expedicaoRoblox.subtitle', e.target.value)}
          className="admin-input"
        />
      </div>

      <h3>Trilhas</h3>
      {config.expedicaoRoblox?.trilhas?.map((trilha, index) => (
        <div key={index} className="admin-card">
          <h4>{trilha.label || `Trilha ${index + 1}`}</h4>
          <div className="admin-field-group">
            <label>Título</label>
            <input
              type="text"
              value={trilha.title || ''}
              onChange={(e) => {
                updateConfigDirectly((newConfig) => {
                  if (!newConfig.expedicaoRoblox) newConfig.expedicaoRoblox = {}
                  if (!newConfig.expedicaoRoblox.trilhas) newConfig.expedicaoRoblox.trilhas = []
                  if (!newConfig.expedicaoRoblox.trilhas[index]) newConfig.expedicaoRoblox.trilhas[index] = {}
                  newConfig.expedicaoRoblox.trilhas[index].title = e.target.value
                })
              }}
              className="admin-input"
            />
          </div>
          <div className="admin-field-group">
            <label>Descrição</label>
            <textarea
              value={trilha.description || ''}
              onChange={(e) => {
                if (updateConfigDirectly) {
                  updateConfigDirectly((newConfig) => {
                    if (!newConfig.expedicaoRoblox) newConfig.expedicaoRoblox = {}
                    if (!newConfig.expedicaoRoblox.trilhas) newConfig.expedicaoRoblox.trilhas = []
                    if (!newConfig.expedicaoRoblox.trilhas[index]) newConfig.expedicaoRoblox.trilhas[index] = {}
                    newConfig.expedicaoRoblox.trilhas[index].description = e.target.value
                  })
                }
              }}
              className="admin-textarea"
              rows="3"
            />
          </div>
        </div>
      )) || <p>Nenhuma trilha encontrada</p>}
    </div>
  )
}

// Componente para editar Manifesto
function ManifestoEditor({ config, updateConfig, updateConfigDirectly }) {
  if (!config?.manifesto) {
    return <div className="admin-section"><p>Carregando...</p></div>
  }

  return (
    <div className="admin-section">
      <h2>📖 Manifesto</h2>
      
      <div className="admin-field-group">
        <label>Título</label>
        <input
          type="text"
          value={config.manifesto?.title || ''}
          onChange={(e) => updateConfig('manifesto.title', e.target.value)}
          className="admin-input"
        />
      </div>

      <h3>Coluna 1</h3>
      {config.manifesto?.content?.[0]?.paragraphs?.map((para, index) => (
        <div key={index} className="admin-field-group">
          <label>Parágrafo {index + 1}</label>
          <textarea
            value={para}
            onChange={(e) => {
              updateConfigDirectly((newConfig) => {
                if (!newConfig.manifesto) newConfig.manifesto = {}
                if (!newConfig.manifesto.content) newConfig.manifesto.content = [{ paragraphs: [] }, { paragraphs: [] }]
                if (!newConfig.manifesto.content[0]) newConfig.manifesto.content[0] = { paragraphs: [] }
                if (!newConfig.manifesto.content[0].paragraphs) newConfig.manifesto.content[0].paragraphs = []
                newConfig.manifesto.content[0].paragraphs[index] = e.target.value
              })
            }}
            className="admin-textarea"
            rows="3"
          />
        </div>
      ))}

      <h3>Coluna 2</h3>
      {config.manifesto?.content?.[1]?.paragraphs?.map((para, index) => (
        <div key={index} className="admin-field-group">
          <label>Parágrafo {index + 1}</label>
          <textarea
            value={para}
            onChange={(e) => {
              updateConfigDirectly((newConfig) => {
                if (!newConfig.manifesto) newConfig.manifesto = {}
                if (!newConfig.manifesto.content) newConfig.manifesto.content = [{ paragraphs: [] }, { paragraphs: [] }]
                if (!newConfig.manifesto.content[1]) newConfig.manifesto.content[1] = { paragraphs: [] }
                if (!newConfig.manifesto.content[1].paragraphs) newConfig.manifesto.content[1].paragraphs = []
                newConfig.manifesto.content[1].paragraphs[index] = e.target.value
              })
            }}
            className="admin-textarea"
            rows="3"
          />
        </div>
      ))}
    </div>
  )
}

// Componente para editar Convide Amigos
function ConvideEditor({ config, updateConfig, updateConfigDirectly }) {
  if (!config?.convideAmigos) {
    return <div className="admin-section"><p>Carregando...</p></div>
  }

  return (
    <div className="admin-section">
      <h2>👥 Convide seus Amigos</h2>
      
      <div className="admin-field-group">
        <label>Título</label>
        <input
          type="text"
          value={config.convideAmigos?.title || ''}
          onChange={(e) => updateConfig('convideAmigos.title', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Descrição - Linha 1</label>
        <textarea
          value={config.convideAmigos?.description?.[0] || ''}
          onChange={(e) => {
            updateConfigDirectly((newConfig) => {
              if (!newConfig.convideAmigos) newConfig.convideAmigos = {}
              if (!newConfig.convideAmigos.description) newConfig.convideAmigos.description = ['', '']
              newConfig.convideAmigos.description[0] = e.target.value
            })
          }}
          className="admin-textarea"
          rows="2"
        />
      </div>

      <div className="admin-field-group">
        <label>Descrição - Linha 2</label>
        <textarea
          value={config.convideAmigos?.description?.[1] || ''}
          onChange={(e) => {
            updateConfigDirectly((newConfig) => {
              if (!newConfig.convideAmigos) newConfig.convideAmigos = {}
              if (!newConfig.convideAmigos.description) newConfig.convideAmigos.description = ['', '']
              newConfig.convideAmigos.description[1] = e.target.value
            })
          }}
          className="admin-textarea"
          rows="2"
        />
      </div>

      <h3>Formulário</h3>
      <div className="admin-field-group">
        <label>Label do Email</label>
        <input
          type="text"
          value={config.convideAmigos?.form?.emailLabel || ''}
          onChange={(e) => updateConfig('convideAmigos.form.emailLabel', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Texto do Botão</label>
        <input
          type="text"
          value={config.convideAmigos?.form?.button || ''}
          onChange={(e) => updateConfig('convideAmigos.form.button', e.target.value)}
          className="admin-input"
        />
      </div>

      <h3>Mensagem de Agradecimento</h3>
      <div className="admin-field-group">
        <label>Título</label>
        <input
          type="text"
          value={config.convideAmigos?.form?.thankYou?.title || ''}
          onChange={(e) => updateConfig('convideAmigos.form.thankYou.title', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Mensagem</label>
        <textarea
          value={config.convideAmigos?.form?.thankYou?.message || ''}
          onChange={(e) => updateConfig('convideAmigos.form.thankYou.message', e.target.value)}
          className="admin-textarea"
          rows="2"
        />
      </div>
    </div>
  )
}

// Componente para editar Próximos Eventos
function ProximosEventosEditor({ config, updateConfig, updateConfigDirectly }) {
  if (!config?.proximosEventos) {
    return <div className="admin-section"><p>Carregando...</p></div>
  }

  return (
    <div className="admin-section">
      <h2>📅 Próximos Eventos</h2>
      
      <div className="admin-field-group">
        <label>Título da Barra</label>
        <input
          type="text"
          value={config.proximosEventos?.title || ''}
          onChange={(e) => updateConfig('proximosEventos.title', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Título do Calendário</label>
        <input
          type="text"
          value={config.proximosEventos?.calendarTitle || ''}
          onChange={(e) => updateConfig('proximosEventos.calendarTitle', e.target.value)}
          className="admin-input"
        />
      </div>

      <h3>Eventos</h3>
      {config.proximosEventos?.eventos?.map((evento, index) => (
        <div key={index} className="admin-card">
          <h4>Evento {index + 1}</h4>
          <div className="admin-field-group">
            <label>Data</label>
            <input
              type="text"
              value={evento?.data || ''}
              onChange={(e) => {
                updateConfigDirectly((newConfig) => {
                  if (!newConfig.proximosEventos) newConfig.proximosEventos = {}
                  if (!newConfig.proximosEventos.eventos) newConfig.proximosEventos.eventos = []
                  if (!newConfig.proximosEventos.eventos[index]) newConfig.proximosEventos.eventos[index] = {}
                  newConfig.proximosEventos.eventos[index].data = e.target.value
                })
              }}
              className="admin-input"
              placeholder="DD/MM/AAAA"
            />
          </div>
          <div className="admin-field-group">
            <label>Título</label>
            <input
              type="text"
              value={evento?.titulo || ''}
              onChange={(e) => {
                updateConfigDirectly((newConfig) => {
                  if (!newConfig.proximosEventos) newConfig.proximosEventos = {}
                  if (!newConfig.proximosEventos.eventos) newConfig.proximosEventos.eventos = []
                  if (!newConfig.proximosEventos.eventos[index]) newConfig.proximosEventos.eventos[index] = {}
                  newConfig.proximosEventos.eventos[index].titulo = e.target.value
                })
              }}
              className="admin-input"
            />
          </div>
          <div className="admin-field-group">
            <label>Local</label>
            <input
              type="text"
              value={evento?.local || ''}
              onChange={(e) => {
                updateConfigDirectly((newConfig) => {
                  if (!newConfig.proximosEventos) newConfig.proximosEventos = {}
                  if (!newConfig.proximosEventos.eventos) newConfig.proximosEventos.eventos = []
                  if (!newConfig.proximosEventos.eventos[index]) newConfig.proximosEventos.eventos[index] = {}
                  newConfig.proximosEventos.eventos[index].local = e.target.value
                })
              }}
              className="admin-input"
            />
          </div>
        </div>
      )) || <p>Nenhum evento encontrado</p>}
    </div>
  )
}

// Componente para editar Biblioteca
function BibliotecaEditor({ config, updateConfig, updateConfigDirectly }) {
  if (!config?.biblioteca) {
    return <div className="admin-section"><p>Carregando...</p></div>
  }

  return (
    <div className="admin-section">
      <h2>📚 Biblioteca de Conteúdos</h2>
      
      <h3>Seções</h3>
      {Object.entries(config.biblioteca?.sections || {}).map(([key, section]) => (
        <div key={key} className="admin-card">
          <h4>{section?.title || key}</h4>
          <div className="admin-field-group">
            <label>Label</label>
            <input
              type="text"
              value={section?.label || ''}
              onChange={(e) => updateConfig(`biblioteca.sections.${key}.label`, e.target.value)}
              className="admin-input"
            />
          </div>
          <div className="admin-field-group">
            <label>Título</label>
            <input
              type="text"
              value={section?.title || ''}
              onChange={(e) => updateConfig(`biblioteca.sections.${key}.title`, e.target.value)}
              className="admin-input"
            />
          </div>
          <div className="admin-field-group">
            <label>Cor (RGB)</label>
            <input
              type="text"
              value={section?.color || ''}
              onChange={(e) => updateConfig(`biblioteca.sections.${key}.color`, e.target.value)}
              className="admin-input"
              placeholder="rgb(255, 0, 0)"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// Componente para editar JAM
function JamEditor({ config, updateConfig }) {
  if (!config?.jam) {
    return <div className="admin-section"><p>Carregando...</p></div>
  }

  return (
    <div className="admin-section">
      <h2>🎮 Página JAM</h2>
      
      <h3>Hero</h3>
      <div className="admin-field-group">
        <label>Título</label>
        <input
          type="text"
          value={config.jam?.hero?.title || ''}
          onChange={(e) => updateConfig('jam.hero.title', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Subtítulo</label>
        <input
          type="text"
          value={config.jam?.hero?.subtitle || ''}
          onChange={(e) => updateConfig('jam.hero.subtitle', e.target.value)}
          className="admin-input"
        />
      </div>
    </div>
  )
}

// Componente para editar Glossário
function GlossarioEditor({ config, updateConfig, updateConfigDirectly }) {
  if (!config?.glossario) {
    return <div className="admin-section"><p>Carregando...</p></div>
  }

  return (
    <div className="admin-section">
      <h2>📖 Glossário</h2>
      
      <div className="admin-field-group">
        <label>Título</label>
        <input
          type="text"
          value={config.glossario?.title || ''}
          onChange={(e) => updateConfig('glossario.title', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Subtítulo</label>
        <input
          type="text"
          value={config.glossario?.subtitle || ''}
          onChange={(e) => updateConfig('glossario.subtitle', e.target.value)}
          className="admin-input"
        />
      </div>

      <h3>Termos ({config.glossario?.termos?.length || 0} termos)</h3>
      <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1rem' }}>
        Os termos estão em ordem alfabética. Para editar, modifique o arquivo siteConfig.js diretamente.
      </p>
      
      {config.glossario?.termos?.slice(0, 5).map((termo, index) => (
        <div key={index} className="admin-card">
          <h4>{termo?.termo || `Termo ${index + 1}`}</h4>
          <div className="admin-field-group">
            <label>Descrição</label>
            <textarea
              value={termo?.descricao || ''}
              onChange={(e) => {
                updateConfigDirectly((newConfig) => {
                  if (!newConfig.glossario) newConfig.glossario = {}
                  if (!newConfig.glossario.termos) newConfig.glossario.termos = []
                  if (!newConfig.glossario.termos[index]) newConfig.glossario.termos[index] = {}
                  newConfig.glossario.termos[index].descricao = e.target.value
                })
              }}
              className="admin-textarea"
              rows="2"
            />
          </div>
        </div>
      ))}
      
      {config.glossario?.termos?.length > 5 && (
        <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '1rem' }}>
          ... e mais {config.glossario.termos.length - 5} termos. Edite o arquivo siteConfig.js para ver todos.
        </p>
      )}
    </div>
  )
}

// Componente para editar Roblox Studio
function RobloxStudioEditor({ config, updateConfig, updateConfigDirectly }) {
  if (!config?.robloxStudio) {
    return <div className="admin-section"><p>Carregando...</p></div>
  }

  return (
    <div className="admin-section">
      <h2>🎮 O Que é Roblox Studio</h2>
      
      <div className="admin-field-group">
        <label>Título</label>
        <input
          type="text"
          value={config.robloxStudio?.title || ''}
          onChange={(e) => updateConfig('robloxStudio.title', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Descrição - Parágrafo 1</label>
        <textarea
          value={config.robloxStudio?.description?.[0] || ''}
          onChange={(e) => {
            updateConfigDirectly((newConfig) => {
              if (!newConfig.robloxStudio) newConfig.robloxStudio = {}
              if (!newConfig.robloxStudio.description) newConfig.robloxStudio.description = ['', '']
              newConfig.robloxStudio.description[0] = e.target.value
            })
          }}
          className="admin-textarea"
          rows="3"
        />
      </div>

      <div className="admin-field-group">
        <label>Descrição - Parágrafo 2</label>
        <textarea
          value={config.robloxStudio?.description?.[1] || ''}
          onChange={(e) => {
            updateConfigDirectly((newConfig) => {
              if (!newConfig.robloxStudio) newConfig.robloxStudio = {}
              if (!newConfig.robloxStudio.description) newConfig.robloxStudio.description = ['', '']
              newConfig.robloxStudio.description[1] = e.target.value
            })
          }}
          className="admin-textarea"
          rows="3"
        />
      </div>
    </div>
  )
}

// Componente para editar Quer Criar Title
function QuerCriarTitleEditor({ config, updateConfig }) {
  if (!config?.querCriar) {
    return <div className="admin-section"><p>Carregando...</p></div>
  }

  return (
    <div className="admin-section">
      <h2>💬 Quer Criar Title</h2>
      
      <div className="admin-field-group">
        <label>Título - Linha 1</label>
        <input
          type="text"
          value={config.querCriar?.title?.line1 || ''}
          onChange={(e) => updateConfig('querCriar.title.line1', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Título - Linha 2</label>
        <input
          type="text"
          value={config.querCriar?.title?.line2 || ''}
          onChange={(e) => updateConfig('querCriar.title.line2', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Subtítulo</label>
        <input
          type="text"
          value={config.querCriar?.subtitle || ''}
          onChange={(e) => updateConfig('querCriar.subtitle', e.target.value)}
          className="admin-input"
        />
      </div>
    </div>
  )
}

// Componente para editar Quer Criar Section
function QuerCriarEditor({ config, updateConfig }) {
  return (
    <div className="admin-section">
      <h2>💭 Quer Criar Section</h2>
      <p style={{ color: '#666' }}>Esta seção não possui conteúdo editável no momento.</p>
    </div>
  )
}

// Componente para editar JAM Hero
function JamHeroEditor({ config, updateConfig, updateConfigDirectly }) {
  return (
    <div className="admin-section">
      <h2>⭐ Hero - Página JAM</h2>
      
      <div className="admin-field-group">
        <label>Título "Roblox"</label>
        <input
          type="text"
          value={config.jam?.hero?.titleRoblox || 'Roblox'}
          onChange={(e) => updateConfig('jam.hero.titleRoblox', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Título "Creator Jam"</label>
        <input
          type="text"
          value={config.jam?.hero?.titleCreatorJam || 'Creator Jam'}
          onChange={(e) => updateConfig('jam.hero.titleCreatorJam', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Descrição</label>
        <textarea
          value={config.jam?.hero?.description || ''}
          onChange={(e) => updateConfig('jam.hero.description', e.target.value)}
          className="admin-textarea"
          rows="4"
          placeholder="A Creator Jam é um desafio de criação rápida..."
        />
      </div>

      <div className="admin-field-group">
        <label>Texto do Botão CTA</label>
        <input
          type="text"
          value={config.jam?.hero?.ctaText || 'Inscreva-se'}
          onChange={(e) => updateConfig('jam.hero.ctaText', e.target.value)}
          className="admin-input"
        />
      </div>
    </div>
  )
}

// Componente para editar Como Participar
function ComoParticiparEditor({ config, updateConfig, updateConfigDirectly }) {
  return (
    <div className="admin-section">
      <h2>📝 Como Participar</h2>
      <p style={{ color: '#666', marginBottom: '1rem' }}>
        Esta seção contém conteúdo complexo com accordions. Para editar completamente, modifique o arquivo siteConfig.js diretamente.
      </p>
      <div className="admin-field-group">
        <label>Título da Seção</label>
        <input
          type="text"
          value={config.jam?.comoParticipar?.title || 'Como Participar'}
          onChange={(e) => updateConfig('jam.comoParticipar.title', e.target.value)}
          className="admin-input"
        />
      </div>
    </div>
  )
}

// Componente para editar Escolha Tema
function EscolhaTemaEditor({ config, updateConfig, updateConfigDirectly }) {
  return (
    <div className="admin-section">
      <h2>🎯 Escolha Tema</h2>
      <p style={{ color: '#666', marginBottom: '1rem' }}>
        Esta seção contém múltiplos temas. Para editar completamente, modifique o arquivo siteConfig.js diretamente.
      </p>
      <div className="admin-field-group">
        <label>Título da Seção</label>
        <input
          type="text"
          value={config.jam?.escolhaTema?.title || 'Escolha do Tema'}
          onChange={(e) => updateConfig('jam.escolhaTema.title', e.target.value)}
          className="admin-input"
        />
      </div>
    </div>
  )
}

// Componente para editar Desafio JAM
function DesafioJamEditor({ config, updateConfig, updateConfigDirectly }) {
  return (
    <div className="admin-section">
      <h2>⚔️ Desafio JAM</h2>
      <div className="admin-field-group">
        <label>Título</label>
        <input
          type="text"
          value={config.jam?.desafio?.title || 'O desafio da JAM'}
          onChange={(e) => updateConfig('jam.desafio.title', e.target.value)}
          className="admin-input"
        />
      </div>
      <div className="admin-field-group">
        <label>Descrição</label>
        <textarea
          value={config.jam?.desafio?.description || ''}
          onChange={(e) => updateConfig('jam.desafio.description', e.target.value)}
          className="admin-textarea"
          rows="4"
        />
      </div>
      <div className="admin-field-group">
        <label>Subtítulo "Exemplos de protótipos"</label>
        <input
          type="text"
          value={config.jam?.desafio?.subtitle || 'Exemplos de protótipos'}
          onChange={(e) => updateConfig('jam.desafio.subtitle', e.target.value)}
          className="admin-input"
        />
      </div>
    </div>
  )
}

// Componente para editar Regras JAM
function RegrasJamEditor({ config, updateConfig, updateConfigDirectly }) {
  return (
    <div className="admin-section">
      <h2>📋 Regras JAM</h2>
      <p style={{ color: '#666', marginBottom: '1rem' }}>
        Esta seção contém múltiplas regras. Para editar completamente, modifique o arquivo siteConfig.js diretamente.
      </p>
      <div className="admin-field-group">
        <label>Título da Seção</label>
        <input
          type="text"
          value={config.jam?.regras?.title || 'Regras da JAM'}
          onChange={(e) => updateConfig('jam.regras.title', e.target.value)}
          className="admin-input"
        />
      </div>
    </div>
  )
}

// Componente para editar Entrega Desafio
function EntregaDesafioEditor({ config, updateConfig, updateConfigDirectly }) {
  return (
    <div className="admin-section">
      <h2>📦 Entrega Desafio</h2>
      <div className="admin-field-group">
        <label>Título</label>
        <input
          type="text"
          value={config.jam?.entrega?.title || 'Entrega do desafio'}
          onChange={(e) => updateConfig('jam.entrega.title', e.target.value)}
          className="admin-input"
        />
      </div>
      <p style={{ color: '#666', marginBottom: '1rem' }}>
        Esta seção contém lista de entregas. Para editar completamente, modifique o arquivo siteConfig.js diretamente.
      </p>
    </div>
  )
}

// Componente para editar Premiação
function PremiacaoEditor({ config, updateConfig, updateConfigDirectly }) {
  return (
    <div className="admin-section">
      <h2>🏆 Premiação</h2>
      <div className="admin-field-group">
        <label>Título</label>
        <input
          type="text"
          value={config.jam?.premiacao?.title || 'Premiação'}
          onChange={(e) => updateConfig('jam.premiacao.title', e.target.value)}
          className="admin-input"
        />
      </div>
      <p style={{ color: '#666', marginBottom: '1rem' }}>
        Esta seção contém múltiplas premiações. Para editar completamente, modifique o arquivo siteConfig.js diretamente.
      </p>
    </div>
  )
}

// Componente para editar Datas e Canais
function DatasCanaisEditor({ config, updateConfig, updateConfigDirectly }) {
  return (
    <div className="admin-section">
      <h2>📅 Datas e Canais</h2>
      <div className="admin-field-group">
        <label>Título</label>
        <input
          type="text"
          value={config.jam?.datasCanais?.title || 'Datas e Canais'}
          onChange={(e) => updateConfig('jam.datasCanais.title', e.target.value)}
          className="admin-input"
        />
      </div>
      <p style={{ color: '#666', marginBottom: '1rem' }}>
        Esta seção contém múltiplas etapas. Para editar completamente, modifique o arquivo siteConfig.js diretamente.
      </p>
    </div>
  )
}

// Componente para editar Biblioteca Hero
function BibliotecaHeroEditor({ config, updateConfig, updateConfigDirectly }) {
  return (
    <div className="admin-section">
      <h2>⭐ Hero - Biblioteca</h2>
      
      <div className="admin-field-group">
        <label>Label (EXPEDIÇÃO ROBLOX)</label>
        <input
          type="text"
          value={config.hero?.biblioteca?.label || ''}
          onChange={(e) => updateConfig('hero.biblioteca.label', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Título - Linha 1</label>
        <input
          type="text"
          value={config.hero?.biblioteca?.title?.line1 || ''}
          onChange={(e) => updateConfig('hero.biblioteca.title.line1', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Título - Linha 2</label>
        <input
          type="text"
          value={config.hero?.biblioteca?.title?.line2 || ''}
          onChange={(e) => updateConfig('hero.biblioteca.title.line2', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Descrição - Parágrafo 1</label>
        <textarea
          value={config.hero?.biblioteca?.description?.[0] || ''}
          onChange={(e) => {
            updateConfigDirectly((newConfig) => {
              if (!newConfig.hero) newConfig.hero = {}
              if (!newConfig.hero.biblioteca) newConfig.hero.biblioteca = {}
              if (!newConfig.hero.biblioteca.description) newConfig.hero.biblioteca.description = ['', '']
              newConfig.hero.biblioteca.description[0] = e.target.value
            })
          }}
          className="admin-textarea"
          rows="3"
        />
      </div>

      <div className="admin-field-group">
        <label>Descrição - Parágrafo 2</label>
        <textarea
          value={config.hero?.biblioteca?.description?.[1] || ''}
          onChange={(e) => {
            updateConfigDirectly((newConfig) => {
              if (!newConfig.hero) newConfig.hero = {}
              if (!newConfig.hero.biblioteca) newConfig.hero.biblioteca = {}
              if (!newConfig.hero.biblioteca.description) newConfig.hero.biblioteca.description = ['', '']
              newConfig.hero.biblioteca.description[1] = e.target.value
            })
          }}
          className="admin-textarea"
          rows="3"
        />
      </div>
    </div>
  )
}

// Componente para editar Hero da Expedição na Estrada
function ExpedicaoNaEstradaHeroEditor({ config, updateConfig, updateConfigDirectly }) {
  return (
    <div className="admin-section">
      <h2>⭐ Hero - Expedição na Estrada</h2>
      
      <div className="admin-field-group">
        <label>Título - Linha 1</label>
        <input
          type="text"
          value={config.expedicaoNaEstrada?.hero?.title?.line1 || ''}
          onChange={(e) => updateConfig('expedicaoNaEstrada.hero.title.line1', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Título - Linha 2</label>
        <input
          type="text"
          value={config.expedicaoNaEstrada?.hero?.title?.line2 || ''}
          onChange={(e) => updateConfig('expedicaoNaEstrada.hero.title.line2', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Título - Linha 3</label>
        <input
          type="text"
          value={config.expedicaoNaEstrada?.hero?.title?.line3 || ''}
          onChange={(e) => updateConfig('expedicaoNaEstrada.hero.title.line3', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Descrição</label>
        <textarea
          value={config.expedicaoNaEstrada?.hero?.description || ''}
          onChange={(e) => updateConfig('expedicaoNaEstrada.hero.description', e.target.value)}
          className="admin-textarea"
          rows="4"
        />
      </div>

      <div className="admin-field-group">
        <label>Texto do Botão CTA</label>
        <input
          type="text"
          value={config.expedicaoNaEstrada?.hero?.ctaText || 'Quero saber mais'}
          onChange={(e) => updateConfig('expedicaoNaEstrada.hero.ctaText', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Imagem (caminho)</label>
        <input
          type="text"
          value={config.expedicaoNaEstrada?.hero?.image || '/images/5.webp'}
          onChange={(e) => updateConfig('expedicaoNaEstrada.hero.image', e.target.value)}
          className="admin-input"
          placeholder="/images/5.webp"
        />
      </div>
    </div>
  )
}

// Componente para editar Conteúdo da Expedição na Estrada
function ExpedicaoNaEstradaContentEditor({ config, updateConfig, updateConfigDirectly }) {
  const atividades = config.expedicaoNaEstrada?.content?.atividades || []
  
  return (
    <div className="admin-section">
      <h2>📝 Conteúdo - Expedição na Estrada</h2>
      
      <h3>Título</h3>
      <div className="admin-field-group">
        <label>Título - Linha 1</label>
        <input
          type="text"
          value={config.expedicaoNaEstrada?.content?.title?.line1 || ''}
          onChange={(e) => updateConfig('expedicaoNaEstrada.content.title.line1', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Título - Linha 2</label>
        <input
          type="text"
          value={config.expedicaoNaEstrada?.content?.title?.line2 || ''}
          onChange={(e) => updateConfig('expedicaoNaEstrada.content.title.line2', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Título - Linha 3</label>
        <input
          type="text"
          value={config.expedicaoNaEstrada?.content?.title?.line3 || ''}
          onChange={(e) => updateConfig('expedicaoNaEstrada.content.title.line3', e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Descrição</label>
        <textarea
          value={config.expedicaoNaEstrada?.content?.description || ''}
          onChange={(e) => updateConfig('expedicaoNaEstrada.content.description', e.target.value)}
          className="admin-textarea"
          rows="3"
        />
      </div>

      <h3>Atividades ({atividades.length} atividades)</h3>
      {atividades.map((atividade, index) => (
        <div key={atividade.id || index} className="admin-card">
          <h4>{atividade.title || `Atividade ${index + 1}`}</h4>
          <div className="admin-field-group">
            <label>Título</label>
            <input
              type="text"
              value={atividade.title || ''}
              onChange={(e) => {
                if (updateConfigDirectly) {
                  updateConfigDirectly((newConfig) => {
                    if (!newConfig.expedicaoNaEstrada) newConfig.expedicaoNaEstrada = {}
                    if (!newConfig.expedicaoNaEstrada.content) newConfig.expedicaoNaEstrada.content = {}
                    if (!newConfig.expedicaoNaEstrada.content.atividades) newConfig.expedicaoNaEstrada.content.atividades = []
                    if (!newConfig.expedicaoNaEstrada.content.atividades[index]) newConfig.expedicaoNaEstrada.content.atividades[index] = {}
                    newConfig.expedicaoNaEstrada.content.atividades[index].title = e.target.value
                  })
                }
              }}
              className="admin-input"
            />
          </div>
          <div className="admin-field-group">
            <label>Descrição</label>
            <textarea
              value={atividade.description || ''}
              onChange={(e) => {
                if (updateConfigDirectly) {
                  updateConfigDirectly((newConfig) => {
                    if (!newConfig.expedicaoNaEstrada) newConfig.expedicaoNaEstrada = {}
                    if (!newConfig.expedicaoNaEstrada.content) newConfig.expedicaoNaEstrada.content = {}
                    if (!newConfig.expedicaoNaEstrada.content.atividades) newConfig.expedicaoNaEstrada.content.atividades = []
                    if (!newConfig.expedicaoNaEstrada.content.atividades[index]) newConfig.expedicaoNaEstrada.content.atividades[index] = {}
                    newConfig.expedicaoNaEstrada.content.atividades[index].description = e.target.value
                  })
                }
              }}
              className="admin-textarea"
              rows="3"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// Componente para editar Seções da Biblioteca
function BibliotecaSectionEditor({ config, updateConfig, sectionKey }) {
  const section = config.biblioteca?.sections?.[sectionKey]
  
  if (!section) {
    return <div className="admin-section"><p>Carregando...</p></div>
  }

  return (
    <div className="admin-section">
      <h2>📚 {section.title || sectionKey}</h2>
      
      <div className="admin-field-group">
        <label>Label</label>
        <input
          type="text"
          value={section.label || ''}
          onChange={(e) => updateConfig(`biblioteca.sections.${sectionKey}.label`, e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Título</label>
        <input
          type="text"
          value={section.title || ''}
          onChange={(e) => updateConfig(`biblioteca.sections.${sectionKey}.title`, e.target.value)}
          className="admin-input"
        />
      </div>

      <div className="admin-field-group">
        <label>Cor (RGB)</label>
        <input
          type="text"
          value={section.color || ''}
          onChange={(e) => updateConfig(`biblioteca.sections.${sectionKey}.color`, e.target.value)}
          className="admin-input"
          placeholder="rgb(255, 0, 0)"
        />
      </div>
    </div>
  )
}

// Helper function
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

export default Admin

