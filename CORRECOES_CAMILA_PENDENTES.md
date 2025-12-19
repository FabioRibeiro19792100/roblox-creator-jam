# Correções da Camila no Main que não estão no CorrectionBranch

## Commits da Camila identificados:
- `f643b03` - Update ExpedicaoInscricaoForm.jsx (15/12/2025)
- `b60a4d5` - Update EventosNaEstradaSection.jsx (15/12/2025)
- `df4862e` - Mudancas Camila (16/12/2025)
- `5799369` - Merge e textos Camila

---

## 1. ExpedicaoInscricaoForm.jsx (commit f643b03)

### Mudanças de texto:
- ❌ **Pendente**: Título do passo 2
  - **Main**: "Informe seu username e verifique sua idade"
  - **CorrectionBranch**: Provavelmente ainda tem "alias" no texto

- ❌ **Pendente**: Label do campo Roblox
  - **Main**: "@ no Roblox"
  - **CorrectionBranch**: "Username do Roblox" (verificado - está diferente)

### Observação:
O correctionBranch já tem uma versão simplificada do formulário (sem o passo 2 de verificação de idade), mas o texto do label pode estar diferente.

---

## 2. EventosNaEstradaSection.jsx (commit b60a4d5)

### Mudanças estruturais:
- ✅ **Já aplicado**: Simplificação dos cards de eventos
- ✅ **Já aplicado**: Remoção de sessões e endereços
- ✅ **Já aplicado**: "Local a definir" para todos os eventos
- ✅ **Já aplicado**: Botão único "Deixar nome na lista"

### Status: Parece que já foi aplicado no correctionBranch

---

## 3. ExpedicaoRobloxSection.jsx (commit df4862e)

### Mudanças de texto:
- ❌ **Pendente**: Texto do heading da trilha 01
  - **Main**: "O que essa trilha entrega"
  - **CorrectionBranch**: Provavelmente ainda tem "O que as trilhas entregam"

- ❌ **Pendente**: Descrição da trilha 01
  - **Main**: "Baixe o plugin exclusivo da Mastertech para fazer suas primeiras criações e aprender de um jeito diferente. Além disso consuma conteúdos conceituais e práticos para que você possa compreender mais sobre o universo de criações digitais e Roblox."
  - **CorrectionBranch**: Pode ter texto diferente

### Observação:
O correctionBranch pode ter removido esse heading completamente (h3), então essa mudança pode não se aplicar.

---

## 4. Header.jsx (commit df4862e)

### Mudanças de navegação:
- ✅ **Já aplicado (via siteConfig)**: "Missões" → "Trilhas"
- ✅ **Já aplicado (via siteConfig)**: "Trilhas de conteúdo" → "Aprendizado"
- ✅ **Já aplicado (via siteConfig)**: "Jam" → "Prática"
- ✅ **Já aplicado (via siteConfig)**: "Estrada" → "Vivência"

### Status: Parece que já foi aplicado via siteConfig no correctionBranch

---

## 5. Outros arquivos do commit df4862e

### Arquivos modificados que precisam verificação:
- `src/App.jsx` - Mudanças não identificadas
- `src/components/FooterSection.css` - Mudanças não identificadas
- `src/components/FooterSection.jsx` - Mudanças não identificadas
- `src/components/HeroSection.jsx` - Mudanças não identificadas
- `src/components/OQueERobloxStudioSection.css` - Mudanças não identificadas
- `src/components/OQueERobloxStudioSection.jsx` - Mudanças não identificadas
- `src/components/TrilhasSection.jsx` - Mudanças não identificadas
- `src/pages/Home.jsx` - Mudanças não identificadas
- `src/pages/Jam.jsx` - Mudanças não identificadas

---

## Resumo das Pendências

### Prioridade Alta:
1. **ExpedicaoInscricaoForm.jsx**: Verificar se o label está como "@ no Roblox" (commit f643b03)
2. **ExpedicaoRobloxSection.jsx**: Verificar se o heading e descrição da trilha 01 estão atualizados (commit df4862e)

### Prioridade Média:
3. Verificar mudanças nos outros arquivos do commit df4862e que não foram analisados

### Já Aplicado:
- ✅ EventosNaEstradaSection.jsx (simplificação dos cards)
- ✅ Header.jsx (nomes das trilhas via siteConfig)

---

## Como verificar:

```bash
# Ver diferenças específicas
git diff main correctionBranch -- src/components/ExpedicaoInscricaoForm.jsx
git diff main correctionBranch -- src/components/ExpedicaoRobloxSection.jsx

# Ver mudanças da Camila no main
git show f643b03
git show b60a4d5
git show df4862e
```

