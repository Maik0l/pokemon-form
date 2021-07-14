import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import Card from '../Card'
import "./styles.css"

const Form = () => {

    const formSchema = yup.object().shape({
        nickname: yup.string().max(18, "Número de caracteres excedido").required("Nickname obrigatório"),
        email: yup.string().required("Email obrigatório").email("Email inválido"),
        password: yup.string().required("Senha obrigatória").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Mínimo 8 caracteres, pelo menos uma letra maiúscula, uma mínuscula, um número e um caracter especial"),
        confirmpassword: yup.string().oneOf([yup.ref('password'), null], "As senhas devem ser iguais"),
        pokemon: yup.string().required("Selecione um pokémon").nullable(),
        region: yup.string().required("Região obrigatória"),
        badges: yup.number().required("Insígnias são obrigatórias").typeError("Deve-se colocar um número válido")
      })
    
      const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema),
      });
    
      const [card, setCard] = useState([]);
      const onSubmitFunction = (data) => {
        setCard([data])
      };

    return (
    <>
    <div className="container">
        <h3>Formulário do Mestre Pokémon</h3>
        <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
            <input placeholder="Nickname *" {...register("nickname")}/>
        <div className="error">{errors.nickname?.message}</div>
            <input placeholder="Email *" {...register("email")}/>
        <div className="error">{errors.email?.message}</div>
        <input placeholder="Senha *" {...register("password")}/>
        <div className="error">{errors.password?.message}</div>
            <input placeholder="Confirmar senha *" {...register("confirmpassword")}/>
        <div className="error">{errors.confirmpassword?.message}</div>
        <div className="pokecontainer">
        <p className="pokeinfochoose">Escolha um parceiro:</p>
        <div className="pokechoose">
        <input {...register("pokemon")} type="radio" name="pokemon" value="Charmander" />
        <label className="red" htmlFor="Charmander">Charmander</label>
        </div>
        <div className="pokechoose">
        <input {...register("pokemon")} type="radio" name="pokemon" value="Squirtle" />
        <label className="blue" htmlFor="Squirtle">Squirtle</label>
        </div>
        <div className="pokechoose">
        <input {...register("pokemon")} type="radio" name="pokemon" value="Bulbasaur"/>
        <label className="green" htmlFor="Bulbasaur">Bulbassaur</label>
        </div>
        </div>
          <div className="error">{errors.pokemon?.message}</div>
        <p className="pokeinfo">Escolha uma região:</p>
        <select className="pokeregion" {...register("region")}>
        <option value="Kanto">Kanto</option>
        <option value="Johto">Johto</option>
        <option value="Hoenn">Hoenn</option>
        <option value="Sinnoh">Sinnoh</option>
      </select>
          <div className="error">{errors.region?.message}</div>
        <input placeholder="Número de insignías *" {...register("badges")}/>
          <div className="error">{errors.badges?.message}</div>
        <button type="submit">Enviar</button>
      </form>
    </div>
      <Card card={card}/>
    </>
    )
}

export default Form