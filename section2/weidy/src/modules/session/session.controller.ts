import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { KeyDto } from 'src/common/dtos/key.dto';
import { SessionService } from './session.service';
import { RegisterDto } from './dtos/register.dto';

@Controller('')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('/login')
  public async login(@Body() keyDto: KeyDto) {
    return await this.sessionService.login(
      keyDto.walletId,
      keyDto.walletKey,
      keyDto.seed
    );
  }


  @Post('/logout')
  public async logout() {
    return await this.sessionService.logout()
  }

  @Post('/invitations')
  public async createInvitation() {
    return await this.sessionService.createInvitation();
  }

  @Post('/invitations/accept')
  public async accepInvitation(@Query('invitation-url') invitationUrl: string) {
    return await this.sessionService.acceptInvitation(invitationUrl);
  }
}
