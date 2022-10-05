import { AddressZero } from "@ethersproject/constants"
import sdk from "./1-initialize-sdk.js"
;(async () => {
    try {
        // Faça o Deploy de um contracto ERC-20 padrão.
        const tokenAddress = await sdk.deployer.deployToken({
            // Qual o nome do seu token? Ex. "Ethereum"
            name: "Token de Governança da ExtractoDAO",

            // Qual o símbolo do seu token? Ex. "ETH"
            symbol: "TL",

            // Isso é para o caso de querermos vender o token,
            // nesse caso não queremos, por isso AddressZero de novo.
            primary_sale_recipient: AddressZero
        })

        console.log(
            "✅ Módulo de token implantado com sucesso. Endereço:",
            tokenAddress
        )
    } catch (error) {
        console.error("falha ao implantar módulo do token", error)
    }
})()

// 👋 SDK inicializado pelo endereço: 0x61839Df242801888ECA001246269D0C747c434Ee
// ✅ Módulo de token implantado com sucesso. Endereço: 0xeE35aa9ac05788F56911795C85BC4aA124231CD6
