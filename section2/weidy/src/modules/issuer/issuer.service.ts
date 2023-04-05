import {
  SchemaTemplate,
} from '@aries-framework/core';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AgentSession } from 'src/common/agent.base';
import { CredentialInput } from './dto/credentialInput.dto';

@Injectable()
export class IssuerService {
  public async issueCredential(
    issuer: AgentSession,
    payload: CredentialInput,
    credDefId?: string
  ) {
    console.log(issuer.data.connectionId);
    console.log(issuer.data.credDefId, credDefId)
    return await issuer.agent.credentials.offerCredential({
      protocolVersion: 'v1',
      connectionId: issuer.data.connectionId,
      credentialFormats: {
        indy: {
          credentialDefinitionId: credDefId || issuer.data.credDefId,
          attributes: [
            { name: 'name', value: payload.name },
            { name: 'identity_number', value: payload.identity_number },
            { name: 'birth_year', value: payload.birth_year },
          ],
        },
      },
    });
  }


  public async createCredCredentialSchemaAndDef(issuer: AgentSession): Promise<any> {
    const schemaTemplate: SchemaTemplate = {
      name: 'Identity123',
      version: '1.5',
      attributes: ['name', 'identity_number', 'birth_year'],
    };

    if (!issuer) {
      throw new BadRequestException('Please login first.')
    }

    const schema = await issuer.agent.ledger.registerSchema(schemaTemplate);

    const schemaDef = await issuer.agent.ledger.registerCredentialDefinition({
      schema: schema,
      tag: 'CI1',
      supportRevocation: false,
    });

    issuer.data.credDefId = schemaDef.id
    console.log('Storing cred defs: ', schema.id, schemaDef.id)
    return {
      schema,
      schemaDef,
    };
  }
}
