import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';

@Module({
  providers: [PdfService],
  exports: [PdfService], // This allows other modules to use the PDF generator
})
export class PdfModule {}
