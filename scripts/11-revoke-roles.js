import sdk from "./1-initialize-sdk.js"

const token = sdk.getToken("0xeE35aa9ac05788F56911795C85BC4aA124231CD6")

;(async () => {
    try {
        // Mostre os papeis atuais.
        const allRoles = await token.roles.getAll()

        console.log("👀 Papeis que existem agora:", allRoles)

        // Remova todos os superpoderes que sua carteira tinha sobre o contrato ERC-20.
        await token.roles.setAll({ admin: [], minter: [] })

        console.log(
            "🎉 Papeis depois de remover nós mesmos",
            await token.roles.getAll()
        )

        console.log("✅ Revogados nossos super-poderes sobre os tokens ERC-20")
    } catch (error) {
        console.error(
            "Falha ao remover nossos direitos sobre o tesouro da DAO",
            error
        )
    }
})()

// 👋 SDK inicializado pelo endereço: 0x61839Df242801888ECA001246269D0C747c434Ee
// 👀 Papeis que existem agora: {
//   admin: [ '0x61839Df242801888ECA001246269D0C747c434Ee' ],
//   minter: [
//     '0x61839Df242801888ECA001246269D0C747c434Ee',
//     '0x4368eE0cD41d1De519955Ee74d67D0858a65eC56'
//   ],
//   transfer: [
//     '0x61839Df242801888ECA001246269D0C747c434Ee',
//     '0x0000000000000000000000000000000000000000'
//   ]
// }
// 🎉 Papeis depois de remover nós mesmos {
//   admin: [],
//   minter: [],
//   transfer: [
//     '0x61839Df242801888ECA001246269D0C747c434Ee',
//     '0x0000000000000000000000000000000000000000'
//   ]
// }
// ✅ Revogados nossos super-poderes sobre os tokens ERC-20
