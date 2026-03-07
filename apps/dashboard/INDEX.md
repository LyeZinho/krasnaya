# 📑 ÍNDICE - Estrutura Completa do Frontend Krasnaya

## 📍 Arquivos de Documentação (Leia em Ordem)

1. **Este arquivo (INDEX.md)** - Você está aqui
2. **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Como instalar e rodar o projeto
3. **[FRONTEND_ARCHITECTURE.md](./FRONTEND_ARCHITECTURE.md)** - Arquitetura técnica detalhada
4. **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - O que foi implementado exatamente

---

## 🗂️ Navegação por Tipo

### 🎨 Componentes (Atoms - Elementos Base)

| Arquivo | Uso | Props |
|---------|-----|-------|
| [Button.svelte](./src/lib/atoms/Button.svelte) | Botões | `variant`, `disabled` |
| [Input.svelte](./src/lib/atoms/Input.svelte) | Campos de texto | `type`, `placeholder`, `hasError` |
| [Select.svelte](./src/lib/atoms/Select.svelte) | Seleores | `options`, `value` |
| [Checkbox.svelte](./src/lib/atoms/Checkbox.svelte) | Checkboxes | `checked`, `label` |
| [Card.svelte](./src/lib/atoms/Card.svelte) | Cards | `title`, `status` |
| [FormGroup.svelte](./src/lib/atoms/FormGroup.svelte) | Grupos de form | `label`, `error` |
| [StatusIndicator.svelte](./src/lib/atoms/StatusIndicator.svelte) | Status LED | `status` |

### 🧩 Componentes Compostos (Molecules)

| Arquivo | Uso |
|---------|-----|
| [NotificationToast.svelte](./src/lib/molecules/NotificationToast.svelte) | Sistema de notificações |
| [CommandCard.svelte](./src/lib/molecules/CommandCard.svelte) | Card para comando |
| [AutomationCard.svelte](./src/lib/molecules/AutomationCard.svelte) | Card para automação |

### 🔌 Serviços (Service Layer - Abstração)

| Arquivo | Responsabilidade |
|---------|------------------|
| [api.service.ts](./src/lib/services/api.service.ts) | Base HTTP + tratamento de erros |
| [automation.service.ts](./src/lib/services/automation.service.ts) | CRUD de Flows (TCA) |
| [command.service.ts](./src/lib/services/command.service.ts) | CRUD de Comandos |
| [event.service.ts](./src/lib/services/event.service.ts) | Gerenciamento de Events |
| [auth.service.ts](./src/lib/services/auth.service.ts) | Autenticação + 2FA |
| [admin.service.ts](./src/lib/services/admin.service.ts) | RBAC + Audit + System |

### 🏪 Stores (Estado Global com Svelte)

| Arquivo | Dados | Real-time |
|---------|-------|-----------|
| [bot-status.ts](./src/lib/stores/bot-status.ts) | Status do bot | SSE ✅ |
| [audit-logs.ts](./src/lib/stores/audit-logs.ts) | Logs de auditoria | SSE ✅ |
| [user.ts](./src/lib/stores/user.ts) | Usuário autenticado | - |
| [guild.ts](./src/lib/stores/guild.ts) | Guild selecionada | - |
| [notifications.ts](./src/lib/stores/notifications.ts) | Toasts/Alertas | - |

### 📄 Tipos (TypeScript)

| Arquivo | Contém |
|---------|--------|
| [types/index.ts](./src/lib/types/index.ts) | Todas as interfaces compartilhadas |

---

## 🛣️ Estrutura de Rotas

### Autenticação
```
(auth)/
  └── login/              ← Página de login
      └── +page.svelte
```

### Gestão (Usuários)
```
(mgmt)/                   ← Layout com sidebar
  ├── +layout.svelte      ← Sidebar de navegação
  └── dashboard/          ← 📊 Status do bot em tempo real
  └── commands/           ← ⚙️ CRUD de comandos dinâmicos
  └── events/             ← 🔔 Gerenciador de event handlers
  └── flows/              ← 🔄 Flow Builder Trigger-Condition-Action
  └── economy/            ← 💰 Itens, loja, boosts, badges
  └── database/           ← 🗄️ Variáveis customizadas
  └── embeds/             ← 🎨 Criador de embeds Discord
```

### Administração (Sistema)
```
(admin)/                  ← Layout com sidebar vermelha (admin only)
  ├── +layout.svelte      ← Proteção de acesso + sidebar
  ├── system/             ← 🖥️ Monitor do sistema (Redis, PG, Queue)
  ├── ledger/             ← 📋 Audit logs em tempo real com SSE
  └── rbac/               ← 🔐 Gerenciamento de permissões (Grant/Deny)
```

---

## 🎨 CSS & Design

| Arquivo | Contém |
|---------|--------|
| [app.css](./src/app.css) | Design system: cores, tipografia, componentes base |

**Paleta de Cores:**
- Preto (#000000) - Bordas
- Cinza Escuro (#1a1a1b) - Fundo
- Cinza Médio (#252526) - Cards
- Vermelho (#cc3333) - Destacado
- Verde (#33cc33) - Sucesso/Online
- Branco (#ffffff) - Texto

**Tipografia:**
- Font: JetBrains Mono (monospace)
- Weights: 400, 700, 800

---

## 🔍 Como Encontrar Coisas

### Quero adicionar um novo botão na página
1. Importe `Button.svelte` de `$lib/atoms`
2. Use com `variant="primary|secondary|danger|success"`
3. Exemplo: `<Button variant="primary" on:click={handler}>CLIQUE</Button>`

### Quero chamar a API para buscar comandos
1. Importe `CommandService` de `$lib/services/command.service`
2. Use: `await CommandService.listCommands(guildId)`
3. **Nunca** faça `fetch()` diretamente!

### Quero exibir uma notificação de sucesso
1. Importe `notifications` de `$lib/stores`
2. Use: `notifications.add({ type: 'success', message: 'Pronto!' })`

### Quero acessar status do bot em tempo real
1. Importe `botStatus` de `$lib/stores`
2. Use: `$botStatus.isOnline` (reativo automaticamente)

### Quero adicionar uma nova variável global
1. Crie em `$lib/stores/minha-store.ts`
2. Exporte em `$lib/stores/index.ts`
3. Importe e use com `$` em componentes Svelte

---

## ✨ Features Implementadas

| Recurso | Status | Arquivo |
|---------|--------|---------|
| Sistema de Design | ✅ | app.css |
| Componentes Base | ✅ | atoms/ |
| Service Layer | ✅ | services/ |
| Stores com SSE | ✅ | stores/ |
| Log de Auditoria | ✅ | /admin/ledger |
| RBAC Negativo | ✅ | /admin/rbac |
| Sistema de Notif | ✅ | NotificationToast.svelte |
| Autenticação | ✅ | /auth/login |
| 2FA/OTP | ✅ | AuthService |
| Monitor do Bot | ✅ | /admin/system |
| CRUD Comandos | ✅ | /mgmt/commands |
| Event Handlers | ✅ | /mgmt/events |
| Responsividade | ✅ | app.css (mobile-first) |
| Flow Builder UI | 🔲 | /mgmt/flows (placeholder) |
| Economia | 🔲 | /mgmt/economy (placeholder) |
| Embed Editor | 🔲 | /mgmt/embeds (placeholder) |

---

## 📊 Estatísticas da Implementação

- **Componentes Criados:** 10 (7 atoms + 3 molecules)
- **Serviços Implementados:** 6
- **Stores Desenvolvidas:** 5
- **Páginas Criadas:** 10
- **Linhas de TypeScript:** ~1200+
- **Linhas de Svelte:** ~1300+
- **Linhas de CSS:** ~300+
- **Linhas de Documentação:** ~1000+
- **Total:** ~3800+ linhas de código profissional

---

## 🚀 Quick Start

```bash
# 1. Instalar
cd apps/dashboard && pnpm install

# 2. Executar
pnpm dev

# 3. Abrir
http://localhost:5173
```

---

## 🔗 Links Internos

- [🔐 Como funciona autenticação?](./FRONTEND_ARCHITECTURE.md#autenticação)
- [🎨 Como customizar cores?](./SETUP_GUIDE.md#customizar-tema)
- [📡 Como funciona SSE?](./FRONTEND_ARCHITECTURE.md#comunicação-em-tempo-real)
- [🔌 Como integrar com backend?](./SETUP_GUIDE.md#próximas-etapas-para-integração-com-backend)

---

## 📞 Suporte Rápido

| Problema | Solução |
|----------|---------|
| Componentes não aparecem | Importe corretamente de `$lib/atoms` |
| API não responde | Chame através de um Service, não fetch() direto |
| Notificações não aparecem | `NotificationToast.svelte` está no layout? |
| SSE não funciona | Backend pode not estar mandando SSE corretamente |
| Tema errado | Edite CSS vars em `app.css` |

---

## 📚 Próximas Fases

**Fase 2 - Componentes Visuais:**
- Visual Flow Builder (Drag & Drop)
- Criador de Embeds interativo
- Dashboard de economia com gráficos

**Fase 3 - Robustez:**
- Testes unitários (Vitest)
- Testes E2E (Playwright)
- Validação com Zod schemas

**Fase 4 - Extras:**
- Dark/Light mode
- Atalhos de teclado
- Git-like history

---

**Status:** ✅ MVP COMPLETO

**Última atualização:** 7 de Março de 2026

**Próximo passo:** Integrar com backend NestJS
