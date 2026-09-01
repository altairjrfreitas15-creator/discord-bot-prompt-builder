# Discord Bot Prompt Builder 🚀

**Discord Bot Prompt Builder** é uma aplicação web moderna e profissional que permite criar especificações detalhadas para bots Discord de forma visual e intuitiva.

## ✨ Características

- 🎨 **Interface SaaS Moderna** - Dark mode, gradientes, animações suaves
- 🤖 **Gerador de Prompts** - Cria especificações técnicas completas para IAs
- 📦 **Construtor Visual** - Configure seu bot sem escrever código
- 💾 **Persistência de Dados** - Salve e edite projetos a qualquer momento
- 🎯 **Múltiplos Tipos de Bots** - Lojas, Marketplaces, Suporte, e mais
- 📊 **Dashboard Completo** - Veja estatísticas e projetos recentes
- 🔄 **Sistema de Versões** - Mantenha histórico de alterações
- 📱 **Responsivo** - Funciona em desktop, tablet e celular
- ✅ **TypeScript** - Type-safe em toda a aplicação
- 🎭 **Temas Personalizáveis** - Dark, Neon, Minimal, Gaming, Professional

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Estilização**: Tailwind CSS
- **State Management**: Zustand
- **Roteamento**: React Router v6
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Data Validation**: Zod + React Hook Form
- **Animations**: Framer Motion
- **Database Visualization**: Recharts

## 📦 Instalação

### Pré-requisitos
- Node.js v18+
- npm ou yarn

### Passos

```bash
# 1. Clonar o repositório
git clone https://github.com/seu-usuario/discord-bot-prompt-builder.git
cd discord-bot-prompt-builder

# 2. Instalar dependências
npm install

# 3. Configurar variáveis de ambiente
cp .env.example .env

# 4. Iniciar servidor de desenvolvimento
npm run dev
```

A aplicação abrirá em `http://localhost:5173`

## 🚀 Como Usar

### 1. **Dashboard**
Acesse a página inicial para ver seus projetos e estatísticas.

### 2. **Criar Novo Bot**
Clique em "+ CRIAR NOVO BOT" e preencha:
- Nome do projeto
- Nome do bot
- Tipo de servidor
- Idioma e moeda

### 3. **Configurar Funcionalidades**
Siga o assistente de 12 etapas:
1. Informações
2. Loja
3. Produtos
4. Pedidos
5. Pagamentos
6. Estoque
7. Tickets
8. Administração
9. Visual
10. Segurança
11. Revisão
12. Gerar Prompt

### 4. **Gerar Prompt**
Ao final, o sistema gera uma especificação técnica completa que pode ser:
- Copiada para a área de transferência
- Exportada como TXT ou Markdown
- Editada antes de usar
- Regenerada com melhorias

### 5. **Usar o Prompt**
Forneça o prompt gerado a uma IA de programação (ChatGPT, Claude, etc.) para criar seu bot Discord!

## 📋 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── Sidebar.tsx
│   ├── Toast.tsx
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── TextArea.tsx
│   ├── ProgressBar.tsx
│   ├── Badge.tsx
│   ├── Tabs.tsx
│   ├── EmptyState.tsx
│   ├── ProductBuilder.tsx
│   └── index.ts
├── pages/               # Páginas da aplicação
│   ├── Dashboard.tsx
│   ├── NewBot.tsx
│   ├── Generator.tsx
│   ├── Products.tsx
│   ├── Sales.tsx
│   ├── Payments.tsx
│   ├── Tickets.tsx
│   ├── BotDashboard.tsx
│   ├── Settings.tsx
│   ├── Templates.tsx
│   ├── Projects.tsx
│   └── Docs.tsx
├── store/               # Zustand stores
│   ├── projectStore.ts
│   └── uiStore.ts
├── types/               # TypeScript interfaces
│   └── index.ts
├── utils/               # Utilitários
│   ├── promptGenerator.ts
│   ├── validators.ts
│   ├── formatters.ts
│   ├── helpers.ts
│   └── index.ts
├── App.tsx              # Componente raiz
├── main.tsx             # Entry point
└── index.css            # Estilos globais
```

## 🎨 Personalização

### Temas
O aplicativo suporta múltiplos temas:
- **Dark** (padrão) - Tema escuro profissional
- **Neon** - Cores vibrantes
- **Minimal** - Simples e limpo
- **Gaming** - Tema gamer
- **Professional** - Corporativo

### Cores Personalizáveis
Edite `tailwind.config.js` para ajustar:
- Cores primárias
- Cores secundárias
- Paleta de dark mode

## 📝 Variáveis de Ambiente

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Discord Bot Prompt Builder
VITE_APP_VERSION=1.0.0
```

## 🔄 Fluxo de Desenvolvimento

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Pré-visualizar build
npm run preview

# Linting
npm run lint

# Formatação de código
npm run format
```

## 🧠 Gerador de Prompt

O coração da aplicação! O gerador analisa todas as configurações e cria um prompt estruturado com:

- **Identidade do Projeto** - Nome, tipo, idioma
- **Objetivo** - O que o bot deve fazer
- **Funcionalidades** - Loja, carrinho, pedidos, pagamentos, etc
- **Tecnologias** - Stack recomendado
- **Arquitetura** - Estrutura do projeto
- **Banco de Dados** - Tabelas necessárias
- **Comandos** - Lista de slash commands
- **Integração de Pagamentos** - Como processar pagamentos
- **Sistema de Logs** - Rastreamento de operações
- **Segurança** - Validações e proteções
- **Instruções de Instalação** - Passo a passo

O prompt resultante é **extremamente detalhado**, não uma simples descrição.

## 🔐 Segurança

- ✅ Validação de todas as entradas
- ✅ Sem dados sensíveis no código-fonte
- ✅ Variáveis de ambiente para chaves
- ✅ Type-safe com TypeScript strict
- ✅ Sanitização de strings
- ✅ Proteção contra injeção

## 🐛 Troubleshooting

### Porta 5173 já está em uso
```bash
# Usar porta diferente
npm run dev -- --port 3000
```

### Limpando cache
```bash
# Deletar node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Problema com Tailwind CSS
```bash
# Rebuildar Tailwind
npm run dev
```

## 📚 Recursos Adicionais

- [Discord.js Documentation](https://discord.js.org/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Vite Guide](https://vitejs.dev/)

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👨‍💻 Autor

Criado por [Seu Nome](https://github.com/seu-usuario)

## 🙏 Agradecimentos

- Discord.js community
- React team
- Tailwind CSS team
- Todos que contribuem com feedback

## 📞 Suporte

Tem dúvidas? Abra uma issue no GitHub ou entre em contato através de:
- Email: seu-email@example.com
- Discord: seu#1234

---

**Made with ❤️ for the Discord community**
