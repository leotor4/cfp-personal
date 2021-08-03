
import React from 'react';
import { Link } from 'react-router-dom';

import uniforB from '../../assets/icons/uniforB.png';
import dtecB from '../../assets/icons/DtecB.png';

import { Container, Content, RightSide } from './styles';
import HeaderJS from "../../components/HeaderJS";

const AboutLogged = () => {


  return (
    <Container>
      <HeaderJS />
      <RightSide>
        <Content>
        <p>
              O Centro de Formação Profissional (CFP) é uma iniciativa da
              Fundação Edson Queiroz com objetivo de promover a formação
              profissional de pessoas da comunidade e sua inserção no mercado de
              trabalho por meio da oferta de cursos técnicos e
              profissionalizantes gratuitos. Vinculados à Vice-Reitoria de
              Extensão da Unifor, por meio da Divisão de Responsabilidade
              Social, os cursos têm como monitores alunos dos cursos de
              graduação da Unifor e já beneficiaram milhares de pessoas.
              </p>
              
              <p>
              O sistema de controle e gestão do CFP foi idealizado e desenvolvido pelo time de desenvolvimento da Unifor, com o intuito de facilitar o acesso e a administração de cursos e inscrições.
            </p>
              
              <div className="participants">
                <div className="teachers">
                  <strong>Professores: </strong>
                  <span>Prof. Randal Pompeu</span>
                  <span>Prof. Marcos Holanda</span>
                </div>

                <div className="students">
                <strong>Alunos: </strong>
                <span>Deborah Baltasar</span>
                <span>Gabriel Cordeiro</span>
                <span>Jonas Timbaúba</span>
                <span>Yuri Nekan</span>
              </div>
              <div className="students">
                <strong><br /></strong>
                <span>Wilson Macedo</span>
                <span>Samuel Façanha </span>
                <span>Isaque Soares</span>
              </div>
              </div>
              <div className="footer">
          <img src={uniforB} alt="Logo da Unifor" />
          <img src={dtecB} alt="Logo da DTEC" />
        </div>
        </Content>

        
      </RightSide>
    </Container>
  );
}

export default AboutLogged;