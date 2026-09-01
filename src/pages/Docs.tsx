import React from 'react'
import { Card, CodeBlock, Badge } from '@/components'
import { BookOpen, Zap, Shield, Package } from 'lucide-react'

const Docs: React.FC = () => {
  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-dark-50 mb-2">📚 Documentação</h1>
        <p className="text-dark-400">Guia completo para usar o Discord Bot Prompt Builder</p>
      </div>

      {/* Guia Rápido */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-bold text-dark-50 mb-4 flex items-center gap-2">
          <Zap size={24} className="text-primary-400" />
          Guia Rápido
        </h2>
        <div className="space-y-4 text-dark-300">
          <div>
            <h3 className="font-bold text-dark-50 mb-2">1. Criar um novo projeto</h3>
            <p>Clique em "+ CRIAR NOVO BOT" e preencha as informações básicas do seu bot.</p>
          </div>
          <div>
            <h3 className="font-bold text-dark-50 mb-2">2. Configurar funcionalidades</h3>
            <p>Siga o assistente de 12 etapas para configurar todas as funcionalidades desejadas.</p>
          </div>
          <div>
            <h3 className="font-bold text-dark-50 mb-2">3. Gerar Prompt</h3>
            <p>Na última etapa, o sistema gera uma especificação completa para sua IA de programação.</p>
          </div>
          <div>
            <h3 className="font-bold text-dark-50 mb-2">4. Usar o Prompt</h3>
            <p>Copie o prompt gerado e forneça a uma IA (ChatGPT, Claude, etc.) para criar seu bot!</p>
          </div>
        </div>
      </Card>

      {/* Instalação */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-bold text-dark-50 mb-4 flex items-center gap-2">
          <Package size={24} className="text-primary-400" />
          Instalação Local
        </h2>
        <p className="text-dark-400 mb-4">Para executar localmente:</p>
        <CodeBlock
          code={`# 1. Clonar repositório
git clone https://github.com/seu-usuario/discord-bot-prompt-builder.git
cd discord-bot-prompt-builder

# 2. Instalar dependências
npm install

# 3. Iniciar servidor de desenvolvimento
npm run dev

# 4. Acessar em http://localhost:5173`}
          language="bash"
        />
      </Card>

      {/* API REST */}
      <Card className="p-8 mb-8">
        <h2 className="text-2xl font-bold text-dark-50 mb-4 flex items-center gap-2">
          <Shield size={24} className="text-primary-400" />
          Sobre o Gerador de Prompt
        </h2>
        <div className="space-y-4 text-dark-300">
          <p>
            O gerador de prompt cria uma especificação <strong>extremamente detalhada</strong> para um bot Discord, incluindo:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Identidade e objetivo do projeto</li>
            <li>Funcionalidades principais (loja, pedidos, pagamentos, tickets, etc)</li>
            <li>Tecnologias recomendadas</li>
            <li>Arquitetura e estrutura de arquivos</li>
            <li>Schema do banco de dados com todas as tabelas</li>
            <li>Comandos Discord (slash commands)</li>
            <li>Integração com provedores de pagamento</li>
            <li>Sistema de logs e auditoria</li>
            <li>Considerações de segurança</li>
            <li>Instruções de instalação e deploy</li>
            <li>Critérios de conclusão</li>
          </ul>
          <p className="mt-4 p-4 bg-primary-500/10 border border-primary-500/30 rounded text-primary-300">
            💡 O prompt é altamente específico e reduz drasticamente o tempo necessário para uma IA gerar código de qualidade!
          </p>
        </div>
      </Card>

      {/* Dicas */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-dark-50 mb-4 flex items-center gap-2">
          <BookOpen size={24} className="text-primary-400" />
          Dicas Úteis
        </h2>
        <div className="space-y-4 text-dark-300">
          <div className="p-4 bg-dark-800 rounded-lg">
            <h3 className="font-bold text-dark-50 mb-2">✨ Customize o Prompt</h3>
            <p>Você pode editar o prompt gerado antes de usar. Adicione detalhes específicos ou remova seções desnecessárias.</p>
          </div>
          <div className="p-4 bg-dark-800 rounded-lg">
            <h3 className="font-bold text-dark-50 mb-2">🔄 Regenere Quando Precisar</h3>
            <p>Altere as configurações do projeto e regenere o prompt quantas vezes quiser.</p>
          </div>
          <div className="p-4 bg-dark-800 rounded-lg">
            <h3 className="font-bold text-dark-50 mb-2">📝 Salve seus Projetos</h3>
            <p>Todos os projetos são salvos automaticamente. Acesse em "Meus Projetos" a qualquer momento.</p>
          </div>
          <div className="p-4 bg-dark-800 rounded-lg">
            <h3 className="font-bold text-dark-50 mb-2">🎯 Use Templates</h3>
            <p>Comece com um template predefinido para acelerar o processo. Acesse em "Templates".</p>
          </div>
          <div className="p-4 bg-dark-800 rounded-lg">
            <h3 className="font-bold text-dark-50 mb-2">🤖 Combine com IA</h3>
            <p>Use o prompt com ChatGPT Plus, Claude, ou outras IAs. Quanto melhor a IA, melhor o código gerado.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Docs
