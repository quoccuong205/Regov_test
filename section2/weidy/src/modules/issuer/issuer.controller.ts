import { Body, Controller, Post, Query } from '@nestjs/common';
import { SessionService } from '../session/session.service';
import { CredentialInput } from './dto/credentialInput.dto';
import { IssuerService } from './issuer.service';

@Controller('issuer')
export class IssuerController {
  constructor(
    private readonly issuerService: IssuerService,
    private readonly sessionService: SessionService
  ) { }

  @Post('/credentials/schemas')
  public async createSchemaAndDef() {
    return await this.issuerService.createCredCredentialSchemaAndDef(this.sessionService.session);
  }

  @Post('/credentials/offer')
  public async offerCredential(
    @Body() input: CredentialInput,
    @Query('cred-def-id') credDefId?:string
  ) {
    return await this.issuerService.issueCredential(this.sessionService.session, input, credDefId);
  }

 
}
