import { Module } from '@nestjs/common';
import { ProposalController } from './proposal.controller';
import { GeminiModule } from '../gemini/gemini.module';

@Module({
  imports: [GeminiModule], // This connects Gemini to our Proposal system
  controllers: [ProposalController],
})
export class ProposalModule {}
