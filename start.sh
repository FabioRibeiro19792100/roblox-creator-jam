#!/bin/bash

# Carrega o nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Verifica se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "Node.js não encontrado. Instalando..."
    nvm install --lts
    nvm use --lts
    nvm alias default node
fi

# Verifica versões
echo "Node.js versão: $(node --version)"
echo "npm versão: $(npm --version)"

# Instala dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "Instalando dependências..."
    npm install
fi

# Inicia o servidor de desenvolvimento
echo "Iniciando servidor de desenvolvimento..."
npm run dev

