import sdk from "./1-initialize-sdk.js"

// Esse é o endereço do nosso contrato ERC-1155 do NFT de filiação.
const editionDrop = sdk.getEditionDrop(
    "0x121EC2AD1276EBF22c0f6261FC7D8B175883b51d"
)

// Esse é o endereço do nosso contrato ERC-20 do nosso token.
const token = sdk.getToken("0xeE35aa9ac05788F56911795C85BC4aA124231CD6")

;(async () => {
    try {
        // Pegue o endereço de todas as pessoas que possuem o nosso NFT de filiação, que tem
        // o tokenId 0.
        const walletAddresses =
            await editionDrop.history.getAllClaimerAddresses(0)

        if (walletAddresses.length === 0) {
            console.log(
                "Ninguém mintou o NFT ainda, peça para alguns amigos fazerem isso e ganhar um NFT de graça!"
            )
            process.exit(0)
        }

        // faça um loop no array de endereços.
        const airdropTargets = walletAddresses.map(address => {
            // Escolha um # aleatório entre 1000 e 10000.
            const randomAmount = Math.floor(
                Math.random() * (10000 - 1000 + 1) + 1000
            )
            console.log("✅ Vai enviar", randomAmount, "tokens para ", address)

            // Configure o alvo.
            const airdropTarget = {
                toAddress: address,
                amount: randomAmount
            }

            return airdropTarget
        })

        // Chame transferBatch em todos os alvos do airdrop.
        console.log("🌈 Começando o airdrop...")
        await token.transferBatch(airdropTargets)
        console.log("✅ Feito o airdrop de tokens para todos os donos de NFT!")
    } catch (error) {
        console.error("O airdrop de tokens falhou", error)
    }
})()

// 👋 SDK inicializado pelo endereço: 0x61839Df242801888ECA001246269D0C747c434Ee
// ✅ Vai enviar 8468 tokens para  0x61839Df242801888ECA001246269D0C747c434Ee
// ✅ Vai enviar 5752 tokens para  0xC3941F8Ac71dFD5a1e7A51BAC6047693CDF6B140
// 🌈 Começando o airdrop...
// ✅ Feito o airdrop de tokens para todos os donos de NFT!
