import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { parseISO, format, addDays } from "date-fns";

import Header from "../../../components/HeaderJS";
import Download from "../../../utils/Download";
import Loader from "../../../components/Loader";

import { FaCheck, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import DownloadIcon from "../../../assets/icons/Download Certificado.svg";

import api from "../../../services/api";

import {
  Container,
  Content,
  LeftSide,
  RightSide,
  Checkbox,
  SearchInput,
} from "./styles";
import CertificateHTML from "../../../components/CertificateHTML";

function Certificate() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState();
  const [studentClasses, setStudentClasses] = useState([]);
  const [nonPassedClasses, setNonPassedClasses] = useState([]);
  const [student, setStudent] = useState("");
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [notPassed, setNotPassed] = useState(false);

  const history = useHistory();
  const { pathname } = useLocation();

  const [, , , id] = pathname.split("/");

  const token = localStorage.getItem("@CFP:token");

  const uploadCertificate = async () => {
    setLoading(true);
    console.log(student.classes);
    await Download.download(id, "student", student.classes[0]._id);
    setLoading(false);
    setCount(0);
    setIsChecked(false);
  };

  let filteredCourses = courses.filter((course) => {
    return course.name.toLowerCase().indexOf(search) !== -1;
  });

  const handleClickCheckbox = (self) => {
    if (self.selected) setIsChecked(false);

    if (!self.selected) {
      setSelectedCourse(self);
    }

    setCourses((list) =>
      list.map((course) => {
        return {
          ...course,
          selected: course.id === self.id ? !self.selected : course.selected,
        };
      })
    );
  };

  const handleAllCheckboxes = () => {
    setIsChecked(!isChecked);
    setSelectedCourse(courses[0]);

    isChecked === false ? setCount(filteredCourses.length) : setCount(0);

    setCourses((list) =>
      list.map((course) => ({ ...course, selected: isChecked ? false : true }))
    );
  };

  const handleCountCheckbox = () => {
    let filteredList = filteredCourses.filter((course) => {
      return course.selected;
    });

    setCount(filteredList.length);
    if (
      filteredList.length !== 0 &&
      filteredList.length === filteredCourses.length
    )
      setIsChecked(true);
    else setIsChecked(false);
  };

  useEffect(() => {
    handleCountCheckbox();
    console.log(selectedCourse);
  }, [handleCountCheckbox]);

  useEffect(() => {
    console.log(nonPassedClasses,student.classes);
    if (student.classes !== undefined) {
      setNotPassed(nonPassedClasses.length === student.studentClasse.length);

      // setNotPassed(nonPassedClasses.length === student.classes.length);
      // console.log(notPassed);
    }
  }, [nonPassedClasses]);

  useEffect(() => {
    console.log(loadingCourses,notPassed)
  }, [loadingCourses,notPassed])

  useEffect(() => {
    api
      .get(`students/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setStudent(res.data.data);

        res.data.data.studentClasse.map((studentClasse) => {
          api
            .get(`studentclasses/${studentClasse.id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res2) => {
              if (
                res2.data.data.score >= 70 &&
                res2.data.data.frequency >= 75
              ) {
                api
                  .get(`classes/${res2.data.data.classe}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then((res3) => {
                    api
                      .get(`courses/${res3.data.data.course.id}`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      })
                      .then((res4) => {
                        setCourses((courses) => [
                          ...courses,
                          { ...res4.data.data, selected: false },
                        ]);
                        setLoadingCourses(false);
                      })
                      .catch((err) => {
                        console.log(err);
                        toast.error("Erro ao carregar cursos");
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.error("Erro ao carregar classes");
                  });
              } else {
                setNonPassedClasses((nonPassedClasses) => [
                  ...nonPassedClasses,
                  res2.data.data.id,
                ]);
              }
            })
            .catch((err) => {
              console.log(err);
              toast.error("Erro ao carregar classes do estudante");
            });
        });
      })
      .catch((err) => {
        toast.error(
          "Erro ao carregar dados do aluno. Por favor, tente novamente"
        );
        history.push("/students");
      });
  }, []); // eslint-disable-next-line

  return (
    <Container>
      <Header />
      <Content>
        <LeftSide>
          <h1>{student.name}</h1>

          <div className="certificate-body">
            <p>
              <strong>
                Selecione os certificados que deseja pré-visualizar
              </strong>
            </p>
            <br />
            <SearchInput
              placeholder="Buscar curso..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="options">
              {!loadingCourses ? (
                <>
                  {filteredCourses.length > 0 && !notPassed ? (
                    <div
                      className={
                        courses.select === true
                          ? "row-course active"
                          : "row-course"
                      }
                    >
                      <label>Todos</label>
                      <Checkbox isActive={isChecked}>
                        <button onClick={handleAllCheckboxes}>
                          {isChecked && <FaCheck color="#fff" size={18} />}
                        </button>
                      </Checkbox>
                    </div>
                  ) : (
                    <p>
                      {" "}
                      <strong>
                        Não foram encontrados cursos com aprovação.{" "}
                      </strong>
                    </p>
                  )}
                  {filteredCourses.map((course) => (
                    <div key={course.id} className="row-course">
                      <label>{course.name}</label>
                      <Checkbox isActive={course.selected}>
                        <button
                          key={course.id}
                          onClick={() => handleClickCheckbox(course)}
                        >
                          {course.selected && (
                            <FaCheck color="#fff" size={18} />
                          )}
                        </button>
                      </Checkbox>
                    </div>
                  ))}
                </>
              ) : !notPassed ? (
                <Loader color="black" />
              ) : (
                <p>
                      {" "}
                      <strong>
                        Não foram encontrados cursos com aprovação.{" "}
                      </strong>
                    </p>
              )}
            </div>

            <footer>
              <button
                onClick={() => {
                  history.push("/students");
                }}
              >
                Voltar
              </button>
            </footer>
          </div>
        </LeftSide>
        <RightSide>
          <h2>Pré-visualização</h2>

          <div className="div-align">
            {count > 0 ? (
              <>
                <div className="certificates-pages">
                  <div className="temporary-certificate">
                    <CertificateHTML
                      name={student.name}
                      course={selectedCourse.name}
                      workload={selectedCourse.workload}
                      workloadExt={selectedCourse.workload_ext}
                      // onLoad={console.log(
                      //   student.classes[
                      //     student.classes.findIndex(
                      //       (classe) => classe.course === selectedCourse.id
                      //     )
                      //   ]
                      // )}
                      start={format(
                        addDays(
                          parseISO(
                            student.classes[
                              student.classes.findIndex(
                                (classe) => classe.course === selectedCourse.id
                              )
                            ].period.start
                          ),
                          1
                        ),
                        "dd'/'MM'/'yy"
                      )}
                      end={format(
                        addDays(
                          parseISO(
                            student.classes[
                              student.classes.findIndex(
                                (classe) => classe.course === selectedCourse.id
                              )
                            ].period.end
                          ),
                          1
                        ),
                        "dd'/'MM'/'yy"
                      )}
                    />
                  </div>
                </div>
                <div className="line-down-certificates">
                  <strong>{`${count}/${courses.length}`}</strong>
                  <button onClick={uploadCertificate}>
                    {loading ? (
                      <Loader className="loader" color="white" />
                    ) : (
                      <>
                        <span>Baixar Certificados</span>
                        <img src={DownloadIcon} alt="" />
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="certificates-body">
                  <strong>Selecione um curso ao lado para visualizá-lo.</strong>
                  <div className="temporary-certificate"></div>
                </div>
                <div className="line-down-certificates disable">
                  <button>
                    Baixar Certificados
                    <img src={DownloadIcon} alt="Baixar Certificado" />
                  </button>
                </div>
              </>
            )}
          </div>
        </RightSide>
      </Content>
    </Container>
  );
}

export default Certificate;
