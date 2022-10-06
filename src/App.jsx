import useDaoTokens from "./hooks/useDaoTokens"
import MemberArea from "./pages/memberArea"
import MintNft from "./pages/mintNft"
import Welcome from "./pages/welcomePage"

function App() {
    const { address, hasClaimedNFT } = useDaoTokens()

    if (!address) {
        return <Welcome />
    }

    if (hasClaimedNFT) {
        return <MemberArea />
    }

    return <MintNft />
}

export default App

// TODO: endereço do token ERC20: 0xeE35aa9ac05788F56911795C85BC4aA124231CD6
