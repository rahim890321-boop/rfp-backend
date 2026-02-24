import { Controller, Post, Body, Param, Get, NotFoundException, BadRequestException, RequestTimeoutException } from '@nestjs/common';
import { GeminiService } from '../gemini/gemini.service';

@Controller('proposals')
export class ProposalController {
  // In-memory storage for demo (We will use Prisma later)
  private proposals = [];

  constructor(private readonly geminiService: GeminiService) {}

  @Post()
  create(@Body() body: { name: string }) {
    const newProposal = {
      id: Math.random().toString(36).substring(7),
      name: body.name,
      status: 'DRAFT',
      createdAt: new Date(),
    };
    this.proposals.push(newProposal);
    return newProposal;
  }

  @Post(':id/assess')
  async assess(@Param('id') id: string, @Body() body: { summary: string }) {
    const proposal = this.proposals.find(p => p.id === id);
    if (!proposal) throw new NotFoundException('Proposal not found');

    // Trigger Gemini AI - Magic Backpack Story
    await this.geminiService.generateMagicStory();

    // Start 15-minute timer
    proposal.timerStartedAt = new Date();
    proposal.status = 'ASSESSED';
    proposal.summary = body.summary;

    return {
      questions: [
        "What is the project budget?",
        "What is the timeline?",
        "What are the key deliverables?",
        "What is the target audience?",
        "Are there compliance requirements?"
      ],
      timerStartedAt: proposal.timerStartedAt
    };
  }
      }
