# Sistema de Envio de Emails - Expedição Roblox

## Como funciona

O sistema de envio de convites por email possui **duas formas de funcionamento**:

### 1. Com Backend (Recomendado)
Quando você configura um servidor backend, os emails são enviados automaticamente via SMTP (Gmail, SendGrid, etc.)

### 2. Sem Backend (Fallback Automático)
Se o backend não estiver disponível, o sistema **automaticamente** abre o cliente de email padrão do usuário com o convite pré-preenchido. O usuário só precisa clicar em "Enviar".

## Configuração Rápida (Opcional)

### Frontend

1. Crie um arquivo `.env` na raiz do projeto:
```bash
VITE_API_URL=http://localhost:3001/api
```

2. Se você **não** configurar a API, o sistema funcionará normalmente usando o fallback do `mailto:`.

### Backend (Opcional)

1. Entre na pasta `server-example`:
```bash
cd server-example
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o arquivo `.env` (copie de `.env.example`):
```bash
cp .env.example .env
```

4. Edite o `.env` com suas credenciais de email:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app
EMAIL_FROM=seu-email@gmail.com
```

**Importante:** Para Gmail, você precisa criar uma "Senha de App" em https://myaccount.google.com/apppasswords

5. Inicie o servidor:
```bash
npm start
```

## O que acontece quando o usuário clica em "Enviar convite"?

1. **Com backend configurado:**
   - O sistema envia um email automaticamente
   - O amigo recebe um email bonito formatado em HTML
   - Mostra mensagem de sucesso

2. **Sem backend (fallback automático):**
   - O sistema abre o cliente de email padrão (Gmail, Outlook, etc.)
   - O email já vem pré-preenchido com:
     - Destinatário: email do amigo
     - Assunto: "Convite para Expedição Roblox"
     - Corpo: mensagem formatada com link da landing page
   - O usuário só precisa clicar em "Enviar"

## Arquivos criados

- **Frontend:**
  - `src/services/emailService.js` - Serviço de envio de emails
  - `src/components/ConvideSeusAmigosSection.jsx` - Atualizado para usar o serviço
  - `.env.example` - Exemplo de configuração

- **Backend (opcional):**
  - `server-example/server.js` - Servidor Node.js
  - `server-example/package.json` - Dependências
  - `server-example/.env.example` - Exemplo de configuração
  - `server-example/README.md` - Documentação detalhada

## Vantagens do sistema

✅ **Funciona sempre** - Com ou sem backend configurado
✅ **Sem dependência externa** - Fallback para `mailto:` nativo
✅ **Fácil de configurar** - Apenas algumas variáveis de ambiente
✅ **Profissional** - Emails formatados em HTML quando via backend
✅ **Seguro** - Não expõe credenciais no frontend

## Testando

### Teste sem backend (fallback)
1. Não configure o `.env` ou deixe a API inacessível
2. Acesse a seção "Convide seus amigos"
3. Digite um email e clique em "Enviar convite"
4. O cliente de email deve abrir automaticamente

### Teste com backend
1. Configure e inicie o backend conforme instruções acima
2. Acesse a seção "Convide seus amigos"
3. Digite um email e clique em "Enviar convite"
4. Verifique a caixa de entrada do email destinatário

## Próximos passos (opcional)

Se você quiser um serviço de email profissional sem manter um servidor:

- **SendGrid** - 100 emails/dia grátis
- **Mailgun** - 5000 emails/mês grátis
- **AWS SES** - Muito barato, centavos por milhares de emails

Basta trocar as configurações no `.env` do backend.
