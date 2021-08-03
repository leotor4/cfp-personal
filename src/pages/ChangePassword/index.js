import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { toast } from 'react-toastify';
// import $ from 'jquery';
// import { Container, RightSide } from '../Login/styles'
import { ToastWrong, ToastRight, Container, RightSide } from "./styles";
// import LeftSide from '../../components/LeftSide'

import uniforW from "../../assets/icons/uniforW.png";
import dtecW from "../../assets/icons/DtecW.png";
import { Link } from "react-router-dom";
import HeaderJS from "../../components/HeaderJS";

function initialState() {
  return { password: "", passwordResult: "" };
}


export default function RedefinePassword() {
  const [values, setValues] = useState(initialState);
  const [flagRight, setFlagRight] = useState(false);
  const [flagWrong, setFlagWrong] = useState(false);
  const [pass, setPass] = useState("");

  const history = useHistory();

  const userID = JSON.parse(localStorage.getItem("@CFP:user")).id;
  const userMail = JSON.parse(localStorage.getItem("@CFP:user")).email;


  let i1, i2, mail;
  function onChange(e) {
    i1 = document.getElementById("pass1");
    i2 = document.getElementById("pass2");
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setPass(value);
  }

  function passwordMatchCheck(pass, pass2) {
    if (pass === pass2) return true;
    else return false;
  }
  function passwordLengthCheck(pass) {
    if (pass.length > 5) return true;
    else return false;
  }

  function mailCheck(email) {
    if (email === userMail) return true;
    else return false;
  }

  async function resetPassword(v) {
    const passwordResult = pass;
    i1 = document.getElementById("pass1");
    i2 = document.getElementById("pass2");
    mail = document.getElementById("mail");

    let checkMail = mailCheck(mail.value)
    let checkPassMatch = passwordMatchCheck(i1.value, i2.value);
    let checkPassLength = passwordLengthCheck(i1.value);

    if (!checkPassMatch) {
      toast.error(
        `As senhas não coincidem.`
      );
    } else if (!checkPassLength) {
      toast.error(
        `A senha é muito curta.`
      );
    } else if (!checkMail) {
      toast.error(
        `E-mail inválido.`
      );
    } else {
      try {
        const data = await api.put(`/users/${userID}`, {
          "password": passwordResult,
        });

        if (!!checkPassLength && !!checkPassMatch && !!checkMail) {
          toast.success('Senha alterada com sucesso');
          history.push("/dashboard");
        };

        return { data };
      } catch (e) {
        return { error: "Houve um erro" };
      }
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    resetPassword(values);

    return setValues(initialState);
  }

  function presentToastWrong() {
    setFlagWrong(true);
    setTimeout(function () {
      setFlagWrong(false);
    }, 4000);
  }

  return (
    <Container>
        <HeaderJS />
      <RightSide>

        <div className="login">
          <h1>Por favor insira a nova senha de acesso ao sistema</h1>
          {flagWrong && (
            <ToastWrong id="toast">As senhas não coincidem!</ToastWrong>
          )}
          {flagRight && <ToastRight id="toast">Senha alterada!</ToastRight>}
          <div className="form-wrapper">
            <form onSubmit={onSubmit}>
              <div className="input-block">
                <label htmlFor="login-email">Insira seu E-mail</label>
                <input
                  type="mail"
                  id="mail"
                  name="mail"
                  onChange={onChange}
                />
              </div>
              <div className="input-block">
                <label htmlFor="login-email">Nova senha</label>
                <input
                  type="password"
                  id="pass1"
                  name="password"
                  onChange={onChange}
                />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Confirmar nova senha</label>
                <input
                  type="password"
                  id="pass2"
                  name="password"
                  onChange={onChange}
                />
              </div>
              <div id="changePass">
                <button type="button" className="btn-login" onClick={()=>history.push("/dashboard")}>Voltar</button>
                <button type="submit" className="btn-login">
                  Alterar
                </button>
              </div>
            </form>
          </div>
        </div>
      </RightSide>
      {/* <LeftSide /> */}
    </Container>
  );
}
