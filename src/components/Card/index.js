import './styles.css'
import charmander from '../../assets/img/charmander.png'
import squirtle from '../../assets/img/squirtle.png'
import bulbasaur from '../../assets/img/bulbasaur.png'

const Card = ( {card} ) => {
    return (
        <div className="container_message">
                {card.map((item, i) => {
                    return <div className="message" key={i}>{card.map((item) => (item.pokemon === "Charmander" && <img src={charmander} alt="Charmander"/>) ||
                    (item.pokemon === "Squirtle" && <img src={squirtle} alt="Squirtle"/>) ||
                    (item.pokemon === "Bulbasaur" && <img src={bulbasaur} alt="Bulbasaur"/>))}<p>Olá, <b>{item.nickname}</b>! Você foi registrado com o email: <b>{item.email}</b> e senha: <b>{item.password}</b>. Mas fique tranquilo! Só você pode ver essa mensagem.</p><p>Acabei de ver que seu pokémon desejado é o <b>{item.pokemon}</b>. É uma ótima escolha! Espero que você consiga se divertir na nova região de <b>{item.region}</b> e também tente aumentar o seu número de insígnias, <b>{item.badges}</b> não me parece o bastante!</p></div>
                })}
        </div>
    )
}

export default Card