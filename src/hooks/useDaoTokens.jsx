import {
    useAddress,
    useMetamask,
    useEditionDrop,
    useToken,
    useVote
} from "@thirdweb-dev/react"
import { useState, useEffect, useMemo } from "react"

const useDaoTokens = () => {
    const address = useAddress()
    const connectWithMetamask = useMetamask()
    // inicializar o contrato editionDrop
    const editionDrop = useEditionDrop(
        "0x121EC2AD1276EBF22c0f6261FC7D8B175883b51d"
    )

    const token = useToken("0xeE35aa9ac05788F56911795C85BC4aA124231CD6")

    const vote = useVote("0x4368eE0cD41d1De519955Ee74d67D0858a65eC56")

    // Variável de estado para sabermos se o usuário tem nosso NFT.
    const [hasClaimedNFT, setHasClaimedNFT] = useState(false)
    // isClaiming nos ajuda a saber se está no estado de carregando enquanto o NFT é cunhado.
    const [isClaiming, setIsClaiming] = useState(false)

    // Guarda a quantidade de tokens que cada membro tem nessa variável de estado.
    const [memberTokenAmounts, setMemberTokenAmounts] = useState([])
    // O array guardando todos os endereços dos nosso membros.
    const [memberAddresses, setMemberAddresses] = useState([])

    // Uma função para diminuir o endereço da carteira de alguém, não é necessário mostrar a coisa toda.
    const shortenAddress = str => {
        return str.substring(0, 6) + "..." + str.substring(str.length - 4)
    }

    const [proposals, setProposals] = useState([])
    const [isVoting, setIsVoting] = useState(false)
    const [hasVoted, setHasVoted] = useState(false)

    useEffect(() => {
        if (!hasClaimedNFT) {
            return
        }

        const getAllAddresses = async () => {
            try {
                const memberAddresses =
                    await editionDrop.history.getAllClaimerAddresses(0)
                setMemberAddresses(memberAddresses)
                console.log("🚀 Endereços de membros", memberAddresses)
            } catch (error) {
                console.error("falha ao pegar lista de membros", error)
            }
        }

        getAllAddresses()
    }, [hasClaimedNFT, editionDrop.history])

    useEffect(() => {
        if (!hasClaimedNFT) {
            return
        }

        const getAllBalances = async () => {
            try {
                const amounts = await token.history.getAllHolderBalances()
                setMemberTokenAmounts(amounts)
                console.log("👜 Quantidades", amounts)
            } catch (error) {
                console.error("falha ao buscar o saldo dos membros", error)
            }
        }

        getAllBalances()
    }, [hasClaimedNFT, token.history])

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

    const memberList = useMemo(() => {
        return memberAddresses.map(address => {
            const member = memberTokenAmounts?.find(
                ({ holder }) => holder === address
            )

            return {
                address,
                tokenAmount: member?.balance.displayValue || "0"
            }
        })
    }, [memberAddresses, memberTokenAmounts])

    useEffect(() => {
        if (!hasClaimedNFT) {
            return
        }

        const getAllProposals = async () => {
            try {
                const proposals = await vote.getAll()
                setProposals(proposals)
                console.log("🌈 Propostas:", proposals)
            } catch (error) {
                console.log("falha ao buscar propostas", error)
            }
        }

        getAllProposals()
    }, [hasClaimedNFT, vote])

    useEffect(() => {
        if (!hasClaimedNFT) return
        if (!proposals.length) return

        const checkIfUserHasVoted = async () => {
            try {
                const hasVoted = await vote.hasVoted(
                    proposals[0].proposalId,
                    address
                )
                setHasVoted(hasVoted)

                if (hasVoted) {
                    console.log("🥵 Usuário já votou")
                } else {
                    console.log("🙂 Usuário ainda não votou")
                }
            } catch (error) {
                console.error("Falha ao verificar se carteira já votou", error)
            }
        }

        checkIfUserHasVoted()
    }, [hasClaimedNFT, proposals, address, vote])

    return {
        address,
        connectWithMetamask,
        hasClaimedNFT,
        setHasClaimedNFT,
        mintNft,
        isClaiming,
        memberList,
        shortenAddress,
        isVoting,
        setIsVoting,
        hasVoted,
        proposals
    }
}

export default useDaoTokens
