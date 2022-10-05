import sdk from "./1-initialize-sdk.js"
import { MaxUint256 } from "@ethersproject/constants"

const editionDrop = sdk.getEditionDrop(
    "0x121EC2AD1276EBF22c0f6261FC7D8B175883b51d"
)

;(async () => {
    try {
        // Especifique as condições.
        const claimConditions = [
            {
                // Quando as pessoas vão poder reivindicar seus NFTs
                startTime: new Date(),

                // Número máximo de NFTs
                maxQuantity: 50_000,

                // o preço do NFT (grátis)
                price: 0,

                // Quantos NFTs podem ser reivindicados por transação.
                quantityLimitPerTransaction: 1,

                // tempo de espera entre transações infinito significa que cada
                // pessoa só pode solicitar um único NFT.
                waitInSeconds: MaxUint256
            }
        ]

        await editionDrop.claimConditions.set("0", claimConditions)
        console.log("✅ Condições de reinvidicação configuradas com sucesso!")
    } catch (error) {
        console.error("Falha ao definir condições de reinvidicação", error)
    }
})()
