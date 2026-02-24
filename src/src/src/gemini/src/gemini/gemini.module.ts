import { Module } from '@nestjs/common';
import { GeminiService } from './gemini.service';

@Module({
  providers: [GeminiService],
  exports: [GeminiService], // যেন অন্য মডিউলগুলো (যেমন প্রপোজাল) এটি ব্যবহার করতে পারে
})
export class GeminiModule {}
