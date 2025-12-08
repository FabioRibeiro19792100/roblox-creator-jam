# Configuração Centralizada do Site

Este diretório contém a configuração centralizada de todo o conteúdo do site, incluindo textos, cores, fontes e outras configurações.

## 📁 Arquivo Principal

### `siteConfig.js`

Este arquivo contém todas as configurações do site organizadas por seções:

- **Cores**: Todas as cores usadas no site
- **Fontes**: Tamanhos e pesos de fonte responsivos
- **Textos**: Todo o conteúdo textual do site
- **Menu**: Configurações de navegação
- **Formulários**: Textos e campos de formulários
- **Imagens**: Caminhos das imagens

## 🚀 Como Usar

### Exemplo Básico

```jsx
import { siteConfig } from '../config/siteConfig'

function MeuComponente() {
  return (
    <div>
      <h1>{siteConfig.hero.home.title.line1}</h1>
      <p style={{ color: siteConfig.colors.primary }}>
        {siteConfig.hero.home.description[0]}
      </p>
    </div>
  )
}
```

### Usando Cores

```jsx
import { siteConfig, getColor } from '../config/siteConfig'

// Método 1: Acesso direto
const corPrimaria = siteConfig.colors.primary

// Método 2: Usando helper (para caminhos aninhados)
const corAccent = getColor('accent')
```

### Usando Fontes Responsivas

```jsx
import { siteConfig, getResponsiveValue } from '../config/siteConfig'

function MeuComponente() {
  const fontSize = getResponsiveValue(siteConfig.fonts.heroTitle, 'desktop')
  
  return (
    <h1 style={{ fontSize }}>
      {siteConfig.hero.home.title.line1}
    </h1>
  )
}
```

## 📝 Estrutura de Dados

### Cores
```javascript
siteConfig.colors.primary      // Cor primária
siteConfig.colors.secondary    // Cor secundária
siteConfig.colors.accent       // Cor de destaque
```

### Textos do Hero
```javascript
siteConfig.hero.home.label           // "EXPEDIÇÃO ROBLOX"
siteConfig.hero.home.title.line1     // "Criar é"
siteConfig.hero.home.title.line2     // "o novo jogar"
siteConfig.hero.home.description    // Array de parágrafos
```

### Menu
```javascript
siteConfig.menu.home.items           // Array de itens do menu
siteConfig.menu.home.cta             // Call to action do menu
```

### Formulários
```javascript
siteConfig.forms.contact.title       // Título do formulário
siteConfig.forms.contact.fields      // Campos do formulário
```

## 🔄 Próximos Passos

1. **Refatorar Componentes**: Substituir textos hardcoded pelos valores de `siteConfig`
2. **Criar Painel Admin**: Interface visual para editar `siteConfig.js`
3. **Migrar para CMS**: Quando necessário, migrar para um Headless CMS

## 💡 Dicas

- Sempre use `siteConfig` ao invés de valores hardcoded
- Para cores, use `getColor()` para caminhos aninhados
- Para valores responsivos, use `getResponsiveValue()`
- Mantenha a estrutura do objeto organizada e documentada



