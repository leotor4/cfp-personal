import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { parseISO, format, addDays } from "date-fns";
import { toast } from "react-toastify";

import Header from "../../../components/HeaderJS";
import Loader from "../../../components/Loader";
import ModalInstructors from "../../../components/ModalInstructors";
import ModalStudents from "../../../components/ModalStudents";
import Modal from "../../../components/Modal";

import editIcon from "../../../assets/icons/Editar.svg";
import deleteIcon from "../../../assets/icons/Deletar.svg";
import addInstIcon from "../../../assets/icons/Adicionar Instrutor.svg";
import reportIcon from "../../../assets/icons/Relatorio Ativo.svg";
import addStutIcon from "../../../assets/icons/Adicionar Aluno.svg";
import dropdownImg from "../../../assets/icons/dropdown.png";

import api from "../../../services/api";

import { Container, Content, ManageBody } from "./styles";
import { students } from "../../../labels/paths";

const ManageClass = () => {
  const [classObject, setClassObject] = useState({});
  const [instructor, setInstructor] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingInstructor, setLoadingInstructor] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [expandTitle, setExpandTitle] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleInstructorModal, setToggleInstructorModal] = useState(false);
  const [toggleStudentModal, setToggleStudentModal] = useState(false);
  const [student, setStudent] = useState("");
  const [studentsInClass, setStudentsInClass] = useState([]);
  const [instructorId, setInstructorId] = useState("");
  const [vacancies, setVacancies] = useState();
  const [isFull, setIsFull] = useState(false);
  const [toggleModalDelInstructor, setToggleModalDelInstructor] =
    useState(false);

  // const [hasMore, setHasMore] = useState(false); // -- paginação
  // const [page, setPage] = useState(1);
  // const [total, setTotal] = useState(0);
  // const [students, setStudents] = useState([]);
  // const [loadingStudents, setLoadingStudents] = useState(false);
  // const [studentClass, setStudentClass] = useState({});

  // const observer = useRef();
  const classId = localStorage.getItem("classID");
  const token = localStorage.getItem("@CFP:token");

  // const lastStudentElementRef = useCallback(node => {
  //   if (loadingStudents) return;

  //   if (total > 0 && students.length === total) return;

  //   if (observer.current) observer.current.disconnect();

  //   observer.current = new IntersectionObserver(entries => {
  //     if (entries[0].isIntersecting && hasMore) setPage(page + 1)
  //   })

  //   if (node) observer.current.observe(node);
  // }, [loadingStudents, hasMore]);

  // const loadStudents = () => {
  //   setLoading(true)
  //   api.get('classes', {
  //     params: {
  //       pagination: { page, perPage: 8 },
  //       filter: {q: [search], qField: ["schedule"]}
  //     },
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     }
  //   }).then(res => {
  //     // console.log(res.data)
  //     setTotal(res.data.total);
  //     setHasMore(res.data.data.length > 0)
  //     setClasses([...classes, ...res.data.data])
  //     setLoading(false)

  //   })
  //     .catch(err => {
  //       toast.error('Erro ao carregar classe');
  //       console.log(err);
  //       setLoading(false);
  //     })
  // }

  useEffect(() => {
    setLoadingInstructor(true);
    api
      .get(`classes/${classId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setClassObject(res.data.data);
        setVacancies(res.data.data.maxStudents - res.data.data.students.length);
        res.data.data.students.map((student) => {
          studentsInClass.push(student._id);
        });
        if (res.data.data.instructor) {
          getInstructor(res.data.data.instructor);
        } else {
          setLoadingInstructor(false);
        }
        setIsFull(res.data.data.maxStudents - res.data.data.students.length);
        setLoading(true);
      })
      .catch((err) => {
        toast.error("Erro ao carregar participantes");
      });
  }, []);

  // useEffect(()=>{
  //   loadStudents();
  // },[page])

  const getInstructor = (id) => {
    api
      .get(`users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setInstructor(res.data.data);
        setLoadingInstructor(false);
      })
      .catch((err) => {
        toast.error("Erro ao carregar instrutor");
      });
  };
  const history = useHistory();

  const handleDelete = (id) => {
    // console.log("aluno: ", id);
    // console.log("classe: ", classId);
    // console.log("token: ", token);
    const tmp = { student_id: `${id}` };
    api
      .delete(`classes/student/remove/${classId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: tmp,
      })
      .then((res) => {
        toast.success("Aluno removido com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 800);
      })
      .catch((err) => {
        toast.error("Erro ao remover aluno. Por favor, tente novamente.");
      });
  };

  const handleDeleteInstructor = (id) => {
    // console.log("instructor: ", id);
    // console.log("classe: ", classId);
    const tmp = { instructor: `${id}` };
    api
      .delete(`classes/instructor/remove/${classId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: tmp,
      })
      .then((res) => {
        toast.success("Instrutor desvinculado com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 800);
      })
      .catch((err) => {
        toast.error("Erro ao remover instrutor. Por favor, tente novamente.");
      });
  };

  return (
    <>
      <ModalInstructors
        show={toggleInstructorModal}
        onClose={() => setToggleInstructorModal(false)}
        title="Escolha um Instrutor"
        bodyText="Escolha um instrutor para vincular à classe:"
        buttonRight="Salvar"
        classId={classObject.id}
      />
      <ModalStudents
        key={[studentsInClass, vacancies]}
        studentsInClass={studentsInClass}
        show={toggleStudentModal}
        maxStudentAdds={vacancies}
        onClose={() => setToggleStudentModal(false)}
        title="Adicionar Aluno"
        bodyText="Escolha um aluno para adicionar à classe:"
        buttonRight="Salvar"
        classId={classObject.id}
      />
      <Modal
        show={toggleModal}
        onDelete={() => {
          handleDelete(student._id);
          setToggleModal(false);
        }}
        onClose={() => setToggleModal(false)}
        title="Remover Aluno"
        bodyText={`Deseja mesmo remover o aluno ${student.name} desta classe?`}
        buttonRight="Remover"
      />
      <Modal
        show={toggleModalDelInstructor}
        onDelete={() => {
          handleDeleteInstructor(instructorId);
          setToggleModalDelInstructor(false);
        }}
        onClose={() => setToggleModalDelInstructor(false)}
        title="Desvincular Instrutor"
        bodyText="Deseja mesmo desvincular o instrutor desta classe?"
        buttonRight="Desvincular"
      />
      <Container>
        <Header />
        {loading ? (
          <Content>
            <div
              className={isPressed ? "sub-header header-pressed" : "sub-header"}
            >
              <div className="sub-header-left">
                <div className="title-left">
                <button
                      onClick={() =>
                        history.push(
                          `/classes/manage-class/edit-class/${classId}`
                        )
                      }
                    >
                      <img src={editIcon} alt="" />
                    </button>
                  <strong onClick={()=>setExpandTitle(!expandTitle)} className={ expandTitle? "expanded-title" : null}>
                    {classObject.course.name}
                  </strong>
                  <span>{`${classObject.schedule} - ${classObject.shift} - ${classObject.timetable} `}</span>
                </div>

                <div className="info-body">
                  <div className="info">
                    <p>Período</p>
                    <strong>
                      {`
                  ${format(
                    addDays(parseISO(classObject.period.start), 1),
                    "dd'/'MM'/'yy"
                  )} 
                  à 
                  ${format(
                    addDays(parseISO(classObject.period.end), 1),
                    "dd'/'MM'/'yy"
                  )}
                `}
                    </strong>
                  </div>

                  <div className="info">
                    <p>Carga Horária</p>
                    <strong>{classObject.course.workload}</strong>
                  </div>

                  <div className="info">
                    <p>Vagas</p>
                    <strong>{classObject.maxStudents}</strong>
                  </div>
                </div>
              </div>
              <div className="sub-header-right">
                <div className="buttons-right">
                  {isFull ? (
                    // <Link to="/classes/manage-class/add-student">
                    <button onClick={() => setToggleStudentModal(true)}>
                      <a href="#">
                        Adicionar Alunos
                        <img src={addStutIcon} alt="" />
                      </a>
                    </button>
                  ) : (
                    // {/* </Link> */}
                    <a href="#" className="disabled">
                      Adicionar Alunos
                      <img src={addStutIcon} alt="" />
                    </a>
                  )}

                  {/* <Link to="/classes/manage-classAdAStudent/add-instructor">
                Adicionar Instrutor
                <img src={addInstIcon} alt="" />
              </Link> */}
                  <Link
                    // className="notas-right"
                    to="/classes/manage-class/grades-and-frequency"
                    onClick={localStorage.setItem("classID", classId)}
                  >
                    Notas e frequencias
                    <img src={reportIcon} alt="" />
                  </Link>
                </div>
                <div className="vacancies">
                  <span
                    style={
                      !isFull ? { color: "red", fontWeight: "bold" } : null
                    }
                  >
                    Vagas disponíveis:{" "}
                  </span>
                  <strong style={!isFull ? { color: "red" } : null}>
                    {classObject.maxStudents - classObject.students.length}
                  </strong>
                </div>
              </div>
            </div>
            <div
              className={
                isPressed ? "sub-sub-header pressed" : "sub-sub-header"
              }
            >
              {/* <Link className="notas-left" to="/classes/manage-class/grades-and-frequency">Notas e frequencias</Link> */}
              {/* <Link className={isPressed? "notas2-left-pressed" : "notas2-left"} to="/classes/manage-class/grades-and-frequency">Notas e frequencias</Link> */}
              <div
                className="title-pressed"
                style={isPressed ? { display: "flex" } : { display: "none" }}
              >
                {classObject.course.name}
              </div>
              <button
                className={isPressed ? "arrow pressed" : "arrow"}
                onClick={() => {
                  setIsPressed(!isPressed);
                }}
              >
                <img src={dropdownImg} alt="" />
              </button>
            </div>

            <ManageBody
              style={
                isPressed
                  ? { height: "calc(100% - 45px)" }
                  : { height: "calc(100% - 200px)" }
              }
            >
              <div className="manage-body">
                {instructor.name ? (
                  <div
                    className="instructor-body"
                    // onLoad={console.log(instructor)}
                  >
                    <div className="instructor-first-line">
                      <p>{instructor.name}</p>
                      <div>
                        <Link
                          to={`/instructors/edit-instructor/${instructor.id}`}
                        >
                          <button>
                            <img src={editIcon} alt="" />
                          </button>
                        </Link>
                        <button>
                          <img
                            src={deleteIcon}
                            onClick={() => {
                              setToggleModalDelInstructor(true);
                              setInstructorId(instructor.id);
                            }}
                            alt=""
                          />
                        </button>
                      </div>
                    </div>
                    <span>Instrutor</span>
                  </div>
                ) : loadingInstructor ? (
                  <Loader color="black" />
                ) : (
                  <div className="no-instructor">
                    <button onClick={() => setToggleInstructorModal(true)}>
                      Adicionar Instrutor
                      <img src={addInstIcon} alt="" />
                    </button>
                  </div>
                )}

                {loadingInstructor ? null : classObject.students.length !==
                  0 ? (
                  classObject.students.map((student) => {
                    let studentC =
                      student.studentClasses[
                        student.studentClasses.findIndex(
                          (studentClass) =>
                            studentClass.classe === classObject.id
                        )
                      ];

                    return (
                      <div className="students-body" key={student.name}>
                        <p>{student.name}</p>
                        <div>
                          <div className="students-status">
                            <p>Nota</p>
                            <span
                              style={
                                studentC.score >= 70
                                  ? {
                                      backgroundColor: "#4CAF50",
                                    }
                                  : studentC.score > 0
                                  ? { backgroundColor: "#f44336" }
                                  : { backgroundColor: "#cccccc" }
                              }
                              // onLoad={console.log(student.studentClasses[student.studentClasses.findIndex( studentClass => studentClass.classe === classObject.id)])}
                            >
                              {" "}
                              {studentC ? studentC.score : "bugado"}
                            </span>
                            <p>Frequência</p>
                            <span
                              style={
                                studentC.frequency >= 75
                                  ? {
                                      backgroundColor: "#4CAF50",
                                    }
                                  :                                  
                                  studentC.frequency > 0
                                  ? { backgroundColor: "#f44336" }
                                  : { backgroundColor: "#cccccc" }
                              }
                            >
                              {studentC ? studentC.frequency : "bugado"}%{" "}
                            </span>
                          </div>

                          <button>
                            <Link to={`/students/edit-student/${student._id}`}>
                              <img src={editIcon} alt="" />
                            </Link>
                          </button>

                          <button>
                            <img
                              src={deleteIcon}
                              onClick={() => {
                                setToggleModal(true);
                                setStudent(student);
                              }}
                              alt=""
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-students">Sem alunos cadastrados.</div>
                )}
              </div>
            </ManageBody>
          </Content>
        )
      :
      <Loader color="black"/>
      }
      </Container>
    </>
  );
};

export default ManageClass;
