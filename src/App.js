import './App.css';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { useState } from 'react';

function App() {
  const formSchema = yup.object().shape({
    nickname: yup.string().max(18, "Número de caracteres excedido").required("Nickname obrigatório"),
    email: yup.string().required("Email obrigatório").email("Email inválido"),
    password: yup.string().required("Senha obrigatória").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Mínimo 8 caracteres, pelo menos uma letra maiúscula, uma mínuscula, um número e um caracter especial"),
    confirmpassword: yup.string().oneOf([yup.ref('password'), null], "As senhas devem ser iguais"),
    pokemon: yup.string().required("Pokémon obrigatório"),
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
    <div className="container">
      <h3>Formulário do Mestre Pokémon</h3>
      <form className="form" onSubmit={handleSubmit(onSubmitFunction)}>
        <input placeholder="Nickname" {...register("nickname")}/>
        {errors.nickname?.message}
        <input placeholder="Email" {...register("email")}/>
        {errors.email?.message}
        <input placeholder="Senha" {...register("password")}/>
        {errors.password?.message}
        <input placeholder="Confirmar senha" {...register("confirmpassword")}/>
        {errors.confirmpassword?.message}
        <input placeholder="Pokémon favorito" {...register("pokemon")}/>
        {errors.pokemon?.message}
        <input placeholder="Região favorita" {...register("region")}/>
        {errors.region?.message}
        <input placeholder="Insignías conquistadas" {...register("badges")}/>
        {errors.badges?.message}
        <button type="submit">Enviar</button>
      </form>
      <div>
        {card.map((item, i) => {
          return <div key={i}>Olá, {item.nickname}! Você foi registrado com o email: {item.email} e com a senha: {item.password}. Fique tranquilo! Só você pode ver isso. Acabei de ver que seu pokémon favorito é {item.pokemon}! É uma ótima escolha. Espero que você consiga se divertir na nova região de {item.region} e tente aumentar o seu número de insígnias! {item.badges} não é o bastante!</div>
        })}
      </div>
    </div>
  );
}

export default App;
