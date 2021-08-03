import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'

import { Container, Content } from './styles';

function CertificateHTML({name, course, start, end, workload, workloadExt}) {
  const date = new Date();
  const formatedDate = format(date, `dd 'de' MMMM 'de' yyyy`, { locale: ptBR })
  return (
    <Container>
      <Content>
        <h1>CERTIFICADO</h1>
        <div id="text">
          <p>Certificamos que <b> {name} </b> participou do Curso de
            <b> {course}, </b>
            realizado nesta Universidade por meio do Centro de Formação Profissional, no período de
            <span> {start} </span> a
            <span> {end} </span>, com carga horária
            total de <span>{workload} </span> (<span>{workloadExt}</span>) horas-aula.
          </p>
          <p id="date"><b>Fortaleza, {formatedDate}</b>
          </p>
        </div>
        <div className="signatures">
          <div id="signature1">
            <img src="https://cdn.discordapp.com/attachments/689530037464334630/784431010930360331/marcus.JPG"
              alt="assinatura falhou" />
            <p id="prof1">Prof. Marcus Maurícius Holanda</p>
            <p id="position1">Chefe da Divisão de Responsabilidade Social</p>
          </div>

          <div id="signature2">
            <img src="https://cdn.discordapp.com/attachments/689530037464334630/784431089460445185/randal.JPG"
              alt="assinatura falhou" />
            <p id="prof2">Prof. Randal Martins Pompeu</p>
            <p id="position2">Vice Reitor de Extensão e Comunidade Universitária</p>
          </div>
        </div>
      </Content>
    </Container>
  );
}

export default CertificateHTML;