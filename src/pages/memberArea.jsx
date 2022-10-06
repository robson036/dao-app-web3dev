import useDaoTokens from "../hooks/useDaoTokens"
import { AddressZero } from "@ethersproject/constants"
import { useAddress, useToken, useVote } from "@thirdweb-dev/react"

const MemberArea = () => {
    const {
        memberList,
        shortenAddress,
        setIsVoting,
        proposals,
        setHasVoted,
        isVoting,
        hasVoted
    } = useDaoTokens()

    const token = useToken("0xeE35aa9ac05788F56911795C85BC4aA124231CD6")
    const address = useAddress()
    const vote = useVote("0x4368eE0cD41d1De519955Ee74d67D0858a65eC56")

    return (
        <div className="member-page">
            <h1>🥩 Página dos membros da DAO</h1>
            <p>Parabéns por fazer parte desse clube de investidores!</p>

            <div>
                <div>
                    <h2>Lista de membros</h2>
                    <table className="card">
                        <thead>
                            <tr>
                                <th>Endereço</th>
                                <th>Quantidade de tokens</th>
                            </tr>
                        </thead>
                        <tbody>
                            {memberList.map(member => {
                                return (
                                    <tr>
                                        <td>
                                            {shortenAddress(member.address)}
                                        </td>
                                        <td>{member.tokenAmount}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h2>Propostas Ativas</h2>
                    <form
                        onSubmit={async e => {
                            e.preventDefault()
                            e.stopPropagation()

                            //antes de fazer as coisas async, desabilitamos o botão para previnir duplo clique
                            setIsVoting(true)

                            // pega os votos no formulário
                            const votes = proposals.map(proposal => {
                                const voteResult = {
                                    proposalId: proposal.proposalId,
                                    //abstenção é a escolha padrão
                                    vote: 2
                                }
                                proposal.votes.forEach(vote => {
                                    const elem = document.getElementById(
                                        proposal.proposalId + "-" + vote.type
                                    )

                                    if (elem.checked) {
                                        voteResult.vote = vote.type
                                        return
                                    }
                                })
                                return voteResult
                            })

                            // certificamos que o usuário delega seus tokens para o voto
                            try {
                                //verifica se a carteira precisa delegar os tokens antes de votar
                                const delegation = await token.getDelegationOf(
                                    address
                                )
                                // se a delegação é o endereço 0x0 significa que eles não delegaram seus tokens de governança ainda
                                if (delegation === AddressZero) {
                                    //se não delegaram ainda, teremos que delegar eles antes de votar
                                    await token.delegateTo(address)
                                }
                                // então precisamos votar nas propostas
                                try {
                                    await Promise.all(
                                        votes.map(
                                            async ({
                                                proposalId,
                                                vote: _vote
                                            }) => {
                                                // antes de votar, precisamos saber se a proposta está aberta para votação
                                                // pegamos o último estado da proposta
                                                const proposal = await vote.get(
                                                    proposalId
                                                )
                                                // verifica se a proposta está aberta para votação (state === 1 significa está aberta)
                                                if (proposal.state === 1) {
                                                    // se está aberta, então vota nela
                                                    return vote.vote(
                                                        proposalId,
                                                        _vote
                                                    )
                                                }
                                                // se a proposta não está aberta, returna vazio e continua
                                                return
                                            }
                                        )
                                    )
                                    try {
                                        // se alguma proposta está pronta para ser executada, fazemos isso
                                        // a proposta está pronta para ser executada se o estado é igual a 4
                                        await Promise.all(
                                            votes.map(
                                                async ({ proposalId }) => {
                                                    // primeiro pegamos o estado da proposta novamente, dado que podemos ter acabado de votar
                                                    const proposal =
                                                        await vote.get(
                                                            proposalId
                                                        )

                                                    //se o estado é igual a 4 (pronta para ser executada), executamos a proposta
                                                    if (proposal.state === 4) {
                                                        return vote.execute(
                                                            proposalId
                                                        )
                                                    }
                                                }
                                            )
                                        )
                                        // se chegamos aqui, significa que votou com sucesso, então definimos "hasVoted" como true
                                        setHasVoted(true)
                                        console.log("votado com sucesso")
                                    } catch (err) {
                                        console.error(
                                            "falha ao executar votos",
                                            err
                                        )
                                    }
                                } catch (err) {
                                    console.error("falha ao votar", err)
                                }
                            } catch (err) {
                                console.error("falha ao delegar tokens")
                            } finally {
                                // de qualquer modo, volta isVoting para false para habilitar o botão novamente
                                setIsVoting(false)
                            }
                        }}
                    >
                        {proposals.map(proposal => (
                            <div key={proposal.proposalId} className="card">
                                <h5>{proposal.description}</h5>
                                <div>
                                    {proposal.votes.map(({ type, label }) => {
                                        const translations = {
                                            Against: "Contra",
                                            For: "A favor",
                                            Abstain: "Abstenção"
                                        }
                                        return (
                                            <div key={type}>
                                                <input
                                                    type="radio"
                                                    id={
                                                        proposal.proposalId +
                                                        "-" +
                                                        type
                                                    }
                                                    name={proposal.proposalId}
                                                    value={type}
                                                    //valor padrão "abster" vem habilitado
                                                    defaultChecked={type === 2}
                                                />
                                                <label
                                                    htmlFor={
                                                        proposal.proposalId +
                                                        "-" +
                                                        type
                                                    }
                                                >
                                                    {translations[label]}
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ))}
                        <button disabled={isVoting || hasVoted} type="submit">
                            {isVoting
                                ? "Votando..."
                                : hasVoted
                                ? "Você já votou"
                                : "Submeter votos"}
                        </button>
                        {!hasVoted && (
                            <small>
                                Isso irá submeter várias transações que você
                                precisará assinar.
                            </small>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default MemberArea
