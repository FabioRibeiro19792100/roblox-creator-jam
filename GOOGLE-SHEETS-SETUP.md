# Configuração do Google Sheets

Este guia mostra como configurar uma planilha do Google Sheets para receber automaticamente os dados dos formulários.

## Passo 1: Criar a Planilha

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha chamada "Expedição Roblox - Cadastros"
3. Crie 3 abas (sheets):
   - **Inscrições** - Para cadastros gerais, Jams e eventos
   - **Convites** - Para registrar convites enviados
   - **Contatos** - Para mensagens de contato

### Estrutura da aba "Inscrições"

Na primeira linha, adicione os seguintes cabeçalhos:

| Data/Hora | Nome | Email | Username Roblox | Perfil | Tipo Inscrição | Evento ID |
|-----------|------|-------|-----------------|--------|----------------|-----------|

### Estrutura da aba "Convites"

| Data/Hora | Email do Amigo | Email Remetente |
|-----------|----------------|-----------------|

### Estrutura da aba "Contatos"

| Data/Hora | Nome | Email | Assunto | Mensagem |
|-----------|------|-------|---------|----------|

## Passo 2: Criar o Google Apps Script

1. Na planilha, vá em **Extensões > Apps Script**
2. Apague o código padrão
3. Cole o código abaixo:

```javascript
function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const data = JSON.parse(e.postData.contents);

    // Determinar qual ação executar
    switch(data.action) {
      case 'addInscricao':
        addInscricao(ss, data);
        break;
      case 'addConvite':
        addConvite(ss, data);
        break;
      case 'addContato':
        addContato(ss, data);
        break;
      default:
        return ContentService.createTextOutput(JSON.stringify({
          success: false,
          message: 'Ação não reconhecida'
        })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Dados salvos com sucesso!'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function addInscricao(ss, data) {
  const sheet = ss.getSheetByName('Inscrições');

  // Formatar data brasileira
  const timestamp = new Date(data.timestamp);
  const dataFormatada = Utilities.formatDate(timestamp, 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm:ss');

  sheet.appendRow([
    dataFormatada,
    data.nome || '',
    data.email || '',
    data.robloxAlias || '',
    data.perfil || '',
    data.tipo || 'geral',
    data.eventoId || ''
  ]);
}

function addConvite(ss, data) {
  const sheet = ss.getSheetByName('Convites');

  const timestamp = new Date(data.timestamp);
  const dataFormatada = Utilities.formatDate(timestamp, 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm:ss');

  sheet.appendRow([
    dataFormatada,
    data.emailAmigo || '',
    data.emailRemetente || ''
  ]);
}

function addContato(ss, data) {
  const sheet = ss.getSheetByName('Contatos');

  const timestamp = new Date(data.timestamp);
  const dataFormatada = Utilities.formatDate(timestamp, 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm:ss');

  sheet.appendRow([
    dataFormatada,
    data.nome || '',
    data.email || '',
    data.assunto || '',
    data.mensagem || ''
  ]);
}

// Função de teste (opcional)
function testeManual() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const dadosTeste = {
    action: 'addInscricao',
    timestamp: new Date().toISOString(),
    nome: 'João Silva',
    email: 'joao@teste.com',
    robloxAlias: 'joao_teste',
    perfil: 'jovem',
    tipo: 'geral',
    eventoId: ''
  };

  addInscricao(ss, dadosTeste);

  Logger.log('Teste executado com sucesso!');
}
```

4. Salve o projeto com o nome "Expedição Roblox API"

## Passo 3: Implantar como Web App

1. No Apps Script, clique em **Implantar > Nova implantação**
2. Clique no ícone de engrenagem ao lado de "Selecionar tipo"
3. Escolha **Aplicativo da Web**
4. Configure:
   - **Descrição**: Expedição Roblox - API de Cadastros
   - **Executar como**: Eu (seu email)
   - **Quem tem acesso**: Qualquer pessoa
5. Clique em **Implantar**
6. **IMPORTANTE**: Copie a **URL do aplicativo da Web** que aparece
   - Ela será algo como: `https://script.google.com/macros/s/AKfycby.../exec`

## Passo 4: Configurar no Projeto

1. No seu projeto, crie ou edite o arquivo `.env`:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/SUA_URL_AQUI/exec
```

2. Substitua `SUA_URL_AQUI` pela URL que você copiou no passo 3

## Passo 5: Testar

### Teste Direto no Apps Script

1. No Apps Script, selecione a função `testeManual`
2. Clique em **Executar**
3. Autorize o script (primeira vez)
4. Verifique se uma linha foi adicionada na aba "Inscrições"

### Teste no Site

1. Reinicie o servidor do projeto (`npm run dev`)
2. Preencha um formulário de inscrição
3. Verifique se os dados aparecem na planilha do Google Sheets

## Troubleshooting

### Erro de permissão
- Certifique-se de que autorizou o script na primeira execução
- Vá em Apps Script > Executar > testeManual e autorize

### Dados não aparecem na planilha
- Verifique se a URL está correta no arquivo `.env`
- Verifique se as abas têm exatamente os nomes: "Inscrições", "Convites", "Contatos"
- Abra o console do navegador (F12) e veja se há erros

### CORS error
- Isso é normal! O Google Apps Script usa `no-cors` mode
- Os dados são salvos mesmo com esse "erro" visual

## Recursos Adicionais

### Adicionar notificação por email

Adicione esta função no Apps Script para receber email quando alguém se inscrever:

```javascript
function addInscricao(ss, data) {
  const sheet = ss.getSheetByName('Inscrições');

  const timestamp = new Date(data.timestamp);
  const dataFormatada = Utilities.formatDate(timestamp, 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm:ss');

  sheet.appendRow([
    dataFormatada,
    data.nome || '',
    data.email || '',
    data.robloxAlias || '',
    data.perfil || '',
    data.tipo || 'geral',
    data.eventoId || ''
  ]);

  // NOVO: Enviar notificação por email
  const emailDestino = 'seu-email@mastertech.com'; // Altere aqui
  const assunto = '🎮 Nova Inscrição - Expedição Roblox';
  const corpo = `
Nova inscrição recebida!

Nome: ${data.nome}
Email: ${data.email}
Username Roblox: ${data.robloxAlias}
Perfil: ${data.perfil}
Tipo: ${data.tipo}
Evento: ${data.eventoId || 'N/A'}

Data: ${dataFormatada}
  `;

  MailApp.sendEmail(emailDestino, assunto, corpo);
}
```

### Ver estatísticas

Crie uma aba "Dashboard" com fórmulas para ver estatísticas:

- Total de inscrições: `=COUNTA(Inscrições!A:A)-1`
- Por perfil: `=COUNTIF(Inscrições!E:E,"jovem")`
- Últimas 24h: Use filtros por data

## Segurança

✅ **Privado**: Apenas você tem acesso à planilha
✅ **Seguro**: URL do script é única e difícil de adivinhar
✅ **Auditável**: Todas as submissões ficam registradas com data/hora

## Alternativas

Se preferir não usar Google Sheets, outras opções incluem:
- **Airtable** - Interface mais amigável
- **Notion Database** - Mais moderno
- **Backend próprio** - Controle total dos dados
