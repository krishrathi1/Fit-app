import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

const SYSTEM_PROMPT = `You are FitOS AI Coach, an expert fitness and nutrition advisor. You are friendly, motivating, and knowledgeable about:
- Workout programming and exercise form
- Nutrition planning and meal suggestions
- Recovery and sleep optimization
- Weight loss and muscle building strategies
- Hydration and supplement guidance

Keep responses concise (2-3 paragraphs max), practical, and actionable. Use emojis sparingly for personality.
Always consider the user's goals, stats, and preferences when giving advice.
If asked about medical conditions, recommend consulting a healthcare professional.`;

export async function POST(request: NextRequest) {
  try {
    const { message, history, profile } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const zai = await ZAI.create();

    // Build context-aware messages
    const contextMessage = `User profile: Goal: ${profile?.goal || 'general fitness'}, Weight: ${profile?.weight || 70}kg, Height: ${profile?.height || 170}cm, Age: ${profile?.age || 25}, Activity: ${profile?.activityLevel || 'moderate'}, Diet: ${profile?.diet || 'balanced'}, Target calories: ${profile?.targetCalories || 2000}kcal`;

    const messages = [
      { role: 'assistant' as const, content: SYSTEM_PROMPT },
      { role: 'assistant' as const, content: contextMessage },
      ...(history || []).slice(-8).map((m: { role: string; content: string }) => ({
        role: m.role === 'assistant' ? 'assistant' as const : 'user' as const,
        content: m.content,
      })),
      { role: 'user' as const, content: message },
    ];

    const completion = await zai.chat.completions.create({
      messages,
      thinking: { type: 'disabled' },
    });

    const response = completion.choices[0]?.message?.content || "I'm here to help! Could you tell me more about what you need?";

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Coach API error:', error);
    return NextResponse.json(
      { response: "I'm having trouble connecting right now. Please try again in a moment. Remember to stay consistent with your goals! 💪" },
      { status: 200 }
    );
  }
}
