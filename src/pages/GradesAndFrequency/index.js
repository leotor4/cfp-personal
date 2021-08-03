import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../services/api";

import Header from "../../components/HeaderJS";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";

import { parseISO, format } from "date-fns";

import editIcon from "../../assets/icons/Editar.svg";
import deleteIcon from "../../assets/icons/Deletar.svg";
import addInstIcon from "../../assets/icons/Adicionar Instrutor.svg";
import addStutIcon from "../../assets/icons/Adicionar Aluno.svg";

import { Container, Content, ManageBody } from "./styles";

const GradesAndFrequency = () => {
  const history = useHistory();

  const [classObject, setClassObject] = useState({});
  const [course, setCourse] = useState({});
  const [vacancies, setVacancies] = useState(0);
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentClasses, setStudentClasses] = useState([]);
  const [date, setDate] = useState({ start: "", end: "" });
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleModalBack, setToggleModalBack] = useState(false);

  let token = localStorage.getItem("@CFP:token");
  const id = localStorage.getItem("classID");
  const handleDays = (daysString) => {
    let days = "";

    if (daysString !== undefined) {
      let daysArray = daysString.split(" e ");

      for (let day of daysArray) {
        if (day === "2º") days += "Segunda, ";
        if (day === "4º") days += "Quarta ";
      }
    }

    return days;
  };

  useEffect(() => {
    setLoading(true);
    api
      .get(`classes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data);
        setDate({
          start: format(parseISO(res.data.data.period.start), "dd'/'MM'/'yy"),
          end: format(parseISO(res.data.data.period.end), "dd'/'MM'/'yy"),
        });
        setClassObject(res.data.data);
        setVacancies(res.data.data.maxStudents);
        setCourse(res.data.data.course);
        setStudents(res.data.data.students);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = () => {
    let error = false;
    const data = studentClasses;


      try {
        api.put(
          `studentclasses`,
            data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.log(err);
        toast.error(
          "Erro ao adicionar notas e frequencias. Por favor, tente novamente."
        );
        error = true;
      }
    if (!error) {
      toast.success("Notas e frequencias atualizadas com sucesso!");
      history.push("/classes/manage-class")
      
    }
  }
  

  const changeGrade = (id, value) => {
    const student =
      studentClasses[
        studentClasses.map((studentClass) => studentClass.id).indexOf(id)
      ];
    studentClasses.splice(
      studentClasses.map((studentClass) => studentClass.id).indexOf(id),
      1,
      { id: id, score: parseFloat(value), frequency: student.frequency }
    );
    // console.log(
    //   "student classes id: ",
    //   studentClasses[
    //     studentClasses.map((studentClass) => studentClass.id).indexOf(id)
    //   ]
    // );
  };

  const changeFrequency = (id, value) => {
    const student =
      studentClasses[
        studentClasses.map((studentClass) => studentClass.id).indexOf(id)
      ];
    studentClasses.splice(
      studentClasses.map((studentClass) => studentClass.id).indexOf(id),
      1,
      { id: id, score: student.score, frequency: parseInt(value) }
    );
    // console.log(
    //   "student classes id: ",
    //   studentClasses[
    //     studentClasses.map((studentClass) => studentClass.id).indexOf(id)
    //   ]
    // );
  };

  return (
    <>
    <Modal
        show={toggleModalBack}
        onClose={() => setToggleModalBack(false)}
        title="Encerrar atualização"
        bodyText="Você está saindo sem atualizar as notas e frequências. Deseja mesmo encerrar o preenchimento?"
        buttonRight="Encerrar"
      />
    <Container>
      <Header courseId={id} />
      <Content>
        <div className="sub-header">
          <div className="sub-header-left">
            <div className="title-left">
              <strong>{course.name}</strong>
              <span>{`${classObject.schedule} - ${classObject.shift} `}</span>
            </div>

            <div className="info">
              <p>Período</p>
              <p>Carga Horária</p>
              <p>Vagas</p>
              <strong>{`${date.start} à ${date.end}`}</strong>

              <strong>{course.workload}</strong>

              <strong>{classObject.maxStudents}</strong>
            </div>
          </div>
        </div>
        <hr />
        <ManageBody>
          <div className="manage-body">
            {!loading &&
              students.map((student) => {
                const index = student.studentClasses.findIndex( studentClass => studentClass.classe === classObject.id)
                if (
                  studentClasses
                    .map((studentClass) => studentClass.id)
                    .indexOf(student.studentClasses[index]._id) === -1
                ) {
                  studentClasses.push({
                    id: student.studentClasses[index]._id,
                    score: student.studentClasses[index].score,
                    frequency: student.studentClasses[index].frequency,
                  });
                }

                return (
                  <div key={student.studentClasses[index]._id}>
                    <div className="students-body">
                      <p>{student.name}</p>
                      <div>
                        <span>Nota <br/> <span  style={{fontSize:15}}>(0 a 100)</span></span>
                        <input
                          type="number"
                          max={100}
                          min={0}
                          defaultValue={student.studentClasses[index].score}
                          onChange={(e) =>
                            changeGrade(
                              student.studentClasses[index]._id,
                              e.currentTarget.value
                            )
                          }
                        />
                        <span>Frequência</span>
                        <input
                          defaultValue={student.studentClasses[index].frequency}
                          onChange={(e) =>
                            changeFrequency(
                              student.studentClasses[index]._id,
                              e.currentTarget.value
                            )
                          }
                        />
                        <span>%</span>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })}

            {loading && <Loader color="black" />}
          </div>
        </ManageBody>
        <hr />
        <div className="buttons-form">
          <button type="button" onClick={() => setToggleModalBack(true)}>
            Voltar
          </button>
          <button type="submit" onClick={() => handleSubmit()}>
            Salvar
          </button>
        </div>
      </Content>
    </Container>
    </>
  );
};

export default GradesAndFrequency;
