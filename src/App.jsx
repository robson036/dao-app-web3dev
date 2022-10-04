import { useAddress, useMetamask } from "@thirdweb-dev/react"

function App() {
    const address = useAddress()
    const connectWithMetamask = useMetamask()

    console.log("Address: ", address)

    return (
        <div className="landing">
            <h1>Bem-vindos à ExtractoDAO</h1>

            {address && <h2>Carteira conectada</h2>}

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

export default App
