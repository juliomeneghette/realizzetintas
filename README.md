# Pintores Parceiros - Realizze Tintas

Um sistema completo de fidelidade para pintores com dashboard administrativo e portal do pintor, integrado ao Supabase.

## 🚀 Início Rápido

### 1. Clonar o Repositório

```bash
git clone <seu-repositorio>
cd pintores-parceiros-app
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` e adicione suas credenciais do Supabase:

```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-aqui
```

### 4. Executar Localmente

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`.

### 5. Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão na pasta `dist/`.

## 🔧 Configuração do Supabase

Consulte o arquivo `supabase_setup_guide.md` para instruções completas sobre:

- Criar um novo projeto no Supabase
- Obter as credenciais necessárias
- Criar as tabelas do banco de dados
- Configurar as políticas de Row Level Security (RLS)
- Inserir dados iniciais

## 📋 Credenciais de Teste

### Admin
- **Usuário:** `admin`
- **Senha:** `realizze2024`

### Pintor (após configurar o Supabase)
- **CPF:** `123.456.789-00` (ou outro CPF inserido no banco)
- **Senha:** `1234`

## 🏗️ Estrutura do Projeto

```
pintores-parceiros-app/
├── src/
│   ├── App.jsx          # Componente principal
│   └── main.jsx         # Ponto de entrada
├── index.html           # HTML principal
├── vite.config.js       # Configuração do Vite
├── package.json         # Dependências
├── .env.example         # Template de variáveis de ambiente
└── README.md            # Este arquivo
```

## 🎨 Funcionalidades

### Painel Administrativo
- **Dashboard:** Visão geral com estatísticas
- **Gestão de Pintores:** Adicionar, ativar/desativar pintores
- **Lançamentos:** Registrar vendas e indicações
- **Metas:** Editar metas mensais
- **Recompensas:** Gerenciar catálogo de recompensas
- **Parâmetros:** Configurar regras de pontuação

### Portal do Pintor
- **Início:** Visão geral de pontos e estatísticas
- **Meus Pontos:** Saldo e próximas recompensas
- **Resgatar:** Solicitar recompensas
- **Histórico:** Movimentações de pontos

## 📦 Dependências

- **React 18.2.0:** Biblioteca de UI
- **Vite 5.0.2:** Build tool
- **@supabase/supabase-js 2.38.0:** Cliente Supabase

## 🚀 Deploy no Netlify

1. Faça push do código para um repositório GitHub
2. Conecte o repositório ao Netlify
3. Configure as variáveis de ambiente no Netlify:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Configure o comando de build: `npm run build`
5. Configure o diretório de publicação: `dist`

## 📝 Notas Importantes

- O login de admin é fixo (não requer banco de dados)
- O login de pintor busca os dados no Supabase
- Todas as operações requerem conexão com o Supabase
- As políticas de RLS garantem a segurança dos dados

## 🤝 Suporte

Para dúvidas ou problemas, consulte a documentação do Supabase em https://supabase.com/docs
