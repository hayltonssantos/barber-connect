# 💈 Barber Connect - Sistema de Gestão para Barbearias

Sistema completo de gestão para barbearias desenvolvido com React + TypeScript + Firebase, oferecendo uma solução moderna e escalável para o gerenciamento de agendamentos, funcionários e clientes.

## 🚀 Funcionalidades Principais

### 👥 **Multi-tenant**
- Isolamento completo de dados por contribuinte
- Múltiplas barbearias em uma única plataforma
- Segurança enterprise com Firebase Rules

### 📅 **Sistema de Agendamentos**
- Agendamento step-by-step intuitivo
- Validação automática de conflitos de horários
- Edição rápida de status (agendado → concluído)
- Cálculo automático de preços e duração

### 👨‍💼 **Gestão de Funcionários**
- Cadastro com especialidades e horários
- Controle de comissões e salários
- Agenda individual por profissional

### 👤 **Gestão de Clientes**
- Histórico completo de visitas
- Cadastro rápido durante agendamento
- Controle de preferências

### ✂️ **Gestão de Serviços**
- Catálogo completo de serviços
- Preços e durações configuráveis
- Categorização por tipo

### 📊 **Dashboard Inteligente**
- Estatísticas em tempo real
- Faturamento diário/mensal
- Próximos agendamentos
- Métricas de performance

## 🛠️ Stack Tecnológico

### **Frontend**
- **React 18** + **TypeScript** - Interface moderna e tipada
- **Vite** - Build tool otimizado
- **SCSS Modules** - Estilização modular
- **React Bootstrap** - Componentes responsivos
- **Day.js** - Manipulação de datas

### **Backend**
- **Firebase Authentication** - Autenticação segura
- **Firestore** - Banco NoSQL escalável
- **Firebase Storage** - Armazenamento de arquivos
- **Firebase Hosting** - Deploy com CDN global

### **Arquitetura**
- **Multi-tenant** - Isolamento por contribuinte
- **Context API** - Gerenciamento de estado
- **Custom Hooks** - Lógica reutilizável
- **Component-based** - Arquitetura modular

## 🔒 Segurança

- **Firestore Security Rules** - Proteção a nível de banco
- **JWT Tokens** - Autenticação stateless
- **Princípio do menor privilégio** - Acesso restrito
- **Validação dupla** - Frontend + Backend

## 📱 Responsividade

- **Mobile-first** - Design otimizado para dispositivos móveis
- **Breakpoints personalizados** - Adaptação para todos os tamanhos
- **Touch-friendly** - Interface otimizada para toque

## 🚀 Performance

- **Lazy Loading** - Carregamento sob demanda
- **Code Splitting** - Divisão inteligente do código
- **Caching** - Cache otimizado de dados
- **Real-time** - Sincronização em tempo real

## 📈 Escalabilidade

- **Auto-scaling** - Escala automaticamente com Firebase
- **Pay-per-use** - Custo baseado no uso real
- **Multi-região** - Dados replicados globalmente
- **99.9% SLA** - Alta disponibilidade garantida

## 🎯 Diferenciais

✅ **Zero configuração de servidor** - Backend totalmente gerenciado  
✅ **Custo ultra-baixo** - R$ 5/mês para 100 agendamentos  
✅ **Setup em minutos** - Configuração rápida e intuitiva  
✅ **Backup automático** - Dados sempre protegidos  
✅ **Atualizações em tempo real** - Sincronização instantânea  

## 🔧 Instalação
Clone o repositório
git clone https://github.com/seu-usuario/barber-connect.git

Entre no diretório
cd barber-connect

Instale as dependências
npm install

Configure as variáveis de ambiente
cp .env.example .env.local

Inicie o servidor de desenvolvimento
npm run dev

text

## 🌐 Variáveis de Ambiente

VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
VITE_FIREBASE_PROJECT_ID=seu_project_id
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id

text

## 📸 Screenshots

### Dashboard Principal
![Dashboard](./docs/screenshots/dashboard.png)

### Sistema de Agendamentos
![Agendamentos](./docs/screenshots/agendamentos.png)

### Gestão de Funcionários
![Funcionários](./docs/screenshots/funcionarios.png)

## 🎯 Roadmap

- [ ] **Notificações SMS/Email** - Lembretes automáticos
- [ ] **Relatórios Avançados** - Analytics detalhados
- [ ] **App Mobile** - Aplicativo nativo
- [ ] **Integração de Pagamentos** - PIX e cartões
- [ ] **Sistema de Fidelidade** - Programa de pontos
- [ ] **API Pública** - Integrações externas

## 🤝 Contribuição

Contribuições são bem-vindas! Veja nosso [guia de contribuição](CONTRIBUTING.md).

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request
