// Documento de arquitetura do Frontend

# Arquitetura do Frontend - Krasnaya Dashboard

## 📐 Estrutura de Pastas

```
src/
├── lib/
│   ├── atoms/           # Componentes base (Button, Input, Card, etc)
│   ├── molecules/       # Componentes compostos (Forms, Lists, etc)
│   ├── organisms/       # Componentes complexos (Layouts, Sidebars)
│   ├── services/        # Camada de abstração de API
│   ├── stores/          # Estado global Svelte (Stores)
│   ├── types/           # TypeScript interfaces compartilhadas
│   └── assets/          # Imagens, ícones
├── routes/
│   ├── (auth)/          # Login e 2FA
│   ├── (mgmt)/          # Backoffice de Gestão (usuários)
│   │   ├── dashboard/
│   │   ├── commands/
│   │   ├── events/
│   │   ├── flows/
│   │   ├── economy/
│   │   ├── database/
│   │   └── embeds/
│   └── (admin)/         # Backoffice de Administração (sistema)
│       ├── system/
│       ├── ledger/
│       └── rbac/
└── app.css              # Estilos globais (Brutalismo + Glass)
```

## 🎨 Design System

### Cores (Brutalismo Soviético)
- **Preto**: #000000 - Bordas e estrutura
- **Cinza Escuro**: #1a1a1b - Fundo principal
- **Cinza Médio**: #252526 - Cards e painéis
- **Vermelho Soviet**: #cc3333 - Destaque e ações
- **Verde**: #33cc33 - Status online/sucesso
- **Branco**: #ffffff - Texto principal

### Tipografia
- **Fonte Principal**: JetBrains Mono (monospace)
- **Pesos**: 400, 700, 800
- **Comportamento**: UPPERCASE para headings e botões

### Componentes Base (Atoms)

#### Button
```svelte
<Button variant="primary|secondary|danger|success" disabled on:click>
  TEXTO
</Button>
```

#### Input
```svelte
<Input
  type="text|email|password|number"
  placeholder="..."
  bind:value
  hasError
/>
```

#### Card
```svelte
<Card title="TÍTULO" status="idle|active|error">
  Conteúdo aqui
</Card>
```

#### FormGroup
```svelte
<FormGroup label="Label" error="Mensagem de erro">
  <Input ... />
</FormGroup>
```

## 🔌 Camada de Serviços (Service Layer)

**Princípio:** O frontend NUNCA chama `fetch()` diretamente. Sempre usa os serviços.

### Serviços Implementados

1. **AutomationService** - Gerenciamento de Flows (TCA)
2. **CommandService** - Gerenciamento de Comandos Dinâmicos
3. **EventService** - Gerenciamento de Event Handlers
4. **AuthService** - Autenticação e 2FA
5. **AdminService** - Funcionalidades de Admin (RBAC, Audit)
6. **BotService** - Status do Bot e Queue Stats

**Uso:**
```typescript
import { CommandService } from '$lib/services/command.service';

const commands = await CommandService.listCommands(guildId);
```

## 🏪 Estado Global (Stores)

Gerenciam estado compartilhado entre componentes:

- **botStatus** - Status do bot via SSE (realtime)
- **auditLogs** - Audit logs via SSE (realtime)
- **user** - Usuário autenticado
- **currentGuild** - Guild selecionada
- **notifications** - Sistema de notificações toast

**Uso:**
```typescript
import { user, botStatus } from '$lib/stores';

$user  // Usuário atual
$botStatus  // Status do bot em tempo real
```

## 🔒 Segurança

### Autenticação
- OAuth via Discord
- 2FA com OTP obrigatória para Admin
- Tokens armazenados em HttpOnly Cookies (server-side)

### RBAC
- Sistema de Negação Implícita
- Granularidade por recurso + ação
- Admin pode Deny mesmo que Grant esteja ativo

### Audit
- Todo evento gravado em `audit_logs`
- Streaming via SSE para visualização em tempo real
- Encriptação de dados sensíveis

## 📡 Comunicação em Tempo Real

### SSE (Server-Sent Events)
- Usado para Status do Bot: `/api/v1/internal/monitor/status-sse`
- Usado para Audit Logs: `/api/v1/admin/audit-logs-sse`
- UnidirecionalGaleria (servidor → cliente)
- Reconexão automática

## 📄 Tipos Compartilhados

Todos os tipos estão em `$lib/types/index.ts`:

```typescript
export interface Automation { ... }
export interface Command { ... }
export interface EventHandler { ... }
export interface AuditLog { ... }
export interface BotStatus { ... }
```

## 🚀 Próximos Passos

1. **Molecules** - Componentes compostos (CommandList, EventGrid, etc)
2. **Organisms** - Componentes complexos (FlowBuilder, EmbedEditor)
3. **Páginas (mgmt)**
   - Form para criar/editar Automações
   - Visual Flow Builder para TCA
   - CRUD para Itens da Economia
4. **Páginas (admin)** - Detalhes completos nas tabs de configuração
5. **Validação Zod** - Usar schemas Zod para validar inputs antes de submit

## 📝 Convenções

- Nomes em KEBAB-CASE para arquivos
- Nomes em PascalCase para componentes Svelte
- Nomes em camelCase para funções/variáveis
- Comentários explicativos em serviços e stores
- Prefixo `on:` para event handlers Svelte
