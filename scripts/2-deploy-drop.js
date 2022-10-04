import { AddressZero } from "@ethersproject/constants"
import sdk from "./1-initialize-sdk.js"
import { readFileSync } from "fs"
;(async () => {
    try {
        const editionDropAddress = await sdk.deployer.deployEditionDrop({
            // O nome da coleção, ex. CryptoPunks
            name: "Membro da ExtractoDAO",

            // Uma descrição para a coleção.
            description: "A DAO dos bulls",

            // Uma imagem para a coleção que vai aparecer no OpenSea.
            image: readFileSync("scripts/assets/dao.jpeg"),

            // Nós precisamos passar o endereço da pessoa que vai estar recebendo os rendimentos das vendas dos nfts do módulo.
            // Nós estamos planejando não cobrar as pessoas pelo drop, então passaremos o endereço 0x0
            // você pode configurar isso para sua própria carteira se você quiser cobrar pelo drop.
            primary_sale_recipient: AddressZero
        })

        // essa inicialização retorna o endereço do nosso contrato
        // usamos para inicializar o contrato no sdk
        const editionDrop = sdk.getEditionDrop(editionDropAddress)

        // com isso, temos os metadados no nosso contrato
        const metadata = await editionDrop.metadata.get()

        console.log(
            "✅ Contrato editionDrop implantado com sucesso, endereço:",
            editionDropAddress
        )
        console.log("✅ bundleDrop metadados:", metadata)
    } catch (error) {
        console.error("falha ao implantar contrato editionDrop", error)
    }
})()

// 👋 SDK inicializado pelo endereço: 0x61839Df242801888ECA001246269D0C747c434Ee
// ✅ Contrato editionDrop implantado com sucesso, endereço: 0x121EC2AD1276EBF22c0f6261FC7D8B175883b51d
// ✅ bundleDrop metadados: {
//   name: 'Membro da ExtractoDAO',
//   description: 'A DAO dos bulls',
//   image: 'https://gateway.ipfscdn.io/ipfs/QmUAtCLcozPhCHuv5LE1JQqwXFVR1hjRQvEbNbe7CM5WjR/0',
//   seller_fee_basis_points: 0,
//   fee_recipient: '0x0000000000000000000000000000000000000000',
//   merkle: {},
//   symbol: ''
// }
