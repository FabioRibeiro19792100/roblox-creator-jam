// Hook para usar siteConfig com suporte a alterações do admin
import { useState, useEffect } from 'react'
import defaultConfigPt from './siteConfig.json'
import defaultConfigEn from './siteConfig.en.json'

// Função para fazer merge profundo (deep merge)
function deepMerge(target, source) {
  if (!isObject(target) || !isObject(source)) {
    return target
  }
  
  const output = { ...target }
  
  Object.keys(target).forEach(key => {
    if (isObject(target[key]) && isObject(source[key])) {
      output[key] = deepMerge(target[key], source[key])
    } else if (Array.isArray(target[key])) {
      if (Array.isArray(source[key]) && source[key].length > 0) {
        output[key] = source[key]
      } else {
        output[key] = target[key]
      }
    } else {
      if (source[key] !== undefined && source[key] !== null && source[key] !== '') {
        output[key] = source[key]
      } else {
        output[key] = target[key]
      }
    }
  })
  
  Object.keys(source).forEach(key => {
    if (!(key in output)) {
      output[key] = source[key]
    }
  })
  
  return output
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export function useSiteConfig() {
  const [config, setConfig] = useState(defaultConfigPt)
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('siteLanguage') || 'pt'
    } catch {
      return 'pt'
    }
  })

  // Efeito para carregar a configuração correta baseada no idioma
  useEffect(() => {
    const baseConfig = language === 'en' ? defaultConfigEn : defaultConfigPt
    
    try {
      const savedConfig = localStorage.getItem(`siteConfig_${language}`)
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig)
        setConfig(deepMerge(baseConfig, parsed))
      } else {
        setConfig(baseConfig)
      }
    } catch (e) {
      console.error('Erro ao carregar configuração salva:', e)
      setConfig(baseConfig)
    }
  }, [language])

  // Efeito para escutar mudanças no localStorage (idioma e config)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'siteLanguage') {
        setLanguage(e.newValue || 'pt')
      } else if (e.key === `siteConfig_${language}` || e.key === 'siteConfig') {
        // Se a config do idioma atual mudou (admin salvou)
        // Nota: 'siteConfig' legado mantido para compatibilidade se necessário
        const baseConfig = language === 'en' ? defaultConfigEn : defaultConfigPt
        try {
          if (e.newValue) {
            const parsed = JSON.parse(e.newValue)
            setConfig(deepMerge(baseConfig, parsed))
          } else {
            setConfig(baseConfig)
          }
        } catch (error) {
          console.error('Erro ao atualizar configuração:', error)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)

    // Polling para detectar mudanças na mesma aba (setLanguage não dispara storage event na mesma aba, mas localStorage sim)
    const intervalId = setInterval(() => {
      try {
        const currentStoredLang = localStorage.getItem('siteLanguage') || 'pt'
        if (currentStoredLang !== language) {
          setLanguage(currentStoredLang)
        }
      } catch {}
    }, 500)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(intervalId)
    }
  }, [language])

  return config
}

// Função auxiliar para mudar o idioma
export const setSiteLanguage = (lang) => {
  try {
    localStorage.setItem('siteLanguage', lang)
    // Dispara evento customizado para notificar componentes na mesma aba imediatamente se necessário,
    // embora o polling/state resolva.
    window.dispatchEvent(new Event('storage'))
  } catch (e) {
    console.error('Erro ao salvar idioma:', e)
  }
}

export { defaultConfigPt as siteConfig, defaultConfigEn as siteConfigEn }
