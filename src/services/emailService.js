/**
 * Serviço para envio de emails
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

/**
 * Envia convite por email para um amigo
 * @param {string} emailAmigo - Email do amigo que receberá o convite
 * @param {string} emailRemetente - Email de quem está enviando (opcional)
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const enviarConviteAmigo = async (emailAmigo, emailRemetente = '') => {
  try {
    const response = await fetch(`${API_URL}/enviar-convite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailAmigo,
        emailRemetente,
        assunto: 'Convite para Expedição Roblox',
        mensagem: `
Olá!

Você foi convidado(a) para participar da Expedição Roblox!

A Expedição Roblox é um projeto que reúne trilhas formativas para jovens e educadores explorarem conceitos educacionais por meio da criação, além de imersões que revelam as possibilidades dos jogos digitais como laboratório de aprendizado sobre novas tecnologias.

Acesse agora e descubra tudo sobre a Expedição:
${window.location.origin}

Vamos criar juntos!

---
Expedição Roblox - Mastertech
        `.trim(),
        landingUrl: window.location.origin
      }),
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar convite');
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message || 'Convite enviado com sucesso!'
    };
  } catch (error) {
    console.error('Erro ao enviar convite:', error);

    // Fallback: usar mailto se a API não estiver disponível
    const subject = encodeURIComponent('Convite para Expedição Roblox');
    const body = encodeURIComponent(`
Olá!

Você foi convidado(a) para participar da Expedição Roblox!

A Expedição Roblox é um projeto que reúne trilhas formativas para jovens e educadores explorarem conceitos educacionais por meio da criação, além de imersões que revelam as possibilidades dos jogos digitais como laboratório de aprendizado sobre novas tecnologias.

Acesse agora e descubra tudo sobre a Expedição:
${window.location.origin}

Vamos criar juntos!

---
Expedição Roblox - Mastertech
    `.trim());

    // Abre o cliente de email padrão do usuário
    window.location.href = `mailto:${emailAmigo}?subject=${subject}&body=${body}`;

    return {
      success: true,
      message: 'Abrindo seu cliente de email...'
    };
  }
};

/**
 * Envia dados de contato
 * @param {Object} dados - Dados do formulário de contato
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const enviarContato = async (dados) => {
  try {
    const response = await fetch(`${API_URL}/enviar-contato`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      throw new Error('Erro ao enviar mensagem');
    }

    const data = await response.json();
    return {
      success: true,
      message: data.message || 'Mensagem enviada com sucesso!'
    };
  } catch (error) {
    console.error('Erro ao enviar contato:', error);
    return {
      success: false,
      message: 'Erro ao enviar mensagem. Tente novamente mais tarde.'
    };
  }
};
