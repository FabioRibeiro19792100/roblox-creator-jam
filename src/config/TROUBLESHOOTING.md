# 🔧 Troubleshooting - Painel Admin

## Problema: Não consegue carregar o painel admin

### 1. Verifique a URL
Certifique-se de que está acessando:
```
http://localhost:5173/#admin
```

### 2. Verifique o Console do Navegador
Abra o DevTools (F12) e verifique se há erros no console.

### 3. Verifique se o siteConfig está sendo importado
No console do navegador, digite:
```javascript
import { siteConfig } from './config/siteConfig'
```

### 4. Limpe o localStorage
Se houver dados corrompidos no localStorage:
```javascript
localStorage.removeItem('siteConfig')
location.reload()
```

### 5. Verifique se o servidor está rodando
Certifique-se de que o servidor de desenvolvimento está ativo:
```bash
npm run dev
```

### 6. Erros Comuns

#### Erro: "Cannot read property of undefined"
- **Causa**: O siteConfig pode não estar sendo importado corretamente
- **Solução**: Verifique se o arquivo `src/config/siteConfig.js` existe e está exportando corretamente

#### Erro: "Maximum call stack size exceeded"
- **Causa**: Loop infinito no useEffect
- **Solução**: Já foi corrigido com setTimeout no código

#### Erro: "localStorage quota exceeded"
- **Causa**: O objeto config é muito grande
- **Solução**: O código agora tem tratamento de erro para isso

### 7. Teste Simples
Para testar se o problema é com o siteConfig, tente acessar diretamente:
```javascript
// No console do navegador
console.log(siteConfig)
```

Se isso funcionar, o problema pode ser no componente Admin.

### 8. Recarregar a Página
Às vezes um simples reload resolve:
- Pressione `Ctrl+R` (Windows/Linux) ou `Cmd+R` (Mac)
- Ou `Ctrl+Shift+R` para hard reload

### 9. Verificar Versão do Node
Certifique-se de que está usando Node.js 16 ou superior:
```bash
node --version
```

### 10. Reinstalar Dependências
Se nada funcionar, tente:
```bash
rm -rf node_modules
npm install
npm run dev
```






