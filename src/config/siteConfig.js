// Configuração centralizada do site
// Todos os textos, cores, fontes e configurações podem ser editados aqui

export const siteConfig = {
  // ========== CORES ==========
  colors: {
    primary: 'rgb(83, 0, 255)',
    secondary: 'rgb(60, 254, 207)',
    accent: 'rgb(216, 243, 31)',
    tutorial: 'rgb(255, 194, 231)',
    footer: '#4a4a4a',
    white: '#ffffff',
    black: '#000000',
    gray: '#666666',
    lightGray: 'rgba(255, 255, 255, 0.15)',
    separatorGray: 'rgba(255, 255, 255, 0.25)',
  },

  // ========== FONTES ==========
  fonts: {
    // Tamanhos de título principal (hero)
    heroTitle: {
      mobile: '2.5rem',
      tablet: '3.5rem',
      desktop: '4.5rem',
    },
    // Tamanhos de título de seção
    sectionTitle: {
      mobile: '2.5rem',
      tablet: '3.5rem',
      desktop: '4.5rem',
    },
    // Tamanhos de subtítulo
    subtitle: {
      mobile: '1.125rem',
      tablet: '1.3rem',
      desktop: '1.4rem',
    },
    // Tamanhos de corpo de texto
    body: {
      mobile: '1.125rem',
      tablet: '1.3rem',
      desktop: '1.4rem',
    },
    // Tamanhos de label pequeno
    label: {
      mobile: '0.875rem',
      tablet: '1rem',
      desktop: '1.125rem',
    },
    // Peso das fontes
    weights: {
      normal: 400,
      semibold: 600,
      bold: 700,
      black: 900,
    },
  },

  // ========== TEXTO DO HERO ==========
  hero: {
    home: {
      label: 'EXPEDIÇÃO ROBLOX',
      title: {
        line1: 'Criar é',
        line2: 'o novo jogar',
      },
      description: [
        "Ao longo de 2026, 10 mil jovens vão sair do 'só jogar' pra publicar seus próprios mundos no Roblox.",
        'Passo a passo, do primeiro clique no Studio até ver amigos jogando algo que você criou.',
      ],
    },
    biblioteca: {
      label: 'EXPEDIÇÃO ROBLOX',
      title: {
        line1: 'Conteúdos da',
        line2: 'expedição',
      },
      description: [
        'Explore nossa biblioteca completa de materiais educativos, tutoriais e recursos para aprender Roblox Studio do zero.',
        'Acesse conteúdos organizados por trilhas e desenvolva suas habilidades passo a passo.',
      ],
    },
  },

  // ========== MENU ==========
  menu: {
    home: {
      items: [
        { label: 'Início', anchor: '#home-hero' },
        { label: 'Manifesto', anchor: '#placeholder' },
        { label: 'A Expedição', anchor: '#expedicao-roblox' },
        { label: 'Studios', anchor: '#o-que-e-roblox-studio' },
        { label: 'Biblioteca', anchor: '#biblioteca', isLink: true },
        { label: 'Contato', anchor: '#footer-container-wrapper' },
      ],
      cta: {
        line1: 'Quer criar?',
        line2: 'Desce pro play.',
        anchor: '#expedicao-roblox',
      },
    },
    biblioteca: {
      items: [
        { label: 'Início', isLink: true, link: 'home' },
        { label: 'Tutorial Roblox Studios', anchor: '#biblioteca-tutorial' },
        { label: 'Mochilão', anchor: '#biblioteca-mochilao' },
        { label: 'Acampamento', anchor: '#biblioteca-acampamento' },
        { label: 'Sobrevivência', anchor: '#biblioteca-sobrevivencia' },
        { label: 'Central da Expedição', anchor: '#footer-container-wrapper' },
      ],
    },
    jam: {
      items: [
        { label: 'Início', isLink: true, link: 'home' },
        { label: 'Como Participar', anchor: '#como-participar' },
        { label: 'Temas', anchor: '#escolha-tema' },
        { label: 'Desafio', anchor: '#desafio-jam' },
        { label: 'Regras', anchor: '#regras-jam' },
        { label: 'Entrega', anchor: '#entrega-desafio' },
        { label: 'Premiação', anchor: '#premiacao' },
        { label: 'Datas e Canais', anchor: '#datas-canais' },
      ],
    },
  },

  // ========== PRÓXIMOS EVENTOS ==========
  proximosEventos: {
    title: 'Próximos eventos',
    eventos: [
      { data: '15/01/2026', titulo: 'Abertura das Inscrições', local: 'Online' },
      { data: '22/01/2026', titulo: 'Workshop: Primeiros Passos', local: 'São Paulo' },
      { data: '05/02/2026', titulo: 'Game Jam #1', local: 'Online' },
      { data: '12/02/2026', titulo: 'Encontro Presencial - Rio', local: 'Rio de Janeiro' },
      { data: '20/02/2026', titulo: 'Workshop: Criação Avançada', local: 'Brasília' },
    ],
    calendarTitle: 'Próximos Eventos',
  },

  // ========== MANIFESTO ==========
  manifesto: {
    title: 'E o jogo agora é seu.',
    content: [
      {
        column: 1,
        paragraphs: [
          'Nós somos a Mastertech, uma escola de inovação e de ensino de tecnologias, e estamos lançando um novo projeto.',
          'Ao longo de 2026 vamos liderar experiências no Roblox Studio que estimulam imaginação, criação e descoberta, fortalecendo habilidades criativas em um ambiente divertido e seguro.',
          'O projeto reúne trilhas formativas para jovens e educadores explorarem conceitos educacionais por meio da criação, além de imersões que revelam as possibilidades dos jogos digitais como laboratório de aprendizado sobre novas tecnologias.',
          'A Expedição, realizada em parceria com a Roblox, é uma iniciativa nacional aberta a todos e sem pré-requisitos, com atividades quase totalmente online.',
          'Sim, quase. Porque teremos também eventos presenciais em seis capitais brasileiras.',
        ],
      },
      {
        column: 2,
        paragraphs: [
          'Nesses encontros vamos reunir pais, responsáveis e jovens criativos para construir ambientes que ampliem a noção de segurança digital e que sejam divertidos e significativos como experiência de aprendizado.',
          'Quer criar com a gente?',
          'Desce pro play.',
          'Afinal, você pode aprender tudo o que quiser em uma escola que flui.',
        ],
      },
    ],
    cta: {
      text: 'Quero saber mais',
    },
  },

  // ========== EXPEDIÇÃO ROBLOX ==========
  expedicaoRoblox: {
    title: {
      line1: 'Gratuito, online',
      line2: 'e sem pré-requisitos.',
    },
    subtitle: 'As trilhas da expedição',
    trilhas: [
      {
        id: 'trilha-01',
        label: 'TRILHA 01',
        title: 'Aprenda Roblox Studio do zero em nossas trilhas de conteúdos',
        description: 'As trilhas misturam curso online, desafios mensais e eventos ao vivo pra transformar tempo de tela em portfólio, segurança digital e histórias que você assina com seu nome.',
        cta: 'Quero começar a criar',
        action: 'contact',
      },
      {
        id: 'trilha-02',
        label: 'TRILHA 02',
        title: 'Inscreva-se numa jam e crie experiências jogáveis de verdade;',
        description: 'Participe de Game Jams onde você desenvolve experiências completas em 72 horas, trabalhando em equipe e criando projetos reais para o Roblox.',
        action: 'jam',
      },
      {
        id: 'trilha-03',
        label: 'TRILHA 03',
        title: 'Participe da imersão presencial em um evento na sua capital.',
        description: 'Consulte em breve o calendário do Expedição Roblox na Estrada para eventos presenciais na sua cidade.',
        cta: 'Quero saber mais',
        action: 'contact',
      },
    ],
  },

  // ========== EXPEDIÇÃO NA ESTRADA ==========
  expedicaoNaEstrada: {
    hero: {
      title: {
        line1: 'Expedição',
        line2: 'Roblox',
        line3: 'na Estrada',
      },
      description: 'Nesses encontros vamos reunir pais, responsáveis e jovens criativos para construir ambientes que ampliem a noção de segurança digital e que sejam divertidos e significativos como experiência de aprendizado.',
      ctaText: 'Quero saber mais',
      image: '/images/5.webp',
    },
    content: {
      title: {
        line1: 'Expedição',
        line2: 'Roblox',
        line3: 'na Estrada',
      },
      description: 'Nas capitais, o projeto abre sua programação com encontros que combinam criação no Roblox, participação das famílias e introdução aos quatro formatos que compõem a experiência.',
      atividades: [
        {
          id: 'mundos-em-familia',
          title: 'Mundos em Família',
          description: 'Jovens e responsáveis imaginam juntos "mundos melhores" e desenham as primeiras ideias de experiências no Roblox.'
        },
        {
          id: 'construtores-do-futuro',
          title: 'Construtores do Futuro',
          description: 'Oficinas práticas de criação no Roblox, com foco em cooperação, sustentabilidade e desafios reais do dia a dia.'
        },
        {
          id: 'cidadania-digital',
          title: 'Cidadania Digital',
          description: 'Conversa guiada sobre segurança online, cidadania digital e equilíbrio saudável com as telas — com espaço aberto para dúvidas e relatos.'
        },
        {
          id: 'showcase-de-mundos',
          title: 'Showcase de Mundos',
          description: 'Apresentação dos mundos criados pelas crianças para familiares e especialistas, com reconhecimento simbólico e convite para seguir criando no Roblox.'
        }
      ]
    },
    eventos: [
      {
        id: 'rio-de-janeiro',
        cidade: 'Rio de Janeiro',
        data: '10 de março de 2025',
        local: {
          nome: 'Senac Candelária',
          endereco: 'Avenida presidente Vargas, 1500, 2 andar'
        },
        sessoes: [
          {
            id: 'sessao-1',
            nome: 'Inscreva-se na sessão 1',
            horario: 'Das 09h às 13hs'
          },
          {
            id: 'sessao-2',
            nome: 'Inscreva-se na sessão 2',
            horario: 'Das 14h às 18hs'
          }
        ]
      },
      {
        id: 'sao-paulo',
        cidade: 'São Paulo',
        data: '17 de março de 2025',
        local: {
          nome: 'Local a definir',
          endereco: 'Endereço a definir'
        },
        sessoes: [
          {
            id: 'sessao-1',
            nome: 'Inscreva-se na sessão 1',
            horario: 'Das 09h às 13hs'
          },
          {
            id: 'sessao-2',
            nome: 'Inscreva-se na sessão 2',
            horario: 'Das 14h às 18hs'
          }
        ]
      },
      {
        id: 'belo-horizonte',
        cidade: 'Belo Horizonte',
        data: '24 de março de 2025',
        local: {
          nome: 'Local a definir',
          endereco: 'Endereço a definir'
        },
        sessoes: [
          {
            id: 'sessao-1',
            nome: 'Inscreva-se na sessão 1',
            horario: 'Das 09h às 13hs'
          },
          {
            id: 'sessao-2',
            nome: 'Inscreva-se na sessão 2',
            horario: 'Das 14h às 18hs'
          }
        ]
      },
      {
        id: 'brasilia',
        cidade: 'Brasília',
        data: '31 de março de 2025',
        local: {
          nome: 'Local a definir',
          endereco: 'Endereço a definir'
        },
        sessoes: [
          {
            id: 'sessao-1',
            nome: 'Inscreva-se na sessão 1',
            horario: 'Das 09h às 13hs'
          },
          {
            id: 'sessao-2',
            nome: 'Inscreva-se na sessão 2',
            horario: 'Das 14h às 18hs'
          }
        ]
      },
      {
        id: 'curitiba',
        cidade: 'Curitiba',
        data: '7 de abril de 2025',
        local: {
          nome: 'Local a definir',
          endereco: 'Endereço a definir'
        },
        sessoes: [
          {
            id: 'sessao-1',
            nome: 'Inscreva-se na sessão 1',
            horario: 'Das 09h às 13hs'
          },
          {
            id: 'sessao-2',
            nome: 'Inscreva-se na sessão 2',
            horario: 'Das 14h às 18hs'
          }
        ]
      },
      {
        id: 'porto-alegre',
        cidade: 'Porto Alegre',
        data: '14 de abril de 2025',
        local: {
          nome: 'Local a definir',
          endereco: 'Endereço a definir'
        },
        sessoes: [
          {
            id: 'sessao-1',
            nome: 'Inscreva-se na sessão 1',
            horario: 'Das 09h às 13hs'
          },
          {
            id: 'sessao-2',
            nome: 'Inscreva-se na sessão 2',
            horario: 'Das 14h às 18hs'
          }
        ]
      }
    ]
  },

  // ========== O QUE É ROBLOX STUDIO ==========
  robloxStudio: {
    title: 'O que é o Roblox Studios',
    description: [
      'Roblox Studio é a ferramenta de criação que permite construir qualquer coisa que você possa imaginar.',
      'Nossa missão é potencializar a imaginação de milhões de pessoas ao redor do mundo.',
    ],
  },

  // ========== QUER CRIAR ==========
  querCriar: {
    title: {
      line1: 'Quer criar',
      line2: 'com a gente?',
    },
    subtitle: 'Desce pro play.',
  },

  // ========== FOOTER ==========
  footer: {
    cta: {
      title: 'É pai, tutor ou responsável?',
      text: 'Temos um material pra você.',
      links: {
        download: 'baixar',
        video: 'assista o vídeo',
      },
    },
    centralExpedicao: {
      title: 'Central da Expedição',
      links: [
        { text: 'Converse com a Mastertech', action: 'contact' },
        { text: 'Perguntas frequentes', action: 'faq' },
      ],
      separator: true,
      callsTitle: 'Escolha uma das trilhas',
      trilhas: [
        {
          id: 'trilha-01',
          label: 'TRILHA 01',
          title: 'Aprenda Roblox Studio do zero em nossas trilhas de conteúdos',
          description: 'As trilhas misturam curso online, desafios mensais e eventos ao vivo pra transformar tempo de tela em portfólio, segurança digital e histórias que você assina com seu nome.',
          action: 'contact',
        },
        {
          id: 'trilha-02',
          label: 'TRILHA 02',
          title: 'Inscreva-se numa jam e crie experiências jogáveis de verdade;',
          description: 'Participe de Game Jams onde você desenvolve experiências completas em 72 horas, trabalhando em equipe e criando projetos reais para o Roblox.',
          action: 'jam',
        },
        {
          id: 'trilha-03',
          label: 'TRILHA 03',
          title: 'Participe da imersão presencial em um evento na sua capital.',
          description: 'Consulte em breve o calendário do Expedição Roblox na Estrada para eventos presenciais na sua cidade.',
          action: 'contact',
        },
      ],
    },
    final: {
      text: 'Expedição Roblox é um projeto da Mastertech junto com o Roblox',
      social: [
        { name: 'Instagram', url: '#' },
        { name: 'WhatsApp', url: '#' },
        { name: 'TikTok', url: '#' },
      ],
    },
  },

  // ========== CONVIDE SEUS AMIGOS ==========
  convideAmigos: {
    title: 'Convide seus amigos',
    description: [
      'A cada 3 amigos indicados que se inscrevam em alguma ação da expedição,',
      'você ganha acesso a eventos exclusivos como mentoria com especialistas sobre criação no Roblox.',
    ],
    form: {
      emailLabel: 'Email do amigo',
      button: 'Enviar convite',
      thankYou: {
        title: 'Obrigado!',
        message: 'Seu convite foi enviado com sucesso.',
      },
    },
  },

  // ========== GLOSSÁRIO ==========
  glossario: {
    title: 'Glossário',
    subtitle: 'Dicionário das expressões da Expedição Roblox',
    termos: [
      {
        termo: 'Age-check',
        descricao: 'Verificação de idade na plataforma Roblox que determina a faixa etária do usuário e as funcionalidades disponíveis.',
      },
      {
        termo: 'Assets',
        descricao: 'Recursos utilizados na criação, como modelos 3D, imagens, sons e outros elementos que compõem uma experiência.',
      },
      {
        termo: 'Co-criação',
        descricao: 'Processo de criação colaborativa em equipe, onde múltiplos desenvolvedores trabalham juntos no mesmo projeto.',
      },
      {
        termo: 'Copyright',
        descricao: 'Direitos autorais sobre conteúdo criativo. É importante respeitar os direitos de uso de materiais de terceiros.',
      },
      {
        termo: 'Criação assistida por IA',
        descricao: 'Uso de inteligência artificial para auxiliar no processo de criação, gerando imagens, sons ou textos.',
      },
      {
        termo: 'Depuração',
        descricao: 'Processo de encontrar e corrigir erros (bugs) no código ou na experiência criada.',
      },
      {
        termo: 'DM (Direct Message)',
        descricao: 'Mensagem direta privada entre usuários. Durante a Jam, DMs são desativadas para maior segurança.',
      },
      {
        termo: 'Expedição Roblox',
        descricao: 'Projeto educacional que conecta trilhas de aprendizado, Game Jams e encontros presenciais para ensinar criação no Roblox.',
      },
      {
        termo: 'Expedição Roblox na Estrada',
        descricao: 'Eventos presenciais realizados em diferentes capitais brasileiras como parte da Expedição Roblox.',
      },
      {
        termo: 'Experiência',
        descricao: 'Termo usado no Roblox para se referir a jogos ou mundos criados na plataforma (não se usa "jogo").',
      },
      {
        termo: 'Faixa etária',
        descricao: 'Categoria de idade do usuário no Roblox (13-15, 16-17, 18+), que determina com quem pode interagir.',
      },
      {
        termo: 'Free to Use',
        descricao: 'Recursos que podem ser usados gratuitamente, geralmente encontrados no Roblox Toolbox com licença apropriada.',
      },
      {
        termo: 'Game Jam',
        descricao: 'Evento de criação intensiva de jogos em tempo limitado, onde equipes desenvolvem experiências completas em 72 horas.',
      },
      {
        termo: 'Imersão presencial',
        descricao: 'Evento físico presencial onde participantes se encontram pessoalmente para atividades práticas.',
      },
      {
        termo: 'Jam',
        descricao: 'Abreviação de Game Jam, evento de criação de experiências em tempo limitado.',
      },
      {
        termo: 'Logs',
        descricao: 'Registros de conversas e atividades mantidos para garantir segurança e transparência nos canais oficiais.',
      },
      {
        termo: 'Moderado',
        descricao: 'Ambiente supervisionado por moderadores que garantem que as regras sejam seguidas e o ambiente seja seguro.',
      },
      {
        termo: 'Narrativa',
        descricao: 'História contada pela experiência, incluindo personagens, enredo e elementos que envolvem o jogador.',
      },
      {
        termo: 'Padrões da Comunidade',
        descricao: 'Normas de comportamento estabelecidas pela plataforma Roblox que todos os usuários devem seguir.',
      },
      {
        termo: 'Plugins',
        descricao: 'Extensões do Roblox Studio que adicionam funcionalidades extras para facilitar a criação.',
      },
      {
        termo: 'Portfólio',
        descricao: 'Conjunto de projetos criados que demonstram as habilidades e o trabalho desenvolvido pelo criador.',
      },
      {
        termo: 'Protótipo',
        descricao: 'Versão inicial funcional de uma experiência que demonstra a ideia principal e permite interação básica.',
      },
      {
        termo: 'Public',
        descricao: 'Experiência publicada no Roblox que é visível publicamente e pode ser encontrada por qualquer usuário.',
      },
      {
        termo: 'Redistribuição',
        descricao: 'Compartilhamento de assets criados por outros. É importante verificar se o material permite redistribuição.',
      },
      {
        termo: 'Roblox',
        descricao: 'Plataforma online de jogos e criação onde usuários podem criar, compartilhar e jogar experiências desenvolvidas por outros usuários.',
      },
      {
        termo: 'Roblox Studio',
        descricao: 'Ferramenta de criação oficial do Roblox que permite construir qualquer tipo de experiência, desde jogos simples até mundos complexos.',
      },
      {
        termo: 'Scripts',
        descricao: 'Código de programação que controla comportamentos, interações e funcionalidades dentro de uma experiência no Roblox.',
      },
      {
        termo: 'Segurança digital',
        descricao: 'Práticas e conhecimentos para manter-se seguro no ambiente online, protegendo informações pessoais e evitando riscos.',
      },
      {
        termo: 'Submissão',
        descricao: 'Entrega oficial do projeto criado através do formulário da Jam, incluindo link, descrição e responsabilidades da equipe.',
      },
      {
        termo: 'Termos de Uso do Roblox',
        descricao: 'Regras e diretrizes estabelecidas pela plataforma Roblox que todos os usuários devem seguir ao usar a plataforma.',
      },
      {
        termo: 'Tempo de tela',
        descricao: 'Tempo gasto em frente a telas e dispositivos. A Expedição transforma esse tempo em aprendizado produtivo.',
      },
      {
        termo: 'Toolbox',
        descricao: 'Biblioteca de recursos do Roblox Studio que contém modelos, sons e scripts prontos que podem ser usados gratuitamente.',
      },
      {
        termo: 'Trilha',
        descricao: 'Caminho de aprendizado organizado por níveis de dificuldade, incluindo Mochilão (iniciante), Acampamento (intermediário) e Sobrevivência (avançado).',
      },
      {
        termo: 'Trusted Connection',
        descricao: 'Vínculo seguro entre duas contas Roblox que informa à plataforma que essas pessoas se conhecem na vida real, permitindo interação mesmo entre faixas etárias diferentes.',
      },
      {
        termo: 'Unlisted',
        descricao: 'Experiência publicada no Roblox que não aparece nas buscas públicas, sendo acessível apenas através de link direto.',
      },
      {
        termo: 'Username',
        descricao: 'Nome de usuário único na plataforma Roblox, usado para identificação e login na conta.',
      },
      {
        termo: '72 horas',
        descricao: 'Período padrão de duração de uma Game Jam, durante o qual as equipes desenvolvem suas experiências do zero.',
      },
    ],
  },

  // ========== FORMULÁRIOS ==========
  forms: {
    contact: {
      title: 'Receba as novidades em primeira mão',
      fields: {
        nome: { label: 'Nome', placeholder: 'Seu nome', required: true },
        email: { label: 'Email', placeholder: 'Seu email', required: true },
        idade: { label: 'Idade', placeholder: 'Sua idade', required: true },
        emailResponsavel: { label: 'Email do responsável', placeholder: 'responsavel@email.com', required: true },
      },
      submit: 'Enviar',
      success: 'Obrigado! Entraremos em contato em breve.',
    },
    contactPopup: {
      title: 'Fale com a Mastertech',
      whatsapp: {
        label: 'Contato por WhatsApp',
        number: '+5511998901551',
      },
      form: {
        fields: {
          nome: { label: 'Nome', placeholder: 'Seu nome', required: true },
          email: { label: 'Email', placeholder: 'Seu email', required: true },
          assunto: {
            label: 'Assunto',
            placeholder: 'Selecione um assunto',
            options: [
              'Mochilão',
              'Acampamento',
              'Sobrevivência',
              'Outros',
            ],
            required: true,
          },
          mensagem: { label: 'Mensagem', placeholder: 'Sua mensagem', required: true },
        },
        submit: 'Enviar',
      },
    },
    emailGate: {
      existing: {
        title: 'Área Especial para Membros',
        description: 'Você está entrando em uma área especial para membros da Expedição Roblox.\nConfirme seu email para continuar.',
        button: 'Confirmar e Acessar',
      },
      new: {
        title: 'Ainda não faz parte da Expedição?',
        description: 'Faça seu cadastro para acessar nossa biblioteca completa de conteúdos.',
        button: 'Cadastrar e Acessar',
      },
      fields: {
        nome: { placeholder: 'Seu nome', required: true },
        email: { placeholder: 'Seu email', required: true },
      },
    },
  },

  // ========== BIBLIOTECA ==========
  biblioteca: {
    sections: {
      tutorial: {
        label: 'CONTEÚDOS',
        title: 'Tutorial Roblox Studios',
        color: 'rgb(255, 194, 231)',
      },
      mochilao: {
        label: 'CONTEÚDOS',
        title: 'Mochilão',
        color: 'rgb(83, 0, 255)',
      },
      acampamento: {
        label: 'CONTEÚDOS',
        title: 'Acampamento',
        color: 'rgb(255, 61, 0)',
      },
      sobrevivencia: {
        label: 'CONTEÚDOS',
        title: 'Sobrevivência',
        color: 'rgb(216, 243, 31)',
      },
    },
  },

  // ========== JAM PAGE ==========
  jam: {
    hero: {
      title: 'Roblox Creator Jam',
      subtitle: 'Crie, compartilhe e ganhe prêmios',
    },
  },

  // ========== FAQ ==========
  faq: {
    title: 'Perguntas frequentes',
    message: 'Em breve',
  },

  // ========== ESPAÇAMENTOS E LAYOUT ==========
  spacing: {
    sectionPadding: {
      mobile: '2.1rem 1.5rem',
      tablet: '2.6rem 2rem',
      desktop: '3.1rem 2rem',
    },
    heroPadding: {
      mobile: '0.25rem 1.5rem',
      tablet: '0.5rem 2rem',
      desktop: '1rem 2rem',
    },
  },

  // ========== IMAGENS ==========
  images: {
    homeHero: '/images/4.webp',
    bibliotecaHero: '/images/2.webp',
    jamHero: '/images/6.webp',
    expedicaoEstrada: '/images/5.webp',
  },
}

// Função helper para obter valores responsivos
export const getResponsiveValue = (obj, breakpoint = 'mobile') => {
  if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
    return obj[breakpoint] || obj.mobile || obj
  }
  return obj
}

// Função helper para obter cor
export const getColor = (colorPath) => {
  const keys = colorPath.split('.')
  let value = siteConfig.colors
  for (const key of keys) {
    value = value?.[key]
  }
  return value || colorPath
}

