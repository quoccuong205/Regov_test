import { Agent, AutoAcceptCredential, HttpOutboundTransport, IndyPoolConfig, InitConfig, WsOutboundTransport } from "@aries-framework/core";
import { agentDependencies, HttpInboundTransport } from "@aries-framework/node";

interface AgentData {
    connectionId?: string,
    credentialId?: string,
    proofId?: string,
    credDefId?: string
}

export class AgentSession {
    public config: InitConfig;
    public port: number;
    public label: string;
    public agent: Agent;
    public data: AgentData

    public constructor({
        port,
        label,
        walletConfig,
        ledgerConfig,
        didSeed,
    }: {
        port: number,
        label: string,
        walletConfig?: {
            id: string,
            key: string
        },
        ledgerConfig: IndyPoolConfig,
        didSeed?: string
    }) {
        this.port = port;
        this.label = label;

        const agentConfig: InitConfig = {
            label: label,
            walletConfig: walletConfig,
            endpoints: [`http://localhost:${this.port}`],
            autoAcceptConnections: true,
            autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
            publicDidSeed: didSeed,
            indyLedgers: [ledgerConfig]
        }

        this.config = agentConfig;
        this.agent = new Agent({
            config: agentConfig,
            dependencies: agentDependencies
        });
        this.data = {}
        this.agent.registerInboundTransport(new HttpInboundTransport({ port }))
        this.agent.registerOutboundTransport(new HttpOutboundTransport())
        this.agent.registerOutboundTransport(new WsOutboundTransport())
    }


    public async initialize() {
        await this.agent.initialize()
        console.log(`Agent session is running on ${this.port}`)
    }


    public async exit() {
        await this.agent.shutdown()
        console.log(`Agent session is down.`)
    }
}