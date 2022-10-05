import { useAddress, useMetamask, useEditionDrop } from "@thirdweb-dev/react"
import { useState, useEffect } from "react"

const useNft = () => {
    const address = useAddress()
    const connectWithMetamask = useMetamask()
    // inicializar o contrato editionDrop
    const editionDrop = useEditionDrop(
        "0x121EC2AD1276EBF22c0f6261FC7D8B175883b51d"
    )

    // Variável de estado para sabermos se o usuário tem nosso NFT.
    const [hasClaimedNFT, setHasClaimedNFT] = useState(false)
    // isClaiming nos ajuda a saber se está no estado de carregando enquanto o NFT é cunhado.
    const [isClaiming, setIsClaiming] = useState(false)

    const mintNft = async () => {
        try {
            setIsClaiming(true)
            await editionDrop.claim("0", 1)
            console.log(
                `🌊 Cunhado com sucesso! Olhe na OpenSea: https://testnets.opensea.io/assets/${editionDrop.getAddress()}/0`
            )
            setHasClaimedNFT(true)
        } catch (error) {
            setHasClaimedNFT(false)
            console.error("Falha ao cunhar NFT", error)
        } finally {
            setIsClaiming(false)
        }
    }

    useEffect(() => {
        if (!address) return

        const checkBalance = async () => {
            try {
                const balance = await editionDrop.balanceOf(address, 0)
                // Se o saldo for maior do que 0, ele tem nosso NFT!
                if (balance.gt(0)) {
                    setHasClaimedNFT(true)
                    console.log("🌟 esse usuário tem o NFT de membro!")
                } else {
                    setHasClaimedNFT(false)
                    console.log("😭 esse usuário NÃO tem o NFT de membro.")
                }
            } catch (error) {
                setHasClaimedNFT(false)
                console.error("Falha ao ler saldo", error)
            }
        }

        checkBalance()
    }, [address, editionDrop])

    return {
        address,
        connectWithMetamask,
        hasClaimedNFT,
        setHasClaimedNFT,
        mintNft,
        isClaiming
    }
}

export default useNft
