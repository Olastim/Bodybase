'use server';

/**
 * @fileOverview A food logging and nutrition analysis AI agent.
 *
 * - analyzeFood - A function that handles the food analysis process.
 * - AnalyzeFoodInput - The input type for the analyzeFood function.
 * - AnalyzeFoodOutput - The return type for the analyzeFood function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeFoodInputSchema = z.object({
  foodName: z.string().describe('The name of the food item to analyze.'),
});
export type AnalyzeFoodInput = z.infer<typeof AnalyzeFoodInputSchema>;

const AnalyzeFoodOutputSchema = z.object({
  name: z.string().describe('The name of the food item.'),
  calories: z.number().describe('The number of calories in the food item.'),
  protein: z.number().describe('The amount of protein in grams in the food item.'),
  carbohydrates: z.number().describe('The amount of carbohydrates in grams in the food item.'),
  fat: z.number().describe('The amount of fat in grams in the food item.'),
  ingredients: z.string().describe('The ingredients of the food item.'),
  servingSize: z.string().describe('Serving size of the food item.'),
  nutritionInsights: z.string().describe('Insights about the food item.'),
});
export type AnalyzeFoodOutput = z.infer<typeof AnalyzeFoodOutputSchema>;

export async function analyzeFood(input: AnalyzeFoodInput): Promise<AnalyzeFoodOutput> {
  return analyzeFoodFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeFoodPrompt',
  input: {schema: AnalyzeFoodInputSchema},
  output: {schema: AnalyzeFoodOutputSchema},
  prompt: `You are a nutrition expert, who can provide a detailed analysis of any food item, along with its nutritional values and some insights.

Analyze the following food item: {{{foodName}}}.

Ensure that you return the response in JSON format, containing the food name, number of calories, amount of protein, carbohydrates, and fat, ingredients, serving size and some insights about the food item.

Here is the format:
{
  "name": "food name",
  "calories": number,
  "protein": number,
  "carbohydrates": number,
  "fat": number,
  "ingredients": "ingredients of the food item",
  "servingSize": "serving size of the food item",
  "nutritionInsights": "insights about the food item"
}`,
});

const analyzeFoodFlow = ai.defineFlow(
  {
    name: 'analyzeFoodFlow',
    inputSchema: AnalyzeFoodInputSchema,
    outputSchema: AnalyzeFoodOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
