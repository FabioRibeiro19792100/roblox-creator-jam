// Hook para usar siteConfig com suporte a alterações do admin
import { useState, useEffect } from 'react'
import { siteConfig as defaultConfig } from './siteConfig'

export function useSiteConfig() {
  const [config, setConfig] = useState(() => {
    // Carregar configuração inicial do localStorage ou usar padrão
    try {
      const savedConfig = localStorage.getItem('siteConfig')
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig)
        return parsed
      }
    } catch (e) {
      console.error('Erro ao carregar configuração salva:', e)
    }
    return defaultConfig
  })

  useEffect(() => {
    // Listener para detectar mudanças no localStorage (quando admin salva)
    const handleStorageChange = (e) => {
      if (e.key === 'siteConfig') {
        try {
          if (e.newValue) {
            const parsed = JSON.parse(e.newValue)
            setConfig(parsed)
          } else {
            // Se foi removido, voltar ao padrão
            setConfig(defaultConfig)
          }
        } catch (error) {
          console.error('Erro ao atualizar configuração:', error)
        }
      }
    }

    // Escutar mudanças no localStorage (de outras abas/janelas)
    window.addEventListener('storage', handleStorageChange)

    // Também verificar mudanças na mesma aba (polling a cada 2 segundos)
    const intervalId = setInterval(() => {
      try {
        const savedConfig = localStorage.getItem('siteConfig')
        if (savedConfig) {
          const parsed = JSON.parse(savedConfig)
          const currentConfigStr = JSON.stringify(config)
          const savedConfigStr = JSON.stringify(parsed)
          if (currentConfigStr !== savedConfigStr) {
            setConfig(parsed)
          }
        } else if (config !== defaultConfig) {
          // Se foi removido do localStorage, voltar ao padrão
          setConfig(defaultConfig)
        }
      } catch (e) {
        // Ignorar erros silenciosamente
      }
    }, 2000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(intervalId)
    }
  }, [config])

  return config
}

// Exportar também o config padrão para uso direto
export { defaultConfig as siteConfig }

