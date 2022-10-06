import useDaoTokens from "../hooks/useDaoTokens"

const MintNft = () => {
    const { isClaiming, mintNft } = useDaoTokens()
    return (
        <div className="mint-nft">
            <h1>Cunhe gratuitamente seu NFT de membro 🥩 da ExtractoDAO</h1>
            <button disabled={isClaiming} onClick={mintNft}>
                {isClaiming ? "Cunhando..." : "Cunhe seu NFT (GRATIS)"}
            </button>
        </div>
    )
}

export default MintNft
