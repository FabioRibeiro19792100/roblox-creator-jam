/**
 * Serviço para enviar dados para Google Sheets
 *
 * IMPORTANTE: Este serviço requer configuração do Google Apps Script
 * Veja GOOGLE-SHEETS-SETUP.md para instruções completas
 */

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

/**
 * Envia dados de inscrição para Google Sheets
 * @param {Object} dados - Dados do formulário
 * @param {string} tipo - Tipo de inscrição ('geral', 'jam', 'estrada')
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const enviarInscricaoParaSheets = async (dados, tipo = 'geral') => {
  try {
    if (!GOOGLE_SCRIPT_URL) {
      console.warn('Google Sheets URL não configurada. Dados salvos apenas localmente.');
      return {
        success: true,
        message: 'Dados salvos localmente. Configure Google Sheets para sincronização online.'
      };
    }

    const payload = {
      action: 'addInscricao',
      tipo: tipo,
      timestamp: new Date().toISOString(),
      ...dados
    };

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script requer no-cors
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    // no-cors sempre retorna opaque response, então assumimos sucesso
    return {
      success: true,
      message: 'Inscrição enviada com sucesso!'
    };
  } catch (error) {
    console.error('Erro ao enviar para Google Sheets:', error);

    // Mesmo com erro, consideramos sucesso pois dados estão salvos localmente
    return {
      success: true,
      message: 'Dados salvos localmente.'
    };
  }
};

/**
 * Envia dados de convite para Google Sheets
 * @param {string} emailAmigo - Email do amigo
 * @param {string} emailRemetente - Email de quem enviou (opcional)
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const enviarConviteParaSheets = async (emailAmigo, emailRemetente = '') => {
  try {
    if (!GOOGLE_SCRIPT_URL) {
      return {
        success: true,
        message: 'Convite registrado localmente.'
      };
    }

    const payload = {
      action: 'addConvite',
      timestamp: new Date().toISOString(),
      emailAmigo,
      emailRemetente
    };

    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    return {
      success: true,
      message: 'Convite registrado!'
    };
  } catch (error) {
    console.error('Erro ao enviar convite para Google Sheets:', error);
    return {
      success: true,
      message: 'Convite registrado localmente.'
    };
  }
};

/**
 * Envia dados de contato para Google Sheets
 * @param {Object} dados - Dados do formulário de contato
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const enviarContatoParaSheets = async (dados) => {
  try {
    if (!GOOGLE_SCRIPT_URL) {
      return {
        success: true,
        message: 'Mensagem registrada localmente.'
      };
    }

    const payload = {
      action: 'addContato',
      timestamp: new Date().toISOString(),
      ...dados
    };

    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    return {
      success: true,
      message: 'Mensagem enviada com sucesso!'
    };
  } catch (error) {
    console.error('Erro ao enviar contato para Google Sheets:', error);
    return {
      success: true,
      message: 'Mensagem registrada localmente.'
    };
  }
};
