import { Controller, Get, Query } from '@nestjs/common';
import { SessionService } from '../session/session.service';
import { VerifierService } from './verifier.service';

@Controller('verifier')
export class VerifierController {
  constructor(
    private readonly verifierService: VerifierService,
    private readonly sessionService: SessionService
  ) {}

  @Get('/proofs/request')
  public async requestProof(@Query('cred-def-id') credDefId: string) {
    return await this.verifierService.createProofRequest(this.sessionService.session, credDefId);
  }

  @Get('/proofs/check')
  public async verifyProof(@Query('proof-id') proofId?: string) {
    return await this.verifierService.checkProof(
      this.sessionService.session,
      proofId,
    );
  }
}
