import React, { useEffect, useState } from "react";


import HeaderJS from "../../components/HeaderJS";
import CertificateModel from "../../components/CertificateModel";
import Download from '../../utils/Download';
import Loader from '../../components/Loader';

import certificateIcon from '../../assets/icons/Download Certificado.svg'
import importCertificateIcon from '../../assets/icons/Importar Certificado.svg'

import { Container } from "./styles";

export default function Certificates() {
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('@CFP:token');


  const uploadCertificate = async () => {
    setLoading(true)
    await Download.downloadModel();
    setLoading(false);
  }

  return (
    <Container>
      <HeaderJS />
      <div id="header2">
        <button onClick={uploadCertificate} className={loading && "loading-button"}>
          {
            loading ?
            <>          
                <span><Loader color = 'black'/></span>
            </> :
            <>          
              <span>Baixar modelo</span>
              <img src={certificateIcon} alt="" />
            </>
          }

        </button>
        <button className="disable" >
          <span>Importar modelo</span>
          <img src={importCertificateIcon} alt=""/>
        </button>
      </div>

      <div id="model">
        <CertificateModel />
      </div>

    </Container>
  );
}