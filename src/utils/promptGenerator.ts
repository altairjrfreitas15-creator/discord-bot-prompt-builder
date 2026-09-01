import { BotProject } from '@/types'

export function generatePrompt(project: BotProject): string {
  const { name, botName, storeName, config, currency, language, serverType } = project

  const sections = []

  // IDENTIDADE DO PROJETO
  sections.push(`## IDENTIDADE DO PROJETO

Nome do Projeto: ${name}
Nome do Bot: ${botName}
Nome da Loja: ${storeName}
Tipo de Servidor: ${serverType}
Idioma: ${language === 'pt-BR' ? 'Português (Brasil)' : language}
Moeda: ${currency}
Versão: ${project.version}`)

  // OBJETIVO
  sections.push(`## OBJETIVO

Desenvolver um bot Discord completo para gerenciamento de loja virtual. O bot deve:
- Gerenciar um catálogo de produtos
- Processar pedidos de forma segura
- Integrar com sistemas de pagamento
- Controlar estoque em tempo real
- Fornecer suporte via tickets
- Oferecer painel administrativo
- Gerar logs detalhados de todas as operações`)

  // FUNCIONALIDADES
  sections.push(`## FUNCIONALIDADES PRINCIPAIS

### Loja de Produtos
- Sistema de catálogo de produtos
- Categorias e subcategorias
- Busca e filtro de produtos
- Visualização detalhada de produtos
- Imagens de produtos
- Estoque em tempo real

${config.cart.enabled ? `### Carrinho de Compras
- Adicionar/remover produtos
- Visualizar carrinho
- Calcular subtotal
- Aplicar cupons
- Finalizar compra
` : ''}

### Sistema de Cupons
- Criar cupons com desconto percentual ou fixo
- Validar cupons (data, usos, limite por usuário)
- Aplicar automaticamente no checkout
- Histórico de uso

### Pedidos
- ID único para cada pedido
- Estados: ${config.orders.statuses.map(s => s.name).join(', ')}
- Rastreamento de pedidos
- Histórico de pedidos do usuário
- Notificações de status

### Pagamentos
- Provider: ${config.payments.provider.toUpperCase()}
- Métodos de pagamento: ${config.payments.methods.map(m => m.type).join(', ')}
- Webhook para confirmação
- Variáveis de ambiente seguras
- Validação de transações

${config.tickets.enabled ? `### Sistema de Tickets
- Abrir/fechar tickets
- Categorias de tickets: ${config.tickets.categories.map(c => c.name).join(', ')}
- Atribuição a staff
- Histórico de mensagens
- Transcrição automática
- Avaliação de atendimento
` : ''}

### Administração
- Gerenciamento de produtos
- Gerenciamento de pedidos
- Gerenciamento de estoque
- Gerenciamento de cupons
- Configurações do bot
- Permissões por cargo

### Logs
- Logs de vendas
- Logs de pagamentos
- Logs de estoque
- Logs administrativos
${config.tickets.enabled ? '- Logs de tickets
' : ''}  - Logs de erros`)

  // TECNOLOGIAS
  sections.push(`## TECNOLOGIAS

### Linguagem & Framework
- Node.js (v18+)
- TypeScript
- discord.js v14

### Banco de Dados
- Tipo: ${config.database.type.toUpperCase()}
- ORM: Prisma

### Estrutura
- Modular e escalável
- Separação de responsabilidades
- Tratamento de erros robusto
- Sistema de logging`)

  // ARQUITETURA
  sections.push(`## ARQUITETURA

\`\`\`
Discord Bot
    |
    +-- Command Handler
    +-- Event Handler
    +-- Button Handler
    +-- Modal Handler
    +-- Menu Handler
    |
    +-- Services
    |   +-- ProductService
    |   +-- OrderService
    |   +-- PaymentService
    |   +-- InventoryService
    |   +-- CouponService
    |   +-- TicketService
    |   +-- LogService
    |
    +-- Database
    |   +-- User Repository
    |   +-- Product Repository
    |   +-- Order Repository
    |   +-- Payment Repository
    |   +-- Inventory Repository
    |   +-- Coupon Repository
    |   +-- Ticket Repository
    |   +-- Log Repository
    |
    +-- Integrations
    |   +-- Payment Provider
    |   +-- Webhook Handler
\`\`\``)

  // ESTRUTURA DE ARQUIVOS
  sections.push(`## ESTRUTURA DE ARQUIVOS

\`\`\`
discord-store-bot/
├── src/
│   ├── commands/
│   │   ├── admin/
│   │   ├── products/
│   │   ├── orders/
│   │   ├── payments/
│   │   └── support/
│   ├── events/
│   │   ├── ready.ts
│   │   ├── interactionCreate.ts
│   │   └── messageCreate.ts
│   ├── buttons/
│   ├── modals/
│   ├── menus/
│   ├── services/
│   │   ├── ProductService.ts
│   │   ├── OrderService.ts
│   │   ├── PaymentService.ts
│   │   ├── InventoryService.ts
│   │   ├── CouponService.ts
│   │   ├── TicketService.ts
│   │   └── LogService.ts
│   ├── database/
│   │   ├── repositories/
│   │   ├── migrations/
│   │   └── schema.ts
│   ├── payments/
│   │   ├── providers/
│   │   └── webhooks/
│   ├── inventory/
│   │   └── controllers/
│   ├── orders/
│   │   └── controllers/
│   ├── tickets/
│   │   └── controllers/
│   ├── logging/
│   │   └── logger.ts
│   ├── config/
│   │   └── config.ts
│   ├── utils/
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── helpers.ts
│   └── index.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── README.md
└── Dockerfile
\`\`\``)

  // BANCO DE DADOS
  sections.push(`## BANCO DE DADOS

Tipo: ${config.database.type.toUpperCase()}

Tabelas/Coleções necessárias:

### users
- id (UUID)
- discordId (String, unique)
- username (String)
- avatar (String?)
- email (String?)
- createdAt (DateTime)
- updatedAt (DateTime)
- totalSpent (Decimal)
- ordersCount (Int)

### products
- id (UUID)
- name (String)
- description (String?)
- categoryId (UUID)
- price (Decimal)
- image (String?)
- stock (Int)
- isDigital (Boolean)
- autoDelivery (Boolean)
- isActive (Boolean)
- deliveryMethod (String?)
- createdAt (DateTime)
- updatedAt (DateTime)

### categories
- id (UUID)
- name (String)
- emoji (String?)
- description (String?)
- image (String?)
- order (Int)
- parentId (UUID?)
- createdAt (DateTime)
- updatedAt (DateTime)

### orders
- id (UUID)
- userId (UUID)
- status (String)
- subtotal (Decimal)
- discount (Decimal)
- total (Decimal)
- couponCode (String?)
- deliveryMethod (String?)
- deliveryInfo (Json?)
- createdAt (DateTime)
- updatedAt (DateTime)
- completedAt (DateTime?)

### order_items
- id (UUID)
- orderId (UUID)
- productId (UUID)
- quantity (Int)
- price (Decimal)
- subtotal (Decimal)
- createdAt (DateTime)

### payments
- id (UUID)
- orderId (UUID)
- userId (UUID)
- provider (String)
- transactionId (String)
- status (String)
- amount (Decimal)
- currency (String)
- method (String)
- metadata (Json?)
- createdAt (DateTime)
- updatedAt (DateTime)
- confirmedAt (DateTime?)

### inventory
- id (UUID)
- productId (UUID)
- itemCode (String, unique)
- isUsed (Boolean)
- usedBy (UUID?)
- usedAt (DateTime?)
- createdAt (DateTime)
- updatedAt (DateTime)

### coupons
- id (UUID)
- code (String, unique)
- type (String)
- value (Decimal)
- maxUses (Int)
- currentUses (Int)
- maxUsesPerUser (Int)
- expiryDate (DateTime?)
- isActive (Boolean)
- applicableProducts (Json?)
- applicableCategories (Json?)
- createdAt (DateTime)
- updatedAt (DateTime)

### tickets
- id (UUID)
- userId (UUID)
- channelId (String)
- status (String)
- category (String)
- rating (Int?)
- feedback (String?)
- createdAt (DateTime)
- updatedAt (DateTime)
- closedAt (DateTime?)

### ticket_messages
- id (UUID)
- ticketId (UUID)
- authorId (String)
- content (String)
- createdAt (DateTime)

### logs
- id (UUID)
- type (String)
- action (String)
- userId (UUID?)
- orderId (UUID?)
- metadata (Json?)
- message (String)
- createdAt (DateTime)

### settings
- id (UUID)
- key (String, unique)
- value (String)
- updatedAt (DateTime)`)

  // VARIÁVEIS DE AMBIENTE
  sections.push(`## VARIÁVEIS DE AMBIENTE

\`\`\`.env
# Discord
DISCORD_TOKEN=seu_token_aqui
DISCORD_CLIENT_ID=seu_client_id
DISCORD_GUILD_ID=seu_guild_id

# Banco de Dados
DATABASE_URL=sua_url_banco_dados

# Pagamentos (${config.payments.provider})
PAYMENT_API_KEY=sua_chave_api
PAYMENT_WEBHOOK_SECRET=seu_webhook_secret
PAYMENT_WEBHOOK_URL=https://seu-dominio.com/webhooks/payment

# Configurações
NODE_ENV=production
LOG_LEVEL=info
BOT_PREFIX=/

# Canais (Discord Channel IDs)
LOG_CHANNEL_SALES=
LOG_CHANNEL_PAYMENTS=
LOG_CHANNEL_INVENTORY=
LOG_CHANNEL_ADMIN=
LOG_CHANNEL_TICKETS=
LOG_CHANNEL_ERRORS=
\`\`\``)

  // COMANDOS
  sections.push(`## COMANDOS PRINCIPAIS

### Loja
- \`/loja\` - Abrir painel da loja
- \`/produtos\` - Listar produtos
- \`/produto <id>\` - Ver detalhes do produto
- \`/categorias\` - Listar categorias
- \`/buscar <termo>\` - Buscar produtos

### Compras
- \`/comprar <produto_id>\` - Comprar produto
- \`/carrinho\` - Ver carrinho
- \`/carrinho add <produto_id> <quantidade>\` - Adicionar ao carrinho
- \`/carrinho remover <produto_id>\` - Remover do carrinho
- \`/checkout\` - Finalizar compra
- \`/cupom <codigo>\` - Aplicar cupom

### Pedidos
- \`/pedido <id>\` - Consultar status do pedido
- \`/meus-pedidos\` - Ver histórico de pedidos
- \`/cancelar-pedido <id>\` - Cancelar pedido

### Suporte
- \`/ticket\` - Abrir ticket de suporte
- \`/tickets\` - Ver meus tickets

### Administração
- \`/admin\` - Painel administrativo
- \`/produto add\` - Adicionar produto
- \`/produto edit\` - Editar produto
- \`/produto remover\` - Remover produto
- \`/estoque\` - Gerenciar estoque
- \`/cupom create\` - Criar cupom
- \`/cupom list\` - Listar cupons
- \`/pedidos\` - Gerenciar pedidos
- \`/logs\` - Ver logs
- \`/config\` - Configurar bot`)

  // SISTEMA DE PRODUTOS
  sections.push(`## SISTEMA DE PRODUTOS

Cada produto deve conter:
- **ID Único**: Identificador único do produto
- **Nome**: Até 100 caracteres
- **Descrição**: Descrição detalhada
- **Categoria**: Referência a uma categoria
- **Preço**: Em ${currency} (formato decimal)
- **Imagem**: URL ou hash da imagem
- **Estoque**: Quantidade disponível
- **Tipo**: Digital ou Físico
- **Entrega Automática**: Sim/Não
- **Status**: Ativo/Inativo
- **Método de Entrega**: Código, Chave, Arquivo, Link, Instruções ou Manual

Validações:
- Preço não pode ser negativo
- Estoque não pode ser negativo
- Nome é obrigatório
- Categoria deve existir`)

  // SISTEMA DE CARRINHO
  sections.push(`## SISTEMA DE CARRINHO

Funcionalidades:
- Adicionar produtos ao carrinho
- Remover produtos do carrinho
- Alterar quantidade de produtos
- Calcular subtotal automaticamente
- Aplicar cupons de desconto
- Calcular total final
- Salvar carrinho por usuário
- Expirar carrinho após 24 horas sem interação

Validações:
- Produto deve estar ativo
- Quantidade não pode exceder estoque
- Quantidade mínima: 1
- Verificar estoque antes de finalizar compra`)

  // SISTEMA DE PEDIDOS
  sections.push(`## SISTEMA DE PEDIDOS

Estados do Pedido:
1. **Aguardando Pagamento** 🟡 - Pedido criado, aguardando confirmação de pagamento
2. **Pagamento Processando** 🔵 - Pagamento em processamento
3. **Pago** 🟢 - Pagamento confirmado
4. **Processando Entrega** 🟣 - Preparando entrega
5. **Entregue** ✅ - Entregue ao cliente
6. **Cancelado** 🔴 - Pedido cancelado
7. **Reembolsado** ⚫ - Reembolso processado

Cada pedido deve registrar:
- ID único
- Usuário que fez o pedido
- Produtos e quantidades
- Valor subtotal
- Desconto aplicado
- Valor final
- Data de criação
- Data de atualização
- Cupom aplicado (se houver)
- Informações de entrega`)

  // SISTEMA DE PAGAMENTOS
  sections.push(`## SISTEMA DE PAGAMENTOS

Provider: ${config.payments.provider.toUpperCase()}

Requirimentos:
- Nunca armazenar dados bancários no bot
- Usar variáveis de ambiente para chaves
- Validar webhooks com assinatura
- Registrar todas as transações
- Implementar retry automático
- Timeout de 30 segundos para requisições
- Log detalhado de falhas

Fluxo:
1. Usuário clica em "Finalizar Compra"
2. Sistema cria pedido com status "Aguardando Pagamento"
3. Integração com ${config.payments.provider} é feita
4. Usuário completa pagamento no provedor
5. Webhook confirma o pagamento
6. Status do pedido muda para "Pago"
7. Entrega é iniciada
8. Log é registrado
9. Notificação é enviada`)

  // SISTEMA DE ESTOQUE
  sections.push(`## SISTEMA DE ESTOQUE

Controle de Estoque:
- Decrementar estoque quando pedido é confirmado
- Incrementar estoque quando pedido é cancelado/reembolsado
- Impedir venda com estoque zerado
- Alertar quando estoque está baixo
- Histórico de movimentação
- Relatórios de estoque

Produtos Digitais:
- Armazenar códigos/chaves em tabela separada
- Marcar como usado quando entregue
- Impedir reutilização de códigos
- Suportar múltiplos itens por produto`)

  // SISTEMA DE ENTREGA
  sections.push(`## SISTEMA DE ENTREGA AUTOMÁTICA

Métodos Suportados:
- **Código**: Código alfanumérico único
- **Chave**: Chave de produto/licença
- **Arquivo**: Arquivo digital para download
- **Link**: Link autorizado para acesso
- **Instruções**: Instruções de download/acesso
- **Manual**: Entrega manual pelo administrador

Fluxo de Entrega Automática:
1. Pagamento confirmado
2. Pedido passa para "Processando Entrega"
3. Item é reservado da tabela de inventário
4. Usuário recebe DM com o item
5. Item é marcado como usado
6. Pedido passa para "Entregue"
7. Log registra entrega
8. Notificação confirmando entrega`)

  // SISTEMA DE CUPONS
  sections.push(`## SISTEMA DE CUPONS

Criação de Cupons:
- Código único (sem espaços, case-insensitive)
- Tipo: Percentual (0-100%) ou Fixo (em ${currency})
- Data de expiração (opcional)
- Limite de usos totais (opcional)
- Limite de usos por usuário (opcional)
- Produtos específicos (opcional)
- Categorias específicas (opcional)
- Status ativo/inativo

Validação:
- Verificar se cupom existe
- Verificar se cupom está ativo
- Verificar se cupom expirou
- Verificar limite de usos
- Verificar limite por usuário
- Verificar aplicabilidade ao produto/categoria
- Calcular desconto (percentual ou fixo)
- Aplicar ao carrinho`)

  // SISTEMA DE TICKETS
  if (config.tickets.enabled) {
    sections.push(`## SISTEMA DE TICKETS

Categories: ${config.tickets.categories.map((c) => `${c.emoji} ${c.name}`).join(', ')}

Fluxo:
1. Usuário executa /ticket
2. Escolhe a categoria do ticket
3. Cria um canal privado
4. Bot posta mensagem inicial
5. Usuário descreve problema
6. Staff é notificado
7. Conversa ocorre no canal
8. Ao fechar, gera transcrição
9. Pede avaliação de atendimento
10. Deleta canal após 2 minutos

Botões:
- ✅ Fechar Ticket
- 📝 Transcrição
- ⭐ Avaliar`)
  }

  // SISTEMA ADMINISTRATIVO
  sections.push(`## SISTEMA ADMINISTRATIVO

Permissões:
- Cargos com acesso administrativo: ${config.admin.adminRoles.join(', ') || 'A definir'}
- Cargos de suporte: ${config.admin.supportRoles.join(', ') || 'A definir'}

Funções:
- Gerenciar produtos (CRUD)
- Gerenciar categorias
- Gerenciar pedidos
- Gerenciar estoque
- Gerenciar cupons
- Ver logs
- Configurar canais
- Configurar cargos
- Gerenciar tickets
- Reembolsar pedidos

Restrições:
- Apenas admins podem modificar configurações
- Logs registram todos os acessos
- Ações sensíveis requerem confirmação`)

  // SISTEMA DE LOGS
  sections.push(`## SISTEMA DE LOGS

Canais de Log:
- **Vendas**: ${config.admin.logChannels.sales || 'A definir'}
- **Pagamentos**: ${config.admin.logChannels.payments || 'A definir'}
- **Estoque**: ${config.admin.logChannels.inventory || 'A definir'}
- **Admin**: ${config.admin.logChannels.admin || 'A definir'}
- **Tickets**: ${config.admin.logChannels.tickets || 'A definir'}
- **Erros**: ${config.admin.logChannels.errors || 'A definir'}

Informações Registradas:
- Timestamp exato
- Usuário responsável (ID + menção)
- Ação realizada
- Dados envolvidos
- Resultado (sucesso/erro)
- Stack trace (em caso de erro)

Retenção:
- Logs são armazenados indefinidamente no banco
- Discord mantém historicamente nos canais`)

  // SEGURANÇA
  sections.push(`## SEGURANÇA

### Boas Práticas
- Nunca logar dados sensíveis (tokens, senhas, chaves)
- Sempre usar variáveis de ambiente para credenciais
- Validar todas as entradas do usuário
- Sanitizar mensagens antes de enviar
- Implementar rate limiting
- Usar HTTPS para webhooks
- Validar assinatura de webhooks
- Implementar CSRF protection
- Criptografar dados sensíveis

### Validações
- Verificar permissões do usuário antes de ações
- Validar valores monetários (não permitir negativos)
- Verificar limites de quantidade
- Validar formato de códigos de cupom
- Verificar integridade de transações
- Validar webhooks assinados

### Prevenção de Abuso
- Rate limiting em 5 requisições por minuto
- Verificar duplicação de pedidos
- Detectar múltiplas tentativas de pagamento falhadas
- Bloquear tentativas de manipulação de estoque
- Auditar acessos administrativos`)

  // TRATAMENTO DE ERROS
  sections.push(`## TRATAMENTO DE ERROS

### Estratégia
- Try-catch em todos os handlers
- Logging detalhado de erros
- Mensagens amigáveis ao usuário
- Retry automático para falhas de rede
- Fallback para falhas de pagamento
- Recovery automático de estados inconsistentes

### Erros Comuns
- Produto não encontrado
- Estoque insuficiente
- Pagamento recusado
- Webhook timeout
- Banco de dados indisponível
- Discord API rate limit
- Permissão insuficiente

### Resposta do Bot
- Embed vermelho com descrição do erro
- Sugestão de ação corretiva
- Link para documentação
- Opção de contatar suporte`)

  // INSTALAÇÃO E CONFIGURAÇÃO
  sections.push(`## INSTALAÇÃO E CONFIGURAÇÃO

### Pré-requisitos
- Node.js v18 ou superior
- npm ou yarn
- Banco de dados (${config.database.type.toUpperCase()})
- Token de bot Discord
- Credenciais do provedor de pagamento

### Passo 1: Clonar e Instalar
\`\`\`bash
git clone <repo-url>
cd discord-store-bot
npm install
\`\`\`

### Passo 2: Configurar Banco de Dados
\`\`\`bash
cp .env.example .env
# Editar .env com as variáveis necessárias
npx prisma migrate dev
\`\`\`

### Passo 3: Build e Deploy
\`\`\`bash
npm run build
npm start
\`\`\`

### Passo 4: Registrar Comandos no Discord
- O bot automaticamente registra comandos ao iniciar
- Para forçar registro: npm run commands:deploy`)

  // TESTES
  sections.push(`## TESTES

### Testes Unitários
- Testar cada serviço isoladamente
- Mockar banco de dados
- Mockar API de pagamento
- Cobertura mínima: 80%

### Testes de Integração
- Testar fluxos completos
- Testar comunicação com Discord
- Testar webhooks de pagamento

### Testes Manuais
1. Criar produto
2. Adicionar ao carrinho
3. Aplicar cupom
4. Fazer pedido
5. Processar pagamento
6. Verificar entrega
7. Abrir ticket
8. Fechar ticket

Executar testes:
\`\`\`bash
npm test
\`\`\``)

  // CRITÉRIOS DE CONCLUSÃO
  sections.push(`## CRITÉRIOS DE CONCLUSÃO

### Funcionalidades Implementadas
✅ Sistema de produtos e categorias
✅ Carrinho de compras
✅ Sistema de pedidos com 7 estados
✅ Integração com ${config.payments.provider}
✅ Controle de estoque
✅ Entrega automática de itens
✅ Sistema de cupons
${config.tickets.enabled ? '✅ Sistema de tickets\n' : ''}✅ Painel administrativo
✅ Sistema de logs
✅ Tratamento robusto de erros
✅ Validações de segurança
✅ TypeScript com strict mode
✅ Documentação completa
✅ README com instruções

### Qualidade
✅ Código organizado em módulos
✅ Sem dados sensíveis no código
✅ Variáveis de ambiente configuradas
✅ Estrutura escalável
✅ Tratamento de erros consistente
✅ Logs detalhados
✅ Testes implementados
✅ Documentação atualizada

### Deploy
✅ Pronto para produção
✅ Dockerfile incluído
✅ Environment variables documentadas
✅ Migrations automáticas
✅ Health checks implementados`)

  // INSTRUÇÕES FINAIS
  sections.push(`## INSTRUÇÕES PARA A IA GERADORA

Implemente o projeto completo seguindo todas as especificações acima.

### Requisitos Obrigatórios
1. **Não omita funcionalidades** - Todas as funcionalidades solicitadas devem estar presentes
2. **Organize o código** - Use a estrutura de diretórios proposta
3. **Segurança** - Nunca coloque segredos no código-fonte
4. **Banco de dados** - Use Prisma com as tabelas especificadas
5. **Tratamento de erros** - Todos os handlers devem ter try-catch
6. **Logs** - Registre todas as ações importantes
7. **Validações** - Valide todas as entradas do usuário
8. **TypeScript** - Use strict mode e tipos completos
9. **Discord.js** - Use v14 com componentes modernos
10. **Documentação** - Gere README com instruções claras

### Recomendações
- Prefira estrutura modular a arquivo único gigante
- Crie serviços para cada domínio (Produtos, Pedidos, etc)
- Use repositórios para acesso ao banco
- Implemente cache quando apropriado
- Adicione testes unitários
- Considere performance para grande volume

### Dúvidas de Implementação
Caso uma decisão técnica não tenha sido especificada:
1. Escolha uma solução segura e testada
2. Priorize manutenibilidade
3. Mantenha compatibilidade com as tecnologias escolhidas
4. Documente a decisão em comentários no código
5. Adicione testes para validar a implementação`)

  return sections.join('\n\n---\n\n')
}
