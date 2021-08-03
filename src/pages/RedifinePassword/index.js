
import React, { useCallback, useRef } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
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


const RedifinePassword = () => {
  const formRef = useRef(null);

  const history = useHistory();

  const {pathname} = useLocation();
  const [, , id] = pathname.split("/")

  const handleSubmit = useCallback(async (data) => {
    
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        password: Yup.string().required('Senha obrigatória'),
        confirmPassword: Yup.string().required('Corfimação de senha obrigatória')
      });

      await schema.validate(data, { abortEarly: false });

      if(data.password !== data.confirmPassword) {
        toast.error('Senhas não coincidem!');
      } else {

        await api.post('/users/forgot', {
          token: String(id),
          password: data.password,
        });

        toast.success('Senha alterada com sucesso');

        history.push("/");
      }
    } catch (err) {   
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors);
        console.log(err);
        return;
      }
      toast.error('Link expirado! Tente enviar um email novamente');

    }
  }, [])
  return (
    <Container>
      <RightSide>
        <div className="blue-background" />
        <div className="nav">
          <span>Login</span>
          <Link to="/about">Sobre o sistema</Link>
        </div>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Alterar senha</h1>
            <p>
              Por favor insira a nova senha de acesso ao sistema
            </p>
            <span>Nova senha</span>
            <Input name="password" type="password" icon={FiLock} />

            <span>Confirmar nova senha</span>
            <Input name="confirmPassword" type="password"  icon={FiLock} />
            
            <div className="buttons-form">
              <Link to="/forget-password">Voltar</Link>
              <Button type="submit">Salvar</Button>
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

export default RedifinePassword;