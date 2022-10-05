import sdk from "./1-initialize-sdk.js"

// Esse é o endereço do nosso contrato ERC-20 impresso no passo anterior.
const token = sdk.getToken("0xeE35aa9ac05788F56911795C85BC4aA124231CD6")

;(async () => {
    try {
        // Qual o fornecimento máximo que você quer? 1,000,000,000 é um número legal!
        const amount = 1_000_000_000

        // Interaja com o seu contrato ERC-20 e cunhe os tokens!
        await token.mintToSelf(amount)
        const totalSupply = await token.totalSupply()

        // Mostre quantos dos seus tokens existem agora!
        console.log(
            "✅ Agora temos",
            totalSupply.displayValue,
            "$TL em circulação"
        )
    } catch (error) {
        console.error("Falha ao imprimir o dinheiro", error)
    }
})()

// 👋 SDK inicializado pelo endereço: 0x61839Df242801888ECA001246269D0C747c434Ee
// ✅ Agora temos 1000000000.0 $TL em circulação
// Endereço do token: 0xeE35aa9ac05788F56911795C85BC4aA124231CD6
