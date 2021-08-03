import React from 'react';
import { useLocation } from "react-router-dom";

import logov2 from '../../../assets/icons/logov2.png'
import loginImg from '../../../assets/Ilustracao-do-Login.png';

import { Wrapper, LeftSide } from './styles';

const AuthLayout = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <Wrapper>
      {pathname === "/subscription" || pathname === "/subscription-feedback" ? (
        <>
          {children}
        </>
      ) : (
        <>
          <LeftSide>
            <img src={logov2} alt="Logo" id="logov2" />
            <img src={loginImg} alt="Ilustração" id="ilusLogin" />

            <h1>Sistema Administrativo do CFP</h1>
            <p>Uma plataforma criada com o objetivo de facilitar a gerência e o recolhimento de dados relativos ao Centro de Formação Profissional.</p>

          </LeftSide>
          {children}
        </>
      )}
    </Wrapper>
  );
}

export default AuthLayout;