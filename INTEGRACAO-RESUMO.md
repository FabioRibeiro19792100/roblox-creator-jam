# Resumo das Integrações - Expedição Roblox

## 📋 Sistema de Cadastros e Formulários

### O que foi implementado

✅ **Integração com Google Sheets** para armazenar dados dos formulários
✅ **Envio de convites por email** (com fallback para mailto)
✅ **Sistema de contato** via WhatsApp e formulário

### Como funciona

Todos os dados dos formulários são enviados para duas places:

1. **Localmente** (localStorage) - backup instantâneo
2. **Google Sheets** - planilha online acessível

## 🎯 Formulários Integrados

### 1. Formulário de Inscrição Geral
**Localização:** Home, botões "Quero começar a criar"

**Dados coletados:**
- Nome
- Email
- Username do Roblox
- Perfil (Tutor/Jovem/Educador)
- Tipo de inscrição (geral, jam, estrada)
- Evento ID (quando aplicável)

**Onde vai:**
- Google Sheets → Aba "Inscrições"
- localStorage do navegador

### 2. Formulário de Convite de Amigos
**Localização:** Seção "Convide seus amigos(as)" (home)

**Dados coletados:**
- Email do amigo

**Onde vai:**
- Google Sheets → Aba "Convites"
- Email enviado para o amigo (via API ou mailto)

### 3. Formulário de Contato
**Localização:** Footer, popup de contato

**Dados coletados:**
- Nome
- Email
- Assunto
- Mensagem

**Onde vai:**
- Google Sheets → Aba "Contatos"
- WhatsApp (alternativa)

## 🔧 Configuração Necessária

### Opção 1: Sem configuração (Modo Básico)
**O que funciona:**
- ✅ Dados salvos localmente
- ✅ Convites via mailto (abre email do usuário)
- ✅ Contato via WhatsApp

**Limitações:**
- ❌ Dados não vão para planilha online
- ❌ Você não vê os cadastros centralizados

### Opção 2: Com Google Sheets (Recomendado)
**O que funciona:**
- ✅ Tudo do Modo Básico +
- ✅ Dados centralizados em planilha online
- ✅ Acesso em tempo real
- ✅ Exportação para Excel/CSV

**Como configurar:**
1. Siga o guia [GOOGLE-SHEETS-SETUP.md](./GOOGLE-SHEETS-SETUP.md)
2. Crie uma planilha no Google Sheets
3. Configure o Google Apps Script
4. Copie a URL do script
5. Adicione ao arquivo `.env`:
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/SEU_ID/exec
   ```

**Tempo estimado:** 10-15 minutos

### Opção 3: Com Backend de Email (Opcional)
**O que funciona:**
- ✅ Tudo da Opção 2 +
- ✅ Emails automáticos formatados em HTML
- ✅ Não depende do cliente de email do usuário

**Como configurar:**
1. Siga o guia [ENVIO-EMAILS.md](./ENVIO-EMAILS.md)
2. Configure servidor Node.js (pasta `server-example`)
3. Configure SMTP (Gmail, SendGrid, etc.)
4. Adicione ao arquivo `.env`:
   ```
   VITE_API_URL=http://localhost:3001/api
   ```

**Tempo estimado:** 20-30 minutos

## 📊 Visualizando os Dados

### Google Sheets (após configuração)

Acesse sua planilha e verá 3 abas:

1. **Inscrições** - Todos os cadastros
   - Filtros por tipo (geral, jam, estrada)
   - Filtros por perfil
   - Ordenação por data

2. **Convites** - Convites enviados
   - Emails dos amigos
   - Quem enviou

3. **Contatos** - Mensagens recebidas
   - Nome, email, assunto, mensagem
   - Data e hora

### Exportação

Para exportar os dados:
1. Abra a planilha
2. Arquivo → Fazer download → CSV ou Excel

## 🔒 Segurança e Privacidade

### Dados armazenados localmente
- ✅ Apenas no navegador do usuário
- ✅ Não compartilhado
- ✅ Pode ser limpo pelo usuário

### Dados no Google Sheets
- ✅ Privado (apenas você tem acesso)
- ✅ Criptografado em trânsito
- ✅ Auditável (cada envio tem timestamp)

### LGPD
- ✅ Dados coletados apenas para fins do projeto
- ✅ Usuário consente ao preencher formulário
- ✅ Possível adicionar política de privacidade

## 🚀 Próximos Passos Sugeridos

### Notificações por Email
Adicione no Apps Script para receber email quando alguém se cadastrar:
```javascript
MailApp.sendEmail('seu-email@mastertech.com',
  'Nova inscrição',
  'Nome: ' + data.nome);
```

### Dashboard de Analytics
Crie uma aba "Dashboard" com:
- Total de inscrições
- Inscrições por dia
- Perfis mais comuns
- Gráficos

### Integração com CRM
Conecte o Google Sheets com:
- HubSpot
- Mailchimp
- ActiveCampaign

### Automações
Use Zapier ou Make.com para:
- Enviar email de boas-vindas
- Adicionar em lista de newsletter
- Notificar equipe no Slack

## 📞 Suporte

Se tiver dúvidas:
1. Veja os guias detalhados:
   - [GOOGLE-SHEETS-SETUP.md](./GOOGLE-SHEETS-SETUP.md)
   - [ENVIO-EMAILS.md](./ENVIO-EMAILS.md)
2. Verifique o console do navegador (F12) para erros
3. Teste com dados falsos primeiro

## ✅ Checklist de Implementação

- [ ] Criar planilha no Google Sheets
- [ ] Configurar Google Apps Script
- [ ] Testar com dados de teste
- [ ] Adicionar URL do script ao `.env`
- [ ] Reiniciar servidor de desenvolvimento
- [ ] Testar formulários no site
- [ ] Verificar se dados aparecem na planilha
- [ ] (Opcional) Configurar backend de email
- [ ] (Opcional) Adicionar notificações
- [ ] (Opcional) Criar dashboard de analytics
