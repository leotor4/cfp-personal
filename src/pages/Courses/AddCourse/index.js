import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { toast } from "react-toastify";

import Header from "../../../components/HeaderJS";
import Modal from "../../../components/Modal";
import FormInput from "../../../components/FormInput";

import api from "../../../services/api";
import getValidationErrors from "../../../utils/getValidationErrors";
import ColorRandom from "../../../utils/ColorRandom";

import { Container, Content } from "./styles";

const AddCourse = () => {
  const formRef = useRef(null);
  const [toggleModal, setToggleModal] = useState(false);
  const [courseName, setCourseName] = useState();
  const [courseColor, setCourseColor] = useState();
  const [randomize, setRandomize] = useState(0);


  const token = localStorage.getItem("@CFP:token");

  const history = useHistory();

  const handleCourse = async (data) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        workload: Yup.number("Insira uma carga horária válida").required(),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post(
        "courses",
        {
          name: data.name,
          workload: data.workload,
          color: courseColor,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Curso criado com sucesso!");

      history.push("/courses");
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        console.log(err);
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }
      toast.error("Erro ao criar um novo curso. Por favor, tente novamente.");
    }
  };

  useEffect(()=>{
  setCourseColor(ColorRandom());
  console.log(courseColor);
  },[randomize])

  return (
    <>
      <Modal
        show={toggleModal}
        onClose={() => setToggleModal(false)}
        title="Encerrar cadastro"
        bodyText="Você está saindo sem adicionar o novo curso. Deseja mesmo encerrar o formulário?"
        buttonRight="Encerrar"
        path="/courses"
      />
      <Container>
        <Header title="Cursos" />
        <Content>
          <div className="first-line">
            <p>Aqui você adicionará as informações primárias do curso.</p>

            <br />
            <p>
              Após isso, você poderá adicionar e gerenciar as turmas <br />
              que serão ofertadas desse curso na aba Classes.
            </p>

            <br />
          </div>
          <Form ref={formRef} onSubmit={handleCourse} autoComplete="off">
            <div className="line-form">
              <div className="form-input">
                <label>Nome do curso</label>
                <FormInput name="name" handleChange={(value)=>{setCourseName(value)}} placeholder=" Ex: Contabilidade" />
              </div>
              <div className="form-input">
                <label>Carga Horária</label>
                <FormInput name="workload" type="number" className="small" placeholder=" Ex: 60 (horas)" />
              </div>
            </div>
            {/*  ========================= Visualização do Dashboard ============================================== */}

            {/* Desabilitado: as cores não serão mais geradas para cada curso */}
            
            {/* <div className="first-line">
              <br />
              Visualização do curso na tela de dashboard:
              <div className="dashboard-fragment">
                <div id="graphic-section">
                  <div className="graph-header">Nº de Alunos - Curso</div>
                  <div id="list-section">
                    <div
                      className="list-line"
                      style={{
                        textOverflow: "ellipsis",
                      }}
                    >
                      <div className="fixed-background">
                        <div
                          className="relative-background"
                          style={{
                            background: `${courseColor}`,
                            width: `50%`,
                          }}
                        >
                          <p className="class-line">10 - {courseName}</p>
                        </div>
                      </div>
                    </div>
                    <div className="randomize" onClick={()=>{setRandomize(randomize+1)}}> Randomize </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="buttons-form">
              <button type="button" onClick={() => setToggleModal(true)}>
                Voltar
              </button>
              <button type="submit">Adicionar</button>
            </div>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default AddCourse;
