import { Injectable } from '@nestjs/common';
import { AgentSession } from 'src/common/agent.base';

@Injectable()
export class HolderService {

  public async acceptOffer(holder: AgentSession, credentialId?: string) {
    return await holder.agent.credentials.acceptOffer({ credentialRecordId: credentialId || holder.data.credentialId });
  }

  public async acceptProofRequest(holder: AgentSession, proofId?: string) {
    const targetproofId = proofId || holder.data.proofId

    const creds = await holder.agent.proofs.autoSelectCredentialsForProofRequest({
      proofRecordId: targetproofId
    });

    await holder.agent.proofs.acceptRequest({
      proofRecordId: targetproofId,
      proofFormats: {
        indy: creds.proofFormats.indy
      }
    })
    return creds;
  }
}
