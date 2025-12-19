# 🔐 Como Acessar o Painel Admin

## 📍 URL de Acesso

Para acessar o painel de administração, adicione `#admin` na URL:

```
http://localhost:5173/#admin
```

ou em produção:

```
https://seusite.com/#admin
```

## 🎯 O que você pode fazer

No painel admin você pode editar:

- ✅ **Hero**: Títulos, descrições e textos da página inicial
- ✅ **Menu**: Itens de navegação e call-to-action
- ✅ **Cores**: Todas as cores do site (com seletor visual)
- ✅ **Fontes**: Tamanhos de fonte responsivos
- ✅ **Footer**: Textos e trilhas
- ✅ **Formulários**: Títulos e textos dos formulários
- ✅ **Expedição**: Textos da seção Expedição Roblox
- ✅ **Manifesto**: Todo o conteúdo do manifesto

## 💾 Salvando Alterações

1. Faça suas alterações nos campos
2. Clique em **"💾 Salvar Alterações"**
3. As alterações são salvas no `localStorage` do navegador
4. Para restaurar as configurações originais, clique em **"🔄 Restaurar Original"**

## ⚠️ Importante

- As alterações são salvas apenas no navegador (`localStorage`)
- Para salvar permanentemente no arquivo `siteConfig.js`, será necessário implementar um backend
- Por enquanto, as alterações são temporárias e serão perdidas se você limpar o cache do navegador

## 🔄 Próximos Passos

Para salvar permanentemente:
1. Implementar um backend (Node.js, Python, etc.)
2. Criar uma API para salvar no arquivo `siteConfig.js`
3. Ou migrar para um Headless CMS (Strapi, Sanity, etc.)







