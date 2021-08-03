
import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import uniforW from '../../assets/icons/uniforW.png';
import dtecW from '../../assets/icons/DtecW.png';

import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api'; 

import { Container, Content, RightSide } from './styles';


const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = useCallback(async (data) => {
    try {
      setLoading(true);

      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required('Email obrigatório'),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('/forgot', {
        email: data.email,
      });


      toast.success('Email enviado com sucesso!');

    } catch (err) {
      console.log(err);
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors);

        return;
      }
      toast.error('Email inválido');

    }finally {
      setLoading(false);
    }

  }, [])

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
            <h1>Alterar senha</h1>
            <p>
              Por favor nos informe o seu e-mail de acesso ao sistema para que 
              possamos enviar um link para que você altere a sua senha.
            </p>
            <span>Email</span>
            <Input name="email" icon={FiMail} />
            
            <div className="buttons-form">
              <Link to="/">Voltar</Link>
              <Button loading={loading} type="submit">Enviar</Button>
            </div>

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

export default ForgetPassword;