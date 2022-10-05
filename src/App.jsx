import useNft from "./hooks/useNft"
import MemberArea from "./pages/memberArea"
import MintNft from "./pages/mintNft"
import Welcome from "./pages/welcomePage"

function App() {
    const { address, hasClaimedNFT } = useNft()

    if (!address) {
        return <Welcome />
    }

    if (hasClaimedNFT) {
        return <MemberArea />
    }

    return <MintNft />
}

export default App
