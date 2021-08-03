import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "@unform/web";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { FiSearch } from "react-icons/fi";

import Header from "../../../components/HeaderJS";
import Modal from "../../../components/Modal";
import FormInput from "../../../components/FormInput";
import FormSelect from "../../../components/FormSelect";
import getValidationErrors from "../../../utils/getValidationErrors";
import DataSurvey from "../../../utils/DataSurvey";
import Loader from "../../../components/Loader";
import UnformSelector from "../../../components/UnformSelect";

import api from "../../../services/api";

import { Container, Content, LeftSide, RightSide } from "./styles";

const AddStudent = () => {
  const formRef = useRef(null);
  const [toggleModal, setToggleModal] = useState(false);
  const [courses, setCourses] = useState([]);
  const [optionsCourses, setOptionsCourses] = useState([]);
  const [optionsClasses, setOptionsClasses] = useState([]);
  const [temp, setTemp] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [specialAttention, setSpecialAttention] = useState(false);
  const [work, setWork] = useState(false);
  const [coursesHere, setCoursesHere] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [cpfValue, setCpfValue] = useState("");
  const [cpfFound, setCpfFound] = useState(false);
  const [student_id, setStudent_id] = useState("");

  
  const token = localStorage.getItem("@CFP:token");

  const history = useHistory();

  const onChangeValue = (event) => {
    if (event.target.name === "specialAttention")
      setSpecialAttention(event.target.value);
    if (event.target.name === "work") setWork(event.target.value);
    else setCoursesHere(event.target.value);
  };

  useEffect(() => {
    setLoadingCourse(true);
    api
      .get("courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCourses(res.data.data);
        res.data.data.map((course) =>
          course.classes.length !== 0
            ? course.classes.findIndex((classe) => classe.active) !== -1
              ? optionsCourses.push({ value: course.id, label: course.name })
              : null
            : null
        );
        setLoadingCourse(false);
      })
      .catch((err) => {
        toast.error("Erro ao carregar cursos");
      });
  }, []);

  const getClasses = async () => {
    api
      .get("classes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        res.data.data
          .filter(
            (classObject) => classObject.course.id === selectedCourse.value
          )
          .map((classObject) =>
            setOptionsClasses((optionsClasses) => [
              ...optionsClasses,
              {
                value: classObject.id,
                label: `${classObject.schedule} - ${classObject.shift}`,
              },
            ])
          );
        setLoadingClasses(false);
      })
      .catch((err) => {
        toast.error("Erro ao carregar classe");
      });
  };

  useEffect(() => {
    // setLoadingClasses(true);
    setOptionsClasses([]);
    setTemp(true);
  }, [selectedCourse]);

  useEffect(() => {
    if (temp) {
      getClasses();
    }
    setTemp(false);
  }, [temp]);

  const handleSubmit = async (data) => {
    setLoadingSubmit(true);
    if(cpfFound){
      console.log(selectedClass)
      console.log(student_id)
      try {
      api.post(
        `/classes/student/add/${selectedClass}`,
        { student_id: `${student_id}` },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(`Aluno vinculado com sucesso!`)
      history.goBack();
    }
     catch (err) {
      console.log(err);
      setLoadingSubmit(false);
      toast.error(
        `Erro ao vincular Aluno. Por favor, tente novamente.`
      );}
    }
    else {try {
      const schema = Yup.object().shape({
        cpf: Yup.string().required(),
        name: Yup.string().required(),
        email: Yup.string().required(),
        birthdate: Yup.string().required(),
        phone: Yup.string().required(),
        address: Yup.object().shape({
          zipcode: Yup.string().required(),
          street: Yup.string().required(),
          number: Yup.number().required(),
          neighborhood: Yup.string().required(),
          complement: Yup.string().required(),
        }),
        class: Yup.string().required(),
        course: Yup.string().required(),
        survey: Yup.string().required(),
      });

      await schema.validate(data, { abortEarly: false });

      let scholling = DataSurvey(data.survey);

      const studentData = {
        cpf: data.cpf,
        name: data.name,
        email: data.email,
        birthdate: data.birthdate,
        phone: data.phone,
        address: data.address,
        class: data.class,
        survey: {
          work,
          middleSchoolStudying: scholling.middleSchoolStudying,
          middleSchoolComplete: scholling.middleSchoolComplete,
          highSchoolStudying: scholling.highSchoolStudying,
          highSchoolComplete: scholling.highSchoolComplete,
          coursesHere: {
            answer: coursesHere,
            quantity: 1,
          },
        },

        specialAttention: specialAttention,
        isActive: false,
      };

      if (cpfValue !== 0) {
      }

      await api.post("students", studentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      history.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        console.log(err);
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        setLoadingSubmit(false);
        return;
      }
      toast.error("Erro ao criar um novo aluno. Por favor, tente novamente.");
      setLoadingSubmit(false);
    }
  }
  };

  const searchByCpf = () => {
    cpfValue.length >= 14 ?
      api
        .get("students", {
          params: {
            filter: { q: [cpfValue], qField: ["cpf"] },
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.data.length > 0) {
          formRef.current.setData(res.data.data[0]);
          setCpfFound(true)
          setStudent_id(res.data.data[0].id)
          }
          else {
            toast.error("Aluno não encontrado");
          }
        })
        .catch((err) => {
          toast.error("Erro ao carregar aluno");
        })
        : toast.error("CPF inválido");
  };

  return (
    <>
      <Modal
        show={toggleModal}
        onClose={() => setToggleModal(false)}
        title="Encerrar cadastro"
        bodyText="Você está saindo sem adicionar o novo aluno. Deseja mesmo encerrar o cadastro?"
        buttonRight="Encerrar"
      />

      <Container>
        <Header />
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit} autoComplete="off">
            <LeftSide style={cpfFound?{pointerEvents: 'none'}: null}>
              <div className="first-line-form">
                <p> Faça uma busca pelo CPF do aluno.</p>
                <p>
                  Caso ele já possua um cadastro os campos serão preenchidos
                  automaticamente. Caso não possua, basta preencher os campos
                  para adicioná-lo.
                </p>
                <br />
                <label>CPF</label>

                <div className="button-plus-input">
                  <FormInput
                    name="cpf"
                    mask="999.999.999-99"
                    value={cpfValue}
                    onChange={(e) => setCpfValue(e.target.value)}
                  />
                  <button type="button" onClick={() => searchByCpf(cpfValue)}>
                    <FiSearch color="#FFF" size={25} />
                  </button>
                </div>
              </div>

              <div id="Email-line-form">
                <div className="form-input">
                  <label>Nome completo</label>
                  <FormInput name="name" />
                </div>

                <div className="form-input">
                  <label>Email</label>
                  <FormInput name="email" />
                </div>
              </div>

              <div className="line-form">
                <div className="form-input">
                  <label>Data de nascimento</label>
                  <FormInput name="birthdate" mask="99/99/9999" />
                </div>

                <div className="form-input">
                  <label>Telefone</label>
                  <FormInput name="phone" mask="(99) 99999-9999" />
                </div>
              </div>
              <br />
              <hr />
              <br />

              <div className="line-form">
                <div className="form-input">
                  <label>CEP</label>
                  <FormInput name="address.zipcode" mask="99.999-999" />
                </div>

                <div className="form-input">
                  <label>Rua</label>
                  <FormInput name="address.street" />
                </div>

                <div className="form-input">
                  <label>Número</label>
                  <FormInput
                    className="small"
                    type="number"
                    name="address.number"
                  />
                </div>
              </div>

              <div className="line-form">
                <div className="form-input">
                  <label>Bairro</label>
                  <FormInput name="address.neighborhood" />
                </div>

                <div className="form-input">
                  <label>Complemento</label>
                  <FormInput name="address.complement" />
                </div>
              </div>
            </LeftSide>
            <RightSide optionsClasses={optionsClasses}>
              <div className="line-class-form">
                <div className="form-input">
                  <label>Curso</label>
                  {loadingCourse && <Loader color="blue" />}
                  {!loadingCourse && (
                    <UnformSelector
                      name="course"
                      options={optionsCourses}
                      placeholder="Selecione um curso"
                      onChange={(value) => setSelectedCourse(value)}
                      // onLoad={console.log(selectedCourse)}
                    />
                  )}
                </div>
                <div
                  className="form-input"
                  style={
                    optionsClasses.length > 0 ? null : { pointerEvents: "none" }
                  }
                >
                  <label>Classe</label>
                  {loadingClasses && !loadingCourse && <Loader color="blue" />}
                  {!loadingClasses && !loadingCourse && (
                    <UnformSelector
                      name="class"
                      options={optionsClasses}
                      placeholder={
                        selectedCourse === ""
                          ? "<-Selecione um curso"
                          : optionsClasses.length > 0 && selectedCourse !== ""
                          ? "Selecione uma classe"
                          : "Carregando..."
                      }
                      // onLoad={console.log(optionsClasses)}
                      onChange={e => setSelectedClass(e.value)}
                    />
                  )}
                </div>
              </div>

              <div className="line-form" style={cpfFound?{pointerEvents: 'none'}: null}>
                <div className="form-input">
                  <label>Escolaridade</label>
                  <FormSelect name="survey">
                    <option hidden value="">
                      Selecione o nível de escolaridade
                    </option>
                    <option value="0">Ensino médio cursando</option>
                    <option value="1">Ensino médio completo</option>
                    <option value="2">Ensino superior cursando</option>
                    <option value="3">Ensino superior completo</option>
                  </FormSelect>
                </div>
              </div>

              <div style={cpfFound?{pointerEvents: 'none'}: null}>
                <p>Esse aluno precisa de uma atenção especial?</p>

                <br />
                <div className="anwser" onChange={onChangeValue}>
                  <div>
                    <input type="radio" name="specialAttention" value="true" />
                    <label>Sim </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="specialAttention"
                      value="false"
                      defaultChecked
                    />
                    <label>Não </label>
                  </div>
                </div>
              </div>
              <br />
              <div style={cpfFound?{pointerEvents: 'none'}: null}>
                <p>Ele trabalha?</p>

                <br />
                <div className="anwser" onChange={onChangeValue}>
                  <div>
                    <input type="radio" name="work" value="true" />
                    <label>Sim </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="work"
                      value="false"
                      defaultChecked
                    />
                    <label>Não </label>
                  </div>
                </div>
              </div>

              <br />
              <div style={cpfFound?{pointerEvents: 'none'}: null}>
                <p>Já fez algum curso CFP antes?</p>

                <br />
                <div className="anwser" onChange={onChangeValue}>
                  <div>
                    <input type="radio" name="coursesHereState" value="true" />
                    <label>Sim </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="coursesHereState"
                      value="false"
                      defaultChecked
                    />
                    <label>Não </label>
                  </div>
                </div>
              </div>
            </RightSide>

            <div className="buttons-form">
              <button type="button" onClick={() => setToggleModal(true)}>
                Voltar
              </button>
              {loadingSubmit?
            <button type ="button"><Loader/> </button>
            :
              <button type="submit"> Adicionar </button>
              }

              {/* !loadingSubmit => loading inifinito pra testar o estilo do loader. após corrigir mudar para loadingSubmit */}
            </div>
          </Form>
        </Content>
      </Container>
    </>
  );
};

export default AddStudent;
