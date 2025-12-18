# Backend para Envio de Emails

Este é um exemplo de servidor backend simples para enviar emails de convite.

## Como configurar

1. Instale as dependências:
```bash
npm install express cors nodemailer dotenv
```

2. Crie um arquivo `.env` na raiz do diretório `server-example` com as seguintes variáveis:

```env
PORT=3001
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app
EMAIL_FROM=seu-email@gmail.com
FRONTEND_URL=http://localhost:5173
```

**Nota para Gmail:** Você precisará criar uma "Senha de App" nas configurações da sua conta Google. Não use sua senha normal.

3. Execute o servidor:
```bash
node server.js
```

## Endpoints

### POST /api/enviar-convite
Envia um convite por email para um amigo.

**Body:**
```json
{
  "emailAmigo": "amigo@exemplo.com",
  "emailRemetente": "remetente@exemplo.com",
  "assunto": "Convite para Expedição Roblox",
  "mensagem": "Texto do convite",
  "landingUrl": "https://expedicao-roblox.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Convite enviado com sucesso!"
}
```

### POST /api/enviar-contato
Envia uma mensagem de contato.

**Body:**
```json
{
  "nome": "João Silva",
  "email": "joao@exemplo.com",
  "assunto": "Dúvida sobre o projeto",
  "mensagem": "Texto da mensagem"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso!"
}
```

## Alternativas ao servidor local

Se você não quiser executar um servidor backend, o sistema tem um **fallback automático** que:
1. Tenta enviar via API
2. Se falhar, abre o cliente de email padrão do usuário com o template pré-preenchido (usando `mailto:`)

Isso garante que o usuário sempre possa enviar convites, mesmo sem backend configurado.
