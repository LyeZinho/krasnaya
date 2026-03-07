// Types compartilhados entre frontend e backend

export interface TriggerConfig {
  type: 'MESSAGE_CREATE' | 'MEMBER_JOIN' | 'INTERACTION_CREATE' | 'SCHEDULED_EVENT' | 'MESSAGE_REACTION' | 'VOICE_STATE_UPDATE';
  config?: Record<string, any>;
}

export interface Condition {
  field: string;
  operator: 'equals' | 'contains' | 'matches_regex' | 'has_role' | 'greater_than' | 'less_than';
  value: any;
}

export interface Action {
  type: 'SEND_MESSAGE' | 'ADD_ROLE' | 'KICK_MEMBER' | 'BAN_MEMBER' | 'REPLY_INTERACTION' | 'SET_CUSTOM_VARIABLE' | 'DELETE_MESSAGE';
  params: Record<string, any>;
}

export interface Automation {
  id: string;
  guildId: string;
  name: string;
  enabled: boolean;
  trigger: TriggerConfig;
  conditions: Condition[];
  actions: Action[];
  createdAt: number;
  updatedAt?: number;
}

export interface Command {
  id: string;
  guildId: string;
  name: string;
  prefix: string;
  description?: string;
  aliases: string[];
  enabled: boolean;
  cooldown: number; // em ms
  automationId?: string;
  logic?: Record<string, any>;
  createdAt: number;
}

export interface EventHandler {
  id: string;
  guildId: string;
  event: string;
  enabled: boolean;
  automationId: string;
  createdAt: number;
}

export interface EmbedTemplate {
  id: string;
  guildId: string;
  name: string;
  content: Record<string, any>;
  createdAt: number;
}

export interface CustomVariable {
  id: string;
  guildId: string;
  name: string;
  type: 'string' | 'number' | 'boolean';
  defaultValue: any;
  createdAt: number;
}

export interface AuditLog {
  id: string;
  actorId: string;
  action: string;
  targetId?: string;
  oldValue?: Record<string, any>;
  newValue?: Record<string, any>;
  ipAddress: string;
  createdAt: number;
}

export interface BotStatus {
  isOnline: boolean;
  queuedJobs: number;
  activeJobs: number;
  failedJobs: number;
  processingTime: number;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}
