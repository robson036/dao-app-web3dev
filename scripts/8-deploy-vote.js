import sdk from "./1-initialize-sdk.js"
;(async () => {
    try {
        const voteContractAddress = await sdk.deployer.deployVote({
            // Dê um nome para o seu contrato de governança.
            name: "ExtractoDAO - A DAO do Agro",

            // Essa a localização do seu token de governança, nosso contrato ERC-20!
            voting_token_address: "0xeE35aa9ac05788F56911795C85BC4aA124231CD6",

            // Depois de uma proposta ser criada, quando os membros podem começar a votar?
            // Por agora, colocamos isso como imediatamente.
            voting_delay_in_blocks: 0,

            // Por quanto tempo membros podem votar em uma proposta quando ela é criada?
            // Aqui, nós configuramos como 1 dia (6570 blocos)
            voting_period_in_blocks: 6570,

            // A % mínima da oferta total que precisa votar
            // para que a proposta sejá válida
            voting_quorum_fraction: 0,

            // Qual a # mínima de tokens que um usuário precisa para poder criar uma proposta?
            // Eu coloco 0. Significando que nenhum token é necessário para um usuário poder
            // criar uma proposta.
            proposal_token_threshold: 0
        })

        console.log(
            "✅ Módulo de votos implantado com sucesso no endereço:",
            voteContractAddress
        )
    } catch (error) {
        console.error("Falha ao implantar o módulo de votos", error)
    }
})()

// 👋 SDK inicializado pelo endereço: 0x61839Df242801888ECA001246269D0C747c434Ee
// ✅ Módulo de votos implantado com sucesso no endereço: 0x4368eE0cD41d1De519955Ee74d67D0858a65eC56
