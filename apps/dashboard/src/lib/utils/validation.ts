export interface ValidationError {
  field: string;
  message: string;
  line?: number;
}

export function validateJSON(jsonString: string): ValidationError[] {
  const errors: ValidationError[] = [];
  try {
    JSON.parse(jsonString);
  } catch (error) {
    if (error instanceof SyntaxError) {
      const match = error.message.match(/position (\d+)/);
      const position = match ? parseInt(match[1]) : 0;
      const line = jsonString.slice(0, position).split('\n').length;
      errors.push({
        field: 'json',
        message: error.message,
        line
      });
    }
  }
  return errors;
}

export function validateAutomation(data: any): ValidationError[] {
  const errors: ValidationError[] = [];
  
  // Type safety checks
  if (!data || typeof data !== 'object') {
    errors.push({ field: 'root', message: 'Dados inválidos: não é um objeto' });
    return errors;
  }
  
  if (!data.name || (typeof data.name === 'string' && data.name.trim() === '')) {
    errors.push({ field: 'name', message: 'Nome é obrigatório' });
  }
  if (!data.trigger || typeof data.trigger !== 'object' || !data.trigger.type) {
    errors.push({ field: 'trigger', message: 'Tipo de gatilho é obrigatório' });
  }
  if (!Array.isArray(data.actions) || data.actions.length === 0) {
    errors.push({ field: 'actions', message: 'Pelo menos uma ação é obrigatória' });
  }
  return errors;
}

export function validateCommand(data: any): ValidationError[] {
  const errors: ValidationError[] = [];
  
  // Type safety checks
  if (!data || typeof data !== 'object') {
    errors.push({ field: 'root', message: 'Dados inválidos: não é um objeto' });
    return errors;
  }
  
  if (!data.name || (typeof data.name === 'string' && data.name.trim() === '')) {
    errors.push({ field: 'name', message: 'Nome é obrigatório' });
  }
  if (!data.prefix || (typeof data.prefix === 'string' && data.prefix.trim() === '')) {
    errors.push({ field: 'prefix', message: 'Prefixo é obrigatório' });
  }
  return errors;
}
