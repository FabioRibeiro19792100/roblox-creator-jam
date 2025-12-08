class AnimatorManager {
  static instance = null;

  constructor() {
    if (AnimatorManager.instance) {
      return AnimatorManager.instance;
    }
    
    this.elements = new Map(); // Armazena referências DOM: id -> element
    this.animations = new Map(); // Armazena animações ativas: id -> Animation
    this.observers = new Set(); // Assinantes de eventos
    this.defaults = {
      duration: 500,
      easing: 'ease-out',
      fill: 'forwards'
    };

    AnimatorManager.instance = this;
  }

  static getInstance() {
    if (!AnimatorManager.instance) {
      AnimatorManager.instance = new AnimatorManager();
    }
    return AnimatorManager.instance;
  }

  /**
   * Registra um elemento DOM para ser animado futuramente.
   * @param {string} id - Identificador único do elemento
   * @param {HTMLElement} element - Referência ao elemento DOM
   */
  register(id, element) {
    if (!element) {
      console.warn(`AnimatorManager: Tentativa de registrar elemento nulo para id "${id}"`);
      return;
    }
    this.elements.set(id, element);
    // console.log(`AnimatorManager: Elemento "${id}" registrado.`);
  }

  /**
   * Remove um elemento do registro.
   * @param {string} id 
   */
  unregister(id) {
    if (this.elements.has(id)) {
      this.elements.delete(id);
      // Cancela animações ativas deste elemento se necessário
      if (this.animations.has(id)) {
        this.animations.get(id).cancel();
        this.animations.delete(id);
      }
    }
  }

  /**
   * Anima um elemento registrado.
   * @param {string} id - ID do elemento registrado
   * @param {Keyframe[] | PropertyIndexedKeyframes} keyframes - Keyframes da animação (padrão WAAPI)
   * @param {number | KeyframeAnimationOptions} options - Opções de tempo (duração, easing, etc)
   * @returns {Animation | null} Objeto Animation ou null se falhar
   */
  animate(id, keyframes, options = {}) {
    const element = this.elements.get(id);
    if (!element) {
      console.warn(`AnimatorManager: Elemento "${id}" não encontrado.`);
      return null;
    }

    // Mescla opções com defaults
    const animationOptions = {
      ...this.defaults,
      ...(typeof options === 'number' ? { duration: options } : options)
    };

    try {
      const animation = element.animate(keyframes, animationOptions);
      
      this.animations.set(id, animation);
      
      animation.onfinish = () => {
        this.notify('finish', { id, animation });
        this.animations.delete(id);
      };
      
      animation.oncancel = () => {
        this.notify('cancel', { id, animation });
        this.animations.delete(id);
      };

      this.notify('start', { id, animation, options: animationOptions });
      
      return animation;
    } catch (error) {
      console.error(`AnimatorManager: Erro ao animar "${id}"`, error);
      return null;
    }
  }

  /**
   * Executa uma sequência de animações.
   * @param {Array<{id: string, keyframes: any, options: any, delay?: number, offset?: number}>} sequence 
   * @returns {Promise<void>}
   */
  async playSequence(sequence) {
    this.notify('sequence_start', { sequence });

    // Simples implementação sequencial (um após o outro)
    // Para implementações mais complexas (timeline), poderíamos usar promises paralelas com delays.
    
    for (const step of sequence) {
      const { id, keyframes, options, delay = 0 } = step;
      
      if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }

      const animation = this.animate(id, keyframes, options);
      
      if (animation) {
        await animation.finished;
      }
    }

    this.notify('sequence_finish', { sequence });
  }

  /**
   * Observer Pattern: Adiciona um observador
   * @param {Function} callback 
   */
  subscribe(callback) {
    this.observers.add(callback);
    return () => this.observers.delete(callback);
  }

  /**
   * Notifica todos os observadores
   * @param {string} event 
   * @param {any} data 
   */
  notify(event, data) {
    this.observers.forEach(observer => observer(event, data));
  }

  /**
   * Utilitário para parar todas as animações
   */
  stopAll() {
    this.animations.forEach(anim => anim.cancel());
    this.animations.clear();
  }
  
  /**
   * Retorna a instância do elemento (útil para debug ou manipulação direta)
   */
  getElement(id) {
    return this.elements.get(id);
  }
}

export default AnimatorManager;





