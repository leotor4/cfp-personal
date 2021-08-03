import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Form } from "@unform/web";
import { parseISO, format, addDays } from "date-fns";

import Header from "../../../components/HeaderJS";
import Loader from "../../../components/Loader";
import Modal from "../../../components/Modal";
import Select from "../../../components/Select";
import FormSelect from "../../../components/FormSelect";
import FormInput from "../../../components/FormInput";

import api from "../../../services/api";

import { Container, Content } from "./styles";

const EditClass = () => {
  const [courses, setCourses] = useState([]);
  const [parentValue, setParentValue] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState([]);

  const token = localStorage.getItem("@CFP:token");

  const history = useHistory();

  const formRef = useRef(null);

  const { pathname } = useLocation();

  const [, , , , id] = pathname.split("/");

  useEffect(() => {
    setLoading(true);
    api
      .get(`classes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let tmp = {
          ...res.data.data,
          period: {
            start: format(
              addDays(parseISO(res.data.data.period.start), 1),
              "yyyy'-'MM'-'dd"
            ),
            end: format(
              addDays(parseISO(res.data.data.period.end), 1),
              "yyyy'-'MM'-'dd"
            ),
          },
        };
        formRef.current.setData(tmp);
        let tmpSchedule = tmp.schedule;
        setSchedule(tmpSchedule);
        
      })
      .catch((err) => {
        console.log(err);
        // history.goBack();
      });
  }, []);

  useEffect(() => {
    api
      .get("courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCourses(res.data.data);
      })
      .catch((err) => {
        toast.error("Erro ao carregar cursos. POr favor tente novamente");
        // history.goBack();
      });
  }, []);
  
  useEffect(() => {
    if(schedule) {
      setLoading(false);
      // console.log('aqui')
    }

  },[schedule])

  const handleEditClasses = async (data) => {
    // console.log(parentValue);
    parentValue && (data.schedule = parentValue);

    try {
      await api.put(
        `classes/${id}`,
        {
          course: data.course_id,
          maxStudents: data.maxStudents,
          period: data.period,
          room: data.room,
          schedule: data.schedule,
          shift: data.shift,
          timetable: data.timetable,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Classe editada com sucesso!");

      history.goBack();
    } catch (err) {
      console.log(err);
      toast.error("Erro ao editar a classe. Por favor, tente novamente.");
    }
  };

  return (
    <>
      <Modal
        show={toggleModal}
        onClose={() => setToggleModal(false)}
        title="Encerrar cadastro"
        bodyText="Você está saindo sem alterar a classe. Deseja mesmo encerrar o formulário?"
        buttonRight="Encerrar"
      />
      <Container>
        <Header />
      { !loading ?
        <Content>
          <Form ref={formRef} onSubmit={handleEditClasses}>
            <div className="line-form">
              <div className="bigger-select-form">
                <span>Nome do curso</span>
                <FormSelect name="course_id">
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
                </FormSelect>
              </div>
              <div className="bigger-select-form">
                <span
                //  onLoad={console.log(schedule)}
                >
                  Dia
                </span>
                <Select
                  name="schedule"
                  initialValue={"Segunda"}
                  setParentValue={setParentValue}
                />
              </div>
              <div className="smaller-select-form">
                <span>Turno</span>
                <FormSelect name="shift">
                  <option>Manhã</option>
                  <option>Tarde</option>
                  <option>Noite</option>
                </FormSelect>
              </div>

              <div className="mid-sized-input-form">
                <span>Horário</span>

                <div>
                  <FormInput name="timetable" mask="99:99 às 99:99" />
                </div>
              </div>
            </div>
            <div className="line-form">
              <div className="period-form">
                <span>Período</span>
                <div>
                  <FormInput type="date" name="period.start" />
                  <span className="conective-span">a</span>
                  <FormInput type="date" name="period.end" />
                </div>
              </div>

              <div className="room-input-form">
                <span>Sala</span>
                <FormInput name="room" />
              </div>
              <div className="smaller-input-form">
                <span>Vagas</span>

                <div>
                  <FormInput name="maxStudents" type="number" />
                </div>
              </div>
            </div>

            <div className="buttons-form">
              <button type="button" onClick={() => setToggleModal(true)}>
                Voltar
              </button>
              <button type="submit">Salvar</button>
            </div>
          </Form>
        </Content>
      : <Loader color="black"/>}
      </Container>
    </>
  );
};

export default EditClass;
