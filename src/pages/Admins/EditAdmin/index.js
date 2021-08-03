import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { useLocation, useHistory } from "react-router-dom";
import { parseISO, format } from "date-fns";

import { toast } from "react-toastify";

import Header from "../../../components/HeaderJS";
import Modal from "../../../components/Modal";
import Loader from "../../../components/Loader";

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

const EditAdmin = () => {
  const [values, setValues] = useState(initialState);
  const [toggleModal, setToggleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [birthdate, setBirthdate] = useState();

  const token = localStorage.getItem("@CFP:token");

  const history = useHistory();

  const { pathname } = useLocation();

  const [, , , id] = pathname.split("/");

  useEffect(() => {
    api
      .get(`users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setValues({ ...res.data.data });
      })
      .catch((err) => {
        toast.error(
          "Erro ao carregar dados do admin. Por favor, tente novamente."
        );
        history.push("/admins");
      });
  }, [id, token, history]);

  const editAdmins = async (e) => {
    e.preventDefault();

    values.birthdate = birthdate;
    const data = values;

    try {
      await api.put(`users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Administrador editado com sucesso!");

      history.push("/admins");
    } catch (err) {
      toast.error("Erro ao editar o curso. Por favor, tente novamente.");
    }
  };

  const onChange = (e) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (name === "birthdate") {
      const day = value.slice(0, 2);
      const month = value.slice(3, 5);
      const year = value.slice(6, 11);
      // console.log(new Date(year,month,day))
      setBirthdate(new Date(year, month, day));

      setValues({
        ...values,
        [name]: value,
      });
    }
    if (
      name === "zipcode" ||
      name === "neighborhood" ||
      name === "street" ||
      name === "number" ||
      name === "complement"
    ) {
      setValues({
        ...values,
        address: {
          [name]: value,
        },
      });
    }
  };

  return (
    <>
      <Modal
        show={toggleModal}
        onClose={() => setToggleModal(false)}
        title="Finalizar cadastro"
        bodyText="Você está saindo sem editar o administrador. Deseja mesmo encerrar o formulário?"
        buttonRight="Finalizar"
        path="/admins"
      />

      <Container>
        <Header />
        <Content>
          <form onSubmit={editAdmins} autoComplete="off">
            <div className="form-body">
              <div className="line-form">
                <div className="form-input">
                  <label>Nome completo</label>
                  <input onChange={onChange} name="name" value={values.name} />
                </div>

                <div className="form-input">
                  <label>Email</label>
                  <input
                    onChange={onChange}
                    name="email"
                    value={values.email}
                  />
                </div>

                <div className="form-input">
                  <label>Telefone</label>
                  <InputMask
                    name="phone"
                    mask="(99) 99999-9999"
                    maskChar=""
                    onChange={onChange}
                    value={values.phone}
                  />
                </div>
              </div>

              <div className="line-form">
                <div className="form-input">
                  <label>Data de nascimento</label>
                  <InputMask
                    name="birthdate"
                    mask="99/99/9999"
                    maskChar=""
                    onChange={onChange}
                    value={
                      values.birthdate.length > 10
                        ? format(parseISO(values.birthdate), "dd'/'MM'/'yyyy")
                        : values.birthdate
                    }
                  />
                </div>

                <div className="form-input">
                  <label>CPF</label>
                  <InputMask
                    name="cpf"
                    mask="999.999.999-99"
                    maskChar=""
                    onChange={onChange}
                    value={values.cpf}
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
                    value={values.address.zipcode}
                  />
                </div>

                <div className="form-input">
                  <label>Rua</label>
                  <input
                    onChange={onChange}
                    name="street"
                    value={values.address.street}
                  />
                </div>

                <div className="form-input">
                  <label>Número</label>
                  <input
                    className="small"
                    onChange={onChange}
                    type="number"
                    name="number"
                    value={values.address.number}
                  />
                </div>
              </div>

              <div className="line-form">
                <div className="form-input">
                  <label>Bairro</label>
                  <input
                    onChange={onChange}
                    name="neighborhood"
                    value={values.address.neighborhood}
                  />
                </div>

                <div className="form-input">
                  <label>Complemento</label>
                  <input
                    onChange={onChange}
                    name="complement"
                    value={values.address.neighborhood}
                  />
                </div>
              </div>
            </div>
            <div className="buttons-form">
              <button
                type="button"
                // className="alt-button"
                onClick={() => setToggleModal(true)}
              >
                Voltar
              </button>
              {loading ? (
                <button style={{ height: 40 }}>
                  <Loader color="black" />
                </button>
              ) : (
                <button type="submit">Salvar</button>
              )}
            </div>
          </form>
        </Content>
      </Container>
    </>
  );
};

export default EditAdmin;
