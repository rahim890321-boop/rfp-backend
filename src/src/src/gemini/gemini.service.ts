import { Injectable, Logger, BadGatewayException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private genAI: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateMagicStory(): Promise<string> {
    try {
      const modelName = this.configService.get<string>('GEMINI_MODEL') || 'gemini-pro';
      const model = this.genAI.getGenerativeModel({ model: modelName });

      // টপকোডারের স্পেসিফিক প্রম্পট: "Tell me a story about a magic backpack"
      const prompt = "Tell me a story about a magic backpack";
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // টপকোডারের শর্ত ৩.১ অনুযায়ী সার্ভারে লগ করা
      this.logger.log(`Gemini response received: ${text.substring(0, 100)}...`);
      
      return text;
    } catch (error) {
      this.logger.error('Gemini API call failed', error.stack);
      throw new BadGatewayException('Gemini API call failed. Check your API key or connectivity.');
    }
  }
  }
