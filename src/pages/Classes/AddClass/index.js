import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { Form } from "@unform/web";
import * as Yup from "yup";
import Checkbox from "@material-ui/core/Checkbox";

import Header from "../../../components/HeaderJS";
import Modal from "../../../components/Modal";

import { Container, Content } from "./styles";

import getValidationErrors from "../../../utils/getValidationErrors";
import api from "../../../services/api";
import Select from "../../../components/Select";
import FormInput from "../../../components/FormInput";
import FormSelect from "../../../components/FormSelect";
import Loader from "../../../components/Loader";
import UnformSelector from "../../../components/UnformSelect";

const AddClass = () => {
  const formRef = useRef(null);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [parentValue, setParentValue] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  const [biggerRoom, setBiggerRoom] = useState(false);
  const [optionsCourses, setOptionsCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const token = localStorage.getItem("@CFP:token");

  useEffect(() => {
    setLoading(true);
    api
      .get("courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCourses(res.data.data);
        res.data.data.map((course) =>
          optionsCourses.push({ value: course.id, label: course.name })
        );
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Erro ao carregar cursos. Por favor tente novamente");
        history.push("/classes");
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setParentValue(String(parentValue));
  }, [parentValue]);

  const handleNewClass = async (data) => {
    parentValue && (data.schedule = parentValue);
    try {
      const schema = Yup.object().shape({
        course: Yup.string().required(),
        maxStudents: Yup.number().required(),
        schedule: Yup.string().required(),
        period: Yup.object().shape({
          start: Yup.date().required(),
          end: Yup.date().required(),
        }),
        room: Yup.string().required(),
        timetable: Yup.string().required(),
      });
      console.log(schema);

      await schema.validate(data, { abortEarly: false });

      await api.post("classes", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Classe criada com sucesso!");

      history.push("/classes");
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        console.log(err);
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);

        return;
      }
      toast.error("Erro ao criar classe. Por favor, tente novamente.");
    }
  };

  return (
    <>
      <Modal
        show={toggleModal}
        onClose={() => setToggleModal(false)}
        title="Encerrar cadastro"
        bodyText="Você está saindo sem adicionar a nova classe. Deseja mesmo encerrar o formulário?"
        buttonRight="Encerrar"
      />
      <Container>
        <Header />
        <Content>
          <Form ref={formRef} onSubmit={handleNewClass} autoComplete="off">
            <div className="line-form">
              <div className="bigger-select-form">
                <label>Nome do curso</label>
                {loading && <Loader color="blue" />}
                {!loading && (
                  <UnformSelector
                    name="course"
                    options={optionsCourses}
                    placeholder="Selecione um Curso"
                  />
                )}
              </div>
              <div className="bigger-select-form">
                <label>Dia</label>
                <Select name="schedule" setParentValue={setParentValue} />
              </div>
              <div className="smaller-select-form">
                <label>Turno</label>
                <FormSelect name="shift">
                  <option>Manhã</option>
                  <option>Tarde</option>
                  <option>Noite</option>
                </FormSelect>
              </div>

              <div className="mid-sized-input-form">
                <label>Horário</label>

                <div>
                  <FormInput
                    name="timetable"
                    mask="99:99 às 99:99"
                    placeholder="Ex:12:00 às 13:30"
                  />
                </div>
              </div>
            </div>
            <div className="line-form">
              <div className="period-form">
                <label>Período</label>
                <div>
                  <FormInput type="date" name="period.start" />
                  <label className="conective-span">a</label>
                  <FormInput type="date" name="period.end" />
                </div>
              </div>
              
              <div
                className="room-input-form"
                // style={biggerRoom ? { width: 490 } : { width: 120 }}
              >
                <label>Sala</label>
                <FormInput name="room" />
                {/* <div
                  className="check-room"
                  onClick={() => setBiggerRoom(!biggerRoom)}
                >
                  Estender
                  <Checkbox
                    value="checkedA"
                    inputProps={{ "aria-label": "Checkbox A" }}
                    className="check-room-checkbox"
                    checked={biggerRoom}
                  />
                </div> */}
              </div>
              
              <div className="smaller-input-form">
                <label>Vagas</label>

                <div>
                  <FormInput name="maxStudents" type="number" />
                </div>
              </div>
            </div>

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

export default AddClass;
