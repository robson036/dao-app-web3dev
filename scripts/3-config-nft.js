import sdk from "./1-initialize-sdk.js"
import { readFileSync } from "fs"

const editionDrop = sdk.getEditionDrop(
    "0x121EC2AD1276EBF22c0f6261FC7D8B175883b51d"
)

;(async () => {
    try {
        await editionDrop.createBatch([
            {
                name: "Animal Exemplo",
                description: "Esse NFT vai te dar acesso ao ExtractoDAO!",
                image: readFileSync("scripts/assets/gado-nelore.jpg")
            }
        ])
        console.log("✅ Novo NFT criado com sucesso no !")
    } catch (error) {
        console.error("falha ao criar o novo NFT", error)
    }
})()

// 👋 SDK inicializado pelo endereço: 0x61839Df242801888ECA001246269D0C747c434Ee
// ✅ Novo NFT criado com sucesso no !
