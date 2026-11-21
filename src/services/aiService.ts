import { getSupabaseClient } from '@/lib/supabase';

export interface AiPromptRequest {
  prompt: string;
  model?: string;
}

export interface AiPromptResponse {
  text: string;
  model: string;
}

/**
 * Invoca o proxy seguro de IA no Supabase Edge Functions (sem expor chaves no cliente).
 */
export const aiService = {
  async generateText(input: AiPromptRequest): Promise<AiPromptResponse> {
    const { data, error } = await getSupabaseClient().functions.invoke<AiPromptResponse>(
      'ai-proxy',
      {
        body: input,
      }
    );
    if (error) throw error;
    if (!data) throw new Error('Resposta vazia do serviço de IA.');
    return data;
  },
};
