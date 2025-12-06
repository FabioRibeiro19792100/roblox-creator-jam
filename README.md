# Roblox Creator Jam

Landing page responsiva para o evento Roblox Creator Jam, desenvolvida com Vite + React.

## 🚀 Como executar

### Pré-requisitos
- Node.js instalado (versão 16 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/SEU_USUARIO/roblox-creator-jam.git
cd roblox-creator-jam
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Abra o navegador em `http://localhost:5173`

### Build para produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

## 📁 Estrutura do projeto

```
RobloxJam/
├── src/
│   ├── components/      # Componentes React
│   ├── App.jsx          # Componente principal
│   └── main.jsx         # Ponto de entrada
├── public/              # Arquivos estáticos
├── index.html           # HTML principal
└── package.json         # Dependências
```

## 🎨 Seções

- Hero Section
- Como Participar (Accordion)
- Regras de Pareamento
- Escolha do Tema
- Trusted Connection
- O Desafio da JAM
- Entrega do Desafio
- Premiação
- Datas e Canais
- Footer

## 🛠️ Tecnologias

- React 18
- Vite
- CSS3 (Mobile-first, responsivo)

## 📱 Responsividade

O projeto é totalmente responsivo, com breakpoints para:
- Mobile (< 768px)
- Tablet (≥ 768px)
- Desktop (≥ 1024px)

## 🧭 Regras fixas do Hero

- **Nunca** deixe o hero subir acima do `header` / `proximos eventos`: a distância `HERO_TOP_SPACING` garante que o conteúdo fique visível.  
- O `z-index` do hero deve permanecer baixo (`var(--layer-hero, 0)`), assim nada passa por cima dele.  
- O texto do hero sempre usa o mesmo padding horizontal que o resto do site via `--site-horizontal-padding` para manter o alinhamento com o nav.
