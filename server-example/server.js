require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));
app.use(express.json());

// Configurar transporte de email
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true para porta 465, false para outras portas
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verificar conexão com servidor de email
transporter.verify(function (error, success) {
  if (error) {
    console.error('Erro ao conectar com servidor de email:', error);
  } else {
    console.log('Servidor de email pronto para enviar mensagens');
  }
});

// Endpoint para enviar convite
app.post('/api/enviar-convite', async (req, res) => {
  try {
    const { emailAmigo, emailRemetente, assunto, mensagem, landingUrl } = req.body;

    if (!emailAmigo) {
      return res.status(400).json({
        success: false,
        message: 'Email do amigo é obrigatório'
      });
    }

    // Configurar email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: emailAmigo,
      subject: assunto || 'Convite para Expedição Roblox',
      text: mensagem,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5300FF;">Você foi convidado para a Expedição Roblox!</h2>
          <p style="line-height: 1.6; color: #333;">
            ${mensagem.replace(/\n/g, '<br>')}
          </p>
          <div style="margin: 30px 0;">
            <a href="${landingUrl}"
               style="background: #5300FF;
                      color: white;
                      padding: 15px 30px;
                      text-decoration: none;
                      border-radius: 5px;
                      display: inline-block;">
              Acessar Expedição Roblox
            </a>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            Expedição Roblox - Mastertech<br>
            Este email foi enviado porque alguém indicou você para participar da Expedição Roblox.
          </p>
        </div>
      `
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Convite enviado com sucesso!'
    });
  } catch (error) {
    console.error('Erro ao enviar convite:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar convite. Tente novamente mais tarde.'
    });
  }
});

// Endpoint para enviar mensagem de contato
app.post('/api/enviar-contato', async (req, res) => {
  try {
    const { nome, email, assunto, mensagem } = req.body;

    if (!nome || !email || !mensagem) {
      return res.status(400).json({
        success: false,
        message: 'Nome, email e mensagem são obrigatórios'
      });
    }

    // Configurar email
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM, // Envia para o próprio email da Mastertech
      replyTo: email,
      subject: `[Contato] ${assunto || 'Nova mensagem do site'}`,
      text: `
Nome: ${nome}
Email: ${email}
Assunto: ${assunto || 'Não especificado'}

Mensagem:
${mensagem}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #5300FF;">Nova mensagem de contato</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Nome:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${nome}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Assunto:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${assunto || 'Não especificado'}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 20px; background: #f5f5f5; border-left: 4px solid #5300FF;">
            <h3 style="margin-top: 0;">Mensagem:</h3>
            <p style="line-height: 1.6; white-space: pre-wrap;">${mensagem}</p>
          </div>
        </div>
      `
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Mensagem enviada com sucesso!'
    });
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar mensagem. Tente novamente mais tarde.'
    });
  }
});

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
