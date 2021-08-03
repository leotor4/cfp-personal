import React from "react";
import Header from "../../components/HeaderJS";

import DownloadIcon from "../../assets/icons/Download.svg";

import { Container, Content, LeftSide, RightSide } from "./styles";

export default function Relatories() {

  return (
    <Container>
      <Header />
      <Content>
        <LeftSide>
          <p>Selecione os campos que deseja ter no relatório</p>
          <div className="options">
            <div>
              <input type="checkbox" />
              <label>Alunos</label>
            </div>

            <div>
              <input type="checkbox" />
              <label>Aprovação</label>
            </div>

         
            <div>
              <input type="checkbox" />
              <label>Idade</label>
            </div>

            <div>
              <input type="checkbox" />
              <label>Faixa Etária</label>
            </div>
          </div>

          <select>
            <option hidden>Curso(s)</option>
          </select>
          <br /><br /><br />

          <button>Gerar</button>

          <div className="pdf-field">
            <div className="temporary-pdf">

            </div>

            <button>
              <span>Baixar Relatório</span>
              <img src={DownloadIcon} alt="Download"/>
            </button>
          </div>

        </LeftSide>
        <RightSide>
          <p>Últimos três relatórios</p>
          <div className="options">
            <div>
              <span>Relatório-25/01/21</span>
              <button>Imprimir</button>
            </div>

            <div>
              <span>Relatório-25/01/21</span>
              <button>Imprimir</button>
            </div>

         
            <div>
              <span>Relatório-25/01/21</span>
              <button>Imprimir</button>
            </div>
          </div>
        </RightSide>
      </Content>
    </Container>
  );
}