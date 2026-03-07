import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { AutomationService } from '$lib/services';

export const load: PageLoad = async ({ params }) => {
    try {
        if (!params.id) {
            throw error(400, 'ID não fornecido');
        }

        const automation = await AutomationService.getAutomation(params.id);
        if (!automation) {
            throw error(404, 'Automação não encontrada');
        }

        return { automation };
    } catch (err: any) {
        if (err.status) throw err;
        throw error(500, `Erro ao carregar automação: ${err.message}`);
    }
};
