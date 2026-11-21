// Edge Function segura para chamadas ao Gemini (nunca exponha GEMINI_API_KEY no frontend).
// Deploy: npx supabase functions deploy ai-proxy
// Segredo: npx supabase secrets set GEMINI_API_KEY=sua_chave

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AiProxyRequest {
  prompt?: string;
  model?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return Response.json({ error: 'Token ausente.' }, { status: 401, headers: corsHeaders });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const geminiKey = Deno.env.get('GEMINI_API_KEY');

    if (!geminiKey) {
      return Response.json(
        { error: 'GEMINI_API_KEY não configurada no servidor.' },
        { status: 500, headers: corsHeaders }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userData.user) {
      return Response.json(
        { error: 'Usuário não autenticado.' },
        { status: 401, headers: corsHeaders }
      );
    }

    const { data: allowed, error: permErr } = await supabase.rpc('has_permission', {
      required_key: 'ai.use',
    });
    if (permErr || !allowed) {
      return Response.json(
        { error: 'Sem permissão para usar IA.' },
        { status: 403, headers: corsHeaders }
      );
    }

    const body = (await req.json()) as AiProxyRequest;
    const prompt = (body.prompt ?? '').trim();
    if (!prompt || prompt.length > 8000) {
      return Response.json(
        { error: 'Prompt inválido (1 a 8000 caracteres).' },
        { status: 400, headers: corsHeaders }
      );
    }

    const model = body.model ?? 'gemini-2.5-flash';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(geminiKey)}`;

    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text();
      return Response.json(
        { error: 'Falha no provedor de IA.', detail },
        { status: upstream.status, headers: corsHeaders }
      );
    }

    const payload = await upstream.json();
    const text = payload?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    return Response.json({ text, model }, { status: 200, headers: corsHeaders });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro interno no proxy de IA.';
    return Response.json({ error: message }, { status: 500, headers: corsHeaders });
  }
});
