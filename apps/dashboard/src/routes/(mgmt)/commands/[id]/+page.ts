import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { CommandService } from '$lib/services';

export const load: PageLoad = async ({ params }) => {
    try {
        if (!params.id) {
            throw error(400, 'ID não fornecido');
        }

        const command = await CommandService.getCommand(params.id);
        if (!command) {
            throw error(404, 'Comando não encontrado');
        }

        return { command };
    } catch (err: any) {
        if (err.status) throw err;
        throw error(500, `Erro ao carregar comando: ${err.message}`);
    }
};
