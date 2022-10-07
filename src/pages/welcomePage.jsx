import { ChainId } from "@thirdweb-dev/sdk"

import useDaoTokens from "../hooks/useDaoTokens"
import { useNetwork } from "@thirdweb-dev/react"

const Welcome = () => {
    const network = useNetwork()
    const { address, connectWithMetamask } = useDaoTokens()

    if (address && network?.[0].data.chain.id !== ChainId.Mumbai) {
        return (
            <div className="unsupported-network">
                <h2>Por favor, conecte-se à rede Mumbai</h2>
                <p>
                    Essa dapp só funciona com a rede Mumbai, por favor troque de
                    rede na sua carteira.
                </p>
            </div>
        )
    }

    return (
        <div className="landing">
            <h1>Bem-vindos à ExtractoDAO</h1>
            <button
                className="btn-hero"
                disabled={address && address}
                onClick={connectWithMetamask}
            >
                Conectar metamask
            </button>
        </div>
    )
}

export default Welcome
