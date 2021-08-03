import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";

import Header from "../../../components/HeaderJS";
import Modal from "../../../components/Modal";
import ModalAdd from "../../../components/ModalAdd";

import api from "../../../services/api";

import { Container, Content } from "./styles";

function initialState() {
  return {
    name: "",
    enrollment: "",
    email: "",
    cpf: "",
    type: 1,
    password: "123456",
    phone: "",
    address: {
      street: "",
      number: 0,
      neighborhood: "",
      complement: "",
      zipcode: "",
    },
    birthdate: "",
  };
}

const AddAdmin = () => {
  const [values, setValues] = useState(initialState);
  const [toggleModalBack, setToggleModalBack] = useState(false);
  const [toggleModalAdd, setToggleModalAdd] = useState(false);

  const token = localStorage.getItem("@CFP:token");

  const history = useHistory();

  const onChange = (e) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (name === "street") {
      setValues({
        ...values,
        address: {
          ...values.address,
          [name]: value,
        },
      });
    }
    if (name === "number") {
      setValues({
        ...values,
        address: {
          ...values.address,
          [name]: Number(value),
        },
      });
    }
    if (name === "complement") {
      setValues({
        ...values,
        address: {
          ...values.address,
          [name]: value,
        },
      });
    }
    if (name === "zipcode") {
      setValues({
        ...values,
        address: {
          ...values.address,
          [name]: value,
        },
      });
    }
    if (name === "neighborhood") {
      setValues({
        ...values,
        address: {
          ...values.address,
          [name]: value,
        },
      });
    }
  };

  const handleNewAdm = async (e) => {
    e.preventDefault();

    const data = values;
    console.log(data)
    try {
      await api.post("users", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setToggleModalAdd(true)
      toast.success("Administrador criado com sucesso!");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao criar um novo admin. Por favor, tente novamente.");
    }
  };

  return (
    <>
      <Modal
        show={toggleModalBack}
        onClose={() => setToggleModalBack(false)}
        title="Encerrar cadastro"
        bodyText="Você está saindo sem adicionar o novo administrador. Deseja mesmo encerrar o formulário?"
        buttonRight="Encerrar"
      />
      <ModalAdd
        show={toggleModalAdd}
        onClose={() => setToggleModalAdd(false)}
        title="Adicionar Administrador"
        bodyText={`Usuário "${values.email}" criado com a senha padrão: "123456"`}
        buttonName="OK"
        historyPush="/admins"
      />
      

      <Container>
        <Header />
        <Content>
          <form onSubmit={handleNewAdm}>
            <div className="form-body">

            <div className="line-form">
              <div className="form-input">
                <label>Nome completo</label>
                <input onChange={onChange} name="name" value={values.name} />
              </div>

              <div className="form-input">
                <label>Email</label>
                <input onChange={onChange} name="email" value={values.email} />
              </div>

              <div className="form-input">
                <label>Telefone</label>
                <InputMask
                  name="phone"
                  mask="(99) 99999-9999"
                  maskChar=""
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="line-form">
              <div className="form-input">
                <label>Data de nascimento</label>
                <input
                  name="birthdate"
                  type="date"
                  onChange={onChange}
                  value={values.birthdate}
                />
              </div>

              <div className="form-input">
                <label>CPF</label>
                <InputMask
                  name="cpf"
                  mask="999.999.999-99"
                  maskChar=""
                  onChange={onChange}
                />
              </div>

              <div className="form-input">
                <label>Matrícula</label>
                <input
                  onChange={onChange}
                  name="enrollment"
                  value={values.enrollment}
                />
              </div>
              
            </div>
            <br />
            <hr />
            <br />

            <div className="line-form">
              <div className="form-input">
                <label>CEP</label>
                <InputMask
                  name="zipcode"
                  mask="99.999-999"
                  maskChar=""
                  onChange={onChange}
                />
              </div>

              <div className="form-input">
                <label>Rua</label>
                <input
                  onChange={onChange}
                  name="street"
                  value={values.street}
                />
              </div>

              <div className="form-input">
                <label>Número</label>
                <input
                  className="small"
                  onChange={onChange}
                  type="number"
                  name="number"
                  value={values.number}
                />
              </div>
            </div>

            <div className="line-form">
              <div className="form-input">
                <label>Bairro</label>
                <input
                  onChange={onChange}
                  name="neighborhood"
                  value={values.neighborhood}
                />
              </div>

              <div className="form-input">
                <label>Complemento</label>
                <input
                  onChange={onChange}
                  name="complement"
                  value={values.complement}
                />
              </div>
            </div>
          </div>

          
          <div className="buttons-form">
            <button type="button" onClick={() => setToggleModalBack(true)}>
              Voltar
            </button>
            <button type="submit">Adicionar</button>
          </div>
          </form>
        </Content>
      </Container>
    </>
  );
};

export default AddAdmin;
