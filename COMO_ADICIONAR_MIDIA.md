# Como Adicionar Imagens e Vídeos

## 📁 Estrutura de Pastas

Criei as pastas:
- `public/images/` - para imagens
- `public/videos/` - para vídeos

## 🖼️ Adicionar Imagens

### Opção 1: Pasta `public` (Recomendado para muitas imagens)

1. Coloque a imagem em `public/images/nome-da-imagem.jpg`
2. Use no código assim:

```jsx
<img src="/images/nome-da-imagem.jpg" alt="Descrição" />
```

**Exemplo:**
```jsx
<img src="/images/logo-roblox.png" alt="Logo Roblox" />
```

### Opção 2: Importar direto no componente

1. Coloque a imagem em `src/assets/images/`
2. Importe no componente:

```jsx
import logoRoblox from '../assets/images/logo-roblox.png'

function MeuComponente() {
  return <img src={logoRoblox} alt="Logo Roblox" />
}
```

## 🎥 Adicionar Vídeos

### Opção 1: Pasta `public` (Recomendado)

1. Coloque o vídeo em `public/videos/nome-do-video.mp4`
2. Use no código assim:

```jsx
<video controls>
  <source src="/videos/nome-do-video.mp4" type="video/mp4" />
  Seu navegador não suporta vídeos.
</video>
```

**Exemplo completo:**
```jsx
<video 
  controls 
  width="100%" 
  style={{ maxWidth: '800px' }}
>
  <source src="/videos/demo-jam.mp4" type="video/mp4" />
  <source src="/videos/demo-jam.webm" type="video/webm" />
  Seu navegador não suporta vídeos.
</video>
```

### Opção 2: Vídeo autoplay (sem controles)

```jsx
<video 
  autoPlay 
  loop 
  muted 
  playsInline
  style={{ width: '100%' }}
>
  <source src="/videos/background-loop.mp4" type="video/mp4" />
</video>
```

## 📝 Exemplo Prático

Se você quiser adicionar uma imagem na seção Hero:

```jsx
// Em HeroSection.jsx
function HeroSection() {
  return (
    <section className="hero-section">
      <img 
        src="/images/hero-background.jpg" 
        alt="Background" 
        className="hero-image"
      />
      {/* resto do conteúdo */}
    </section>
  )
}
```

E no CSS:
```css
.hero-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
```

## 🔗 Vídeos do YouTube/Vimeo

Para vídeos externos, use iframe:

```jsx
<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID" 
  title="YouTube video player" 
  frameBorder="0" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  allowFullScreen
></iframe>
```

## ⚠️ Dicas Importantes

1. **Otimize imagens**: Use formatos modernos (WebP) ou comprima JPG/PNG
2. **Tamanhos de vídeo**: Vídeos grandes podem deixar o site lento. Considere usar serviços como YouTube ou Vimeo
3. **Lazy loading**: Para melhor performance:
   ```jsx
   <img src="/images/foto.jpg" loading="lazy" alt="Descrição" />
   ```
4. **Responsivo**: Sempre use CSS para tornar imagens/vídeos responsivos

## 📦 Formatos Suportados

- **Imagens**: JPG, PNG, GIF, WebP, SVG
- **Vídeos**: MP4, WebM, OGG










