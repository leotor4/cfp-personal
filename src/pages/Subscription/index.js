import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

import api from "../../services/api";

import FormInput from "../../components/FormInput";
import Loader from "../../components/Loader";
import FormSelect from "../../components/FormSelect";
import UnformSelector from "../../components/UnformSelect";

import getValidationErrors from "../../utils/getValidationErrors";
import DataSurvey from "../../utils/DataSurvey";

import logov2 from "../../assets/icons/logov2.png";

import { Container, Content, FormContainer } from "./styles";

const Subscription = () => {
  const formRef = useRef(null);

  const history = useHistory();

  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [optionsCourses, setOptionsCourses] = useState([]);
  const [optionsClasses, setOptionsClasses] = useState([]);
  const [specialAttention, setSpecialAttention] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [work, setWork] = useState(false);
  const [coursesHere, setCoursesHere] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [temp, setTemp] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const onChangeValue = (event) => {
    if (event.target.name === "specialAttention")
      setSpecialAttention(event.target.value);
    if (event.target.name === "work") setWork(event.target.value);
    else setCoursesHere(event.target.value);
  };

  useEffect(() => {
    api
      .get("courses")
      .then((res) => {
        res.data.data.map((course) => {
          const d = new Date();
          // console.log(course.classes.filter((classe) => classe.active))
          // console.log(
          //   course.classes[0].period.start,
          //   "a",
          //   d
          // );
          return course.classes.length !== 0
            ? course.classes.findIndex((classe) => classe.active) !== -1
              ? course.classes
                  .filter((classe) => classe.active)
                  .findIndex(
                    (classe) =>
                      Date.parse(classe.period.start) > Date.parse(new Date())
                  ) !== -1
                ? optionsCourses.push({ value: course.id, label: course.name })
                : null
              : null
            : null;
        });
      })
      .catch((err) => {
        toast.error("Erro ao carregar cursos");
        console.log(err);
      });
  }, []);

  const getClasses = async () => {
    api
      .get("classes")
      .then((res) => {
        // console.log(res.data.data
        //   .filter(
        //     (classObject) => classObject.course.id === selectedCourse.value
        //   ).filter((classObject) => classObject.active).filter(classObject => Date.parse(classObject.period.start) > Date.parse(new Date())))
        res.data.data
          .filter(
            (classObject) => classObject.course.id === selectedCourse.value
          ).filter((classObject) => classObject.active)
          .filter(classObject => Date.parse(classObject.period.start) > Date.parse(new Date()))
          .map((classObject) =>
            optionsClasses.push({
              value: classObject.id,
              label: `${classObject.schedule} - ${classObject.shift}`,
            })
          );
        if (optionsClasses.length !== 0) {
          setIsDisabled(false);
        }
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
    try {
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

      api
        .post("students", studentData, {})
        .then((res) => {
          api
            .post("studentclasses", {
              classe_id: data.class,
              student_id: res.data.data.id,
            })
            .then((result) => {
              toast.success("Inscrição realizada com sucesso");
              history.push("/subscription-feedback");
            })
            .catch((error) => {
              api.delete(`students/${res.data.data.id}`);
              setLoadingSubmit(false);
              toast.error(
                "Erro ao realizar inscrição. Por favor, tente novamente."
              );
            });
        })
        .catch((err) => {
          toast.error(
            "Erro ao realziar inscrição. Por favor, tente novamente."
          );
        });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        toast.error("Por favor preencha todos os campos");
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        setLoadingSubmit(false);
        return;
      }
      toast.error(
        "Erro ao se inscrever em um curso.Por favor, tente novamente"
      );
      setLoadingSubmit(false);
    }
  };

  return (
    <Container>
      <img src={logov2} alt="Logo" id="logov2" />
      <div className="blur-background" />

      <Content>
        <header>
          <h1>Inscrição</h1>
          <p>Coloque suas informações aqui para se inscrever em algum curso!</p>
        </header>
        <FormContainer ref={formRef} onSubmit={handleSubmit}>
          <div className="left-side">
            <div className="form-input">
              <label>Nome</label>
              <FormInput name="name" color="secondary" />
            </div>
            <div className="form-input">
              <label>Email</label>
              <FormInput name="email" color="secondary" />
            </div>
            <div className="form-input medium">
              <label>CPF</label>
              <FormInput name="cpf" mask="999.999.999-99" color="secondary" />
            </div>
            <div className="form-input medium">
              <label>Data de Nascimento</label>
              <FormInput name="birthdate" mask="99/99/9999" color="secondary" />
            </div>
            <div className="form-input medium">
              <label>Telefone</label>
              <FormInput
                name="phone"
                mask="(99) 99999-9999"
                color="secondary"
              />
            </div>
            <div className="form-input medium">
              <label>CEP</label>
              <FormInput
                name="address.zipcode"
                mask="99999-999"
                color="secondary"
              />
            </div>
            <div className="line-form">
              <div className="form-input">
                <label>Rua</label>
                <FormInput name="address.street" color="secondary" />
              </div>

              <div className="form-input">
                <label>Número</label>
                <FormInput
                  className="small"
                  type="tel"
                  name="address.number"
                  color="secondary"
                />
              </div>
            </div>
            <div className="line-form">
              <div className="form-input">
                <label>Bairro</label>
                <FormInput name="address.neighborhood" color="secondary" />
              </div>

              <div className="form-input">
                <label>Complemento</label>
                <FormInput
                  className="small"
                  name="address.complement"
                  color="secondary"
                />
              </div>
            </div>
          </div>

          <div className="right-side">
            <div className="form-input">
              <label>Curso</label>
              <UnformSelector
                name="course"
                options={optionsCourses}
                placeholder="Selecione um curso"
                onChange={(value) => setSelectedCourse(value)}
              />
            </div>
            <div className="form-input">
              <label>Classe</label>
              <UnformSelector
                isDisabled={isDisabled}
                name="class"
                options={optionsClasses}
                placeholder="Selecione uma classe"
                // onLoad={console.log(optionsClasses)}
              />
            </div>
            <div className="form-input">
              <label>Escolaridade</label>
              <FormSelect name="survey" color="secondary">
                <option hidden value="">
                  Selecione o nível de escolaridade
                </option>
                <option value="0">Ensino médio cursando</option>
                <option value="1">Ensino médio completo</option>
                <option value="2">Ensino superior cursando</option>
                <option value="3">Ensino superior completo</option>
              </FormSelect>
            </div>

            <div>
              <p>Você precisa de alguma atenção especial?</p>
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
            <div>
              <p>Você trabalha?</p>
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
            <div>
              <p>Já fez algum curso CFP antes?</p>
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
            <footer>
              {loadingSubmit?
            <button type ="button"><Loader/> </button>
            :
              <button type="submit"> Enviar </button>
              }
            </footer>
          </div>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default Subscription;
