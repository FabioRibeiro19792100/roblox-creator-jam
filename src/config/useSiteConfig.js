// Hook para usar siteConfig com suporte a alterações do admin
import { useState, useEffect } from 'react'
import { siteConfig as defaultConfig } from './siteConfig'

// Função para fazer merge profundo (deep merge)
// target = defaultConfig (base completa)
// source = savedConfig (alterações do admin)
function deepMerge(target, source) {
  if (!isObject(target) || !isObject(source)) {
    return target
  }
  
  const output = { ...target }
  
  // Primeiro, garantir que todas as chaves do target estão no output
  Object.keys(target).forEach(key => {
    if (isObject(target[key]) && isObject(source[key])) {
      output[key] = deepMerge(target[key], source[key])
    } else if (Array.isArray(target[key])) {
      // Se target tem array e source também tem array não vazio, usar source
      // Se source não tem ou está vazio, usar target
      if (Array.isArray(source[key]) && source[key].length > 0) {
        output[key] = source[key]
      } else {
        output[key] = target[key]
      }
    } else {
      // Para valores primitivos, usar source se existir e não for vazio, senão target
      if (source[key] !== undefined && source[key] !== null && source[key] !== '') {
        output[key] = source[key]
      } else {
        output[key] = target[key]
      }
    }
  })
  
  // Depois, adicionar chaves que existem só no source (caso raro, mas pode acontecer)
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

