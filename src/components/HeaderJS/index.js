import React, { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

import pathDivider from '../../utils/pathDivider';
import label from '../../labels';
import dropdownImg from "../../assets/icons/dropdown.png";

import { useAuth } from '../../hooks/auth';

import { HeaderComponent, Popover, TrailLink } from "./styles";
import { toast } from "react-toastify";

export default function HeaderJS(props) {
  const [flag, setFlag] = useState(false);

  const { signOut } = useAuth();

  const name = localStorage.getItem('@CFP:name')
  const typeUser = localStorage.getItem('@CFP:type')

  const { pathname } = useLocation();
  let paths = pathDivider(pathname)

  function openMenu() {
    setFlag(!flag);
  }

  return (
    <HeaderComponent>
      <div className="trail-container">
        {paths.map(path => (
          <Fragment key={path.path}>
            <TrailLink to={`${path.path}`}>{label['paths'][`${path.label}`]}</TrailLink>
            <FiChevronRight size={32} />
          </Fragment>
        ))}

      </div>

      <div>
        <div className={flag ? "name active" : "name"}>

          <strong>{name}</strong>
          <img onClick={openMenu} src={dropdownImg} alt="Abrir menu" />

        </div>
        
        {typeUser === "0" && <p>S. Adminstrador</p>}
        {typeUser === "1" && <p>Adminstrador</p>}
        {typeUser === "2" && <p>Instrutor</p>}

        <Popover isFocused={flag}>
          {flag &&
            <>
              <Link to="/change-password">Alterar senha</Link>
              <br />
              <Link to="/about-l">Sobre o sistema</Link>
              <br />
              <Link 
              onClick={
                () => {
                  signOut();
                  toast('🎯️ Até mais!')
              }} to="/">
                Sair
              </Link>
            </>
          }

        </Popover>

      </div>
    </HeaderComponent>
  );
}
