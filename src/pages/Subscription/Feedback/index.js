import React from 'react';


import emailIcon from '../../../assets/icons/Camada 1.svg';
import logov2 from '../../../assets/icons/logov2.png'

import { Container, Content } from './styles';

const Feedback = () => {


  return (
    <Container>
      <img src={logov2} alt="Logo" id="logov2" />
      <div className="blur-background" />

      <Content>
        <img src={emailIcon} alt="Confirmação de inscrição" />

        <h1>Confirmação de inscrição</h1>
        <p>Fique atento ao seu email, pois enviaremos informações adicionais</p>

      </Content>
    </Container>

  );
}

export default Feedback;