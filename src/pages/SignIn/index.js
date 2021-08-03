
import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import uniforW from '../../assets/icons/uniforW.png';
import dtecW from '../../assets/icons/DtecW.png';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Loader from '../../components/Loader';

import { useAuth } from '../../hooks/auth';

import { Container, Content, RightSide } from './styles';

const SignIn = () => {
  const formRef = useRef(null);
  const { signIn } = useAuth();
  let [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (data) => {
    setLoading(true)
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('Email obrigatório'),
        password: Yup.string().min(6, 'Senha: no mínimo 6 digitos'),
      });

      await schema.validate(data, { abortEarly: false });

      await signIn({
        email: data.email,
        password: data.password,
      });

      toast.success('🎯️  Bem-vindo ao CFP!');

    } catch (err) {
      setLoading(false)
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors);
        return;
      }
      toast.error('Email ou senha inválidos');
      formRef.current.clearField("password")
      

    }
  }, [signIn])

  return (
    <Container>
      <RightSide>
        <div className="blue-background" />
        <div className="nav">
          <span >Login</span>
          <Link to="/about">Sobre o sistema</Link>
        </div>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Bem vindo</h1>
            <p>Entre na sua conta para começar</p>
            <span>Email</span>
            <Input name="email" icon={FiMail} />
            <span>Senha</span>
            <Input type="password" name="password" icon={FiLock} />
            <Link to="/forget-password">Esqueceu a senha?</Link>
            {loading ?<Button className="loading-btn"><Loader color='blue'/></Button> : <Button type="submit">Entrar</Button>}
          </Form>

        </Content>

        <footer>
          <img src={uniforW} alt="Logo da Unifor" />
          <img src={dtecW} alt="Logo da DTEC" />
        </footer>
      </RightSide>
    </Container>
  );
}

export default SignIn;