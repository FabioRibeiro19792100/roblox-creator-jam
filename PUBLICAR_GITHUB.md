# 📤 Como Publicar no GitHub

## Passo 1: Criar o repositório no GitHub

1. Acesse https://github.com e faça login
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Preencha:
   - **Repository name**: `roblox-creator-jam` (ou outro nome de sua escolha)
   - **Description**: (opcional) "Landing page para Roblox Creator Jam"
   - Escolha **Public** ou **Private**
   - ⚠️ **NÃO marque** nenhuma opção (README, .gitignore, license)
5. Clique em **"Create repository"**

## Passo 2: Conectar e enviar o código

Depois de criar o repositório, o GitHub mostrará uma página com instruções.

**Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub e execute:**

```bash
git remote add origin https://github.com/SEU_USUARIO/roblox-creator-jam.git
git branch -M main
git push -u origin main
```

**Exemplo:** Se seu usuário for `fabioribeiro`, os comandos seriam:

```bash
git remote add origin https://github.com/fabioribeiro/roblox-creator-jam.git
git branch -M main
git push -u origin main
```

## ✅ Pronto!

Seu projeto estará disponível em: `https://github.com/SEU_USUARIO/roblox-creator-jam`

## 🔐 Se pedir autenticação

Se o GitHub pedir usuário e senha:
- **Usuário**: seu nome de usuário do GitHub
- **Senha**: use um **Personal Access Token** (não sua senha normal)

Para criar um token:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token
3. Marque a opção `repo`
4. Copie o token gerado e use como senha










