
  
# Regov - WeIDY
## Introduction
Regov - WeIDY is a fundamental solution for Web3 identity designed to showcase the functionality of Verifiable Credentials and its inherent workflows on a fundamental level. The context of the problem is that a City Government wishes to issue identities to its citizens, who can then use these identities to access services provided by service providers. To implement this solution, citizens can download an application called Agent, which runs locally on their machines and connects only to the ledger (Node pool) and other Agent applications (P2P). The solution employs a Permissioned Public Blockchain and Decentralized Identity mechanism, using Hyperledger Indy's toolkits and frameworks, including the Indy Ledger and Hyperledger Aries + Typescript (NestJS) Agent.

## Installation

  1. We need Docker & Docker compose installed, we can follow this guide to install these tools: 
  https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04
  
  2. Move to the ***section2*** directory 
  3. Run:  `docker compose up`
  4. To check out whether Agent apps running properly, call to the corresponding hosts 
-	***Issuer***: `8080`,
-	***Holder***: `8081`
-	***Verifier***: `8082`

## Workflow

Issuing Identity
 1. Both Issuer, Holder, Verifier login to their own applications
 1.1. If credential schema & definittion are not created, Issuer must create new schema & credential definition
 2. Issuer invite Holder for connection (Out-of-band)
 3. Holder accept connecting invitation
 4. Issuer create credential offer & send it to Holder via the connection
 5. Holder accept & store the credential

  

Verifying Identity
 1. Verifier invite Holder for connection (Out-of-band)
 2. Holder accept connecting invitation
 3. Verifier create proof request & send it to Holder via the connection
 4. Holder build proof from credentials & send the proof to Verifier via the connection
 5. Verifier can views & verify the proof
