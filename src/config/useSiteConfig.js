// Hook para usar siteConfig com suporte a alterações do admin
import { useState, useEffect } from 'react'
import { siteConfig as defaultConfig } from './siteConfig'

// Função para fazer merge profundo (deep merge)
function deepMerge(target, source) {
  const output = { ...target }
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] })
        } else {
          output[key] = deepMerge(target[key], source[key])
        }
      } else if (Array.isArray(source[key])) {
        // Para arrays, usar o do source se existir, senão manter o do target
        output[key] = source[key] && source[key].length > 0 ? source[key] : (target[key] || [])
      } else {
        // Para valores primitivos, usar o do source se existir, senão manter o do target
        output[key] = source[key] !== undefined && source[key] !== null && source[key] !== '' 
          ? source[key] 
          : (target[key] !== undefined ? target[key] : source[key])
      }
    })
  }
  
  return output
}

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export function useSiteConfig() {
  const [config, setConfig] = useState(() => {
    // Carregar configuração inicial do localStorage e fazer merge com padrão
    try {
      const savedConfig = localStorage.getItem('siteConfig')
      if (savedConfig) {
        const parsed = JSON.parse(savedConfig)
        // Fazer merge profundo: defaultConfig como base, savedConfig sobrescreve
        // Isso garante que sempre temos todos os dados do defaultConfig
        return deepMerge(defaultConfig, parsed)
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
            // Fazer merge profundo para garantir dados completos
            const merged = deepMerge(defaultConfig, parsed)
            setConfig(merged)
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
          // Fazer merge profundo para garantir dados completos
          const merged = deepMerge(defaultConfig, parsed)
          const currentConfigStr = JSON.stringify(config)
          const mergedConfigStr = JSON.stringify(merged)
          if (currentConfigStr !== mergedConfigStr) {
            setConfig(merged)
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

