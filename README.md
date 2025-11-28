# RobloxJam

Projeto RobloxJam criado com **Vite + React** e design responsivo mobile-first.

## 🚀 Tecnologias

- **Vite** - Build tool rápida e moderna
- **React 18** - Biblioteca JavaScript para interfaces
- **CSS3** - Estilos responsivos mobile-first

## 📁 Estrutura do Projeto

```
RobloxJam/
├── src/
│   ├── App.jsx          # Componente principal
│   ├── App.css          # Estilos do App
│   ├── main.jsx         # Entry point
│   └── index.css        # Estilos globais
├── index.html           # HTML principal
├── vite.config.js       # Configuração do Vite
├── package.json         # Dependências
└── README.md            # Este arquivo
```

## 🛠️ Instalação

1. Instale as dependências:
```bash
npm install
```

## 🎯 Como usar

### Desenvolvimento
```bash
npm run dev
```
O servidor iniciará em `http://localhost:3000`

### Build para produção
```bash
npm run build
```

### Preview da build
```bash
npm run preview
```

## 📱 Design Responsivo

O projeto foi desenvolvido com abordagem **mobile-first**, otimizado para:

- 📱 **Mobile** (< 768px) - Layout em coluna única
- 📱 **Tablet** (768px - 1024px) - Layout adaptado
- 💻 **Desktop** (> 1024px) - Layout completo

## ✨ Recursos

- ✅ Design responsivo mobile-first
- ✅ CSS moderno com variáveis CSS
- ✅ Componentes React funcionais
- ✅ Hover effects e transições suaves
- ✅ Otimizado para dispositivos touch
- ✅ Hot Module Replacement (HMR)

## 🎨 Customização

As cores e estilos podem ser facilmente customizados através das variáveis CSS em `src/index.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  /* ... */
}
```

## 📝 Próximos passos

- Adicione suas funcionalidades
- Crie novos componentes
- Integre APIs
- Adicione testes
