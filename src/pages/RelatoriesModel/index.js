import React, { useState } from "react";
import Header from "../../components/HeaderJS";

import DownloadIcon from "../../assets/icons/Download.svg";

import { Container, Content, LeftSide, RightSide, ReportButton } from "./styles";

import ReportModal from "../../components/ReportModal";

export default function Relatories() {
  const [toggleModal, setToggleModal] = useState(false);
  const [isSelected, setIsSelected] = useState([false, false, false]);
  const [reportType, setReportType] = useState("");

  const handleModal = (type) => {
    setToggleModal(true);
    if(type === 1) {
      setReportType('Relatório Anual');
      setIsSelected([true, false, false])
    }

    if(type === 2) {
      setReportType('Curso Específico');
      setIsSelected([false, true, false])
    }

    if(type === 3) {
      setReportType('Perfil do Aluno');
      setIsSelected([false, false, true])
    }
  }
  return (
    <>
    <ReportModal
      show={toggleModal}
      onClose={() => setToggleModal(false)}
      type={reportType}
    />
      <Container>
        <Header />
        <Content>
          <LeftSide>
            <p>Selecione um modelo de relatório</p>
            <div className="relatories">
              <ReportButton
                onClick={() => handleModal(1)}
                selected={isSelected[0]}
              >
                <div className="report"></div>
                <span>Relatório Anual</span>
              </ReportButton>
              <ReportButton 
                onClick={() => handleModal(2)}
                selected={isSelected[1]} 
              >
                <div className="report"></div>
                <span>Curso Específico</span>
              </ReportButton>
              <ReportButton 
                onClick={() => handleModal(3)}
                selected={isSelected[2]} 
              >
                <div className="report"></div>
                <span>Perfil do aluno</span>
              </ReportButton>
            </div>

            <div className="options">
              <p>Últimos três relatórios</p>
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

          </LeftSide>
          <RightSide>
            <div className="pdf-preview">
              <p>Pré-visualização</p>
              <div className="pdf-field">
                <div className="temporary-pdf">
                  <p>Selecione um modelo de relatório ao lado para visualizá-lo</p>
                </div>

                <button>
                  <span>Baixar Relatório</span>
                  <img src={DownloadIcon} alt="Download" />
                </button>
              </div>
            </div>
          </RightSide>
        </Content>
      </Container>
    </>
  );
}