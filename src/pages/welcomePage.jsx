import useDaoTokens from "../hooks/useDaoTokens"

const Welcome = () => {
    const { address, connectWithMetamask } = useDaoTokens()
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
