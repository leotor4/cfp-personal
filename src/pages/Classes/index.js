import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { parseISO, format, addDays } from "date-fns";

import Header from "../../components/HeaderJS";
import Accordion from "../../components/Accordion";
import SearchInput from "../../components/SearchInput";
import Loader from "../../components/Loader";

import { SearchContext } from "../../hooks/search";

import addCourse from "../../assets/icons/adicionar curso.svg";

import api from "../../services/api";

import { Container, Content } from "./styles";

const Classes = () => {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [classes, setClasses] = useState([]);
  const { filteredList, notFound } = useContext(SearchContext);


  const observer = useRef();

  const lastClassElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (total > 0 && classes.length === total) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) setPage(page + 1);
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // useEffect(() => {
  //   console.log(filteredList)
  // }, [filteredList])

  const typeUser = localStorage.getItem("@CFP:type");
  const token = localStorage.getItem("@CFP:token");

  const loadClasses = () => {
    setLoading(true);
    api
      .get("classes", {
        params: {
          pagination: { page, perPage: 8 },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data)
        setTotal(res.data.total);
        setHasMore(res.data.data.length > 0);
        setClasses([...classes, ...res.data.data]);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Erro ao carregar classe");
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadClasses();
  }, [page, search]);

  let filteredClasses = classes.filter((classObject) => {
    if (classObject.course)
      return classObject.course.name.toLowerCase().indexOf(search) !== -1;
  });

  return (
    <Container>
      <Header />
      <Content>
        <div className="sub-header">
          <SearchInput
            placeholder="Buscar classe pelo curso.."
            qField="name"
            component="courses"
          />

          {typeUser === "0" || typeUser === "1" ? (
            <Link
              className={typeUser === "2" ? "disable" : ""}
              to="/classes/add-class"
            >
              Adicionar classe
              <img src={addCourse} alt="" />
            </Link>
          ) : (
            ""
          )}
        </div>
        {loading && <p></p>}
        

        <div className="classes-body">
        {(!loading && classes.length) === 0 && (
          <div className="no-classes">
            <p>Ainda não foram cadastradas Classes!</p>
          </div>
        )}
          <ul>
            {filteredList.length === 0 && !notFound
              ? classes.map((classObject, index) => (
                <li
                  ref={
                    classes.length === index + 1 ? lastClassElementRef : null
                  }
                  key={classObject.id}
                >
                  <Accordion
                    title={`${classObject.course.name} - ${classObject.schedule} - ${classObject.shift}`}
                    classId={classObject.id}
                  >
                    <div className="first-line-body">
                      <div className="first-line-left">
                        <p>Período</p>
                        <p>Carga Horária</p>
                        <p>Vagas</p>
                        <p>Sala</p>
                        <p>Horário</p>

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

                        <strong>{`${classObject.course.workload} horas`}</strong>

                        <strong>{classObject.maxStudents}</strong>

                        <strong>{classObject.room}</strong>

                        <strong>{classObject.timetable}</strong>
                      </div>
                      {/* <div className="first-line-right">
                      <button>Baixar Frequência</button>
                      <button>Baixar Certificados</button>
                    </div> // -- Não implementado */}
                    </div>
                    <hr />
                  </Accordion>
                </li>
              ))
              : !notFound ?
                filteredList[0].classes.length !== 0 ?
                  filteredList && filteredList.map(course => {
                    // console.log(course.classes)
                    return (
                      course.classes.map((classObject, index) => {
                        return (<li
                          ref={
                            classes.length === index + 1 ? lastClassElementRef : null
                          }
                          key={classObject._id}
                        >
                          <Accordion
                            title={`${course.name} - ${classObject.schedule} - ${classObject.shift}`}
                            classId={classObject._id}
                          >
                            <div className="first-line-body">
                              <div className="first-line-left">
                                <p>Período</p>
                                <p>Carga Horária</p>

                                <p>Vagas</p>

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

                                <strong>{`${course.workload} horas`}</strong>

                                <strong>{classObject.maxStudents}</strong>
                              </div>
                              {/* <div className="first-line-right">
                      <button>Baixar Frequência</button>
                      <button>Baixar Certificados</button>
                    </div> // -- Não implementado */}
                            </div>
                            <hr />
                          </Accordion>
                        </li>)
                      }))
                  })
                  :
                  <div className="no-classes">
                    <p>Nenhuma classe encontrada no curso</p>
                  </div>
                : <div className="no-classes">
                  <p>Nenhum curso encontrado</p>
                </div>
            }
            <div className="loading-more-classes">
              {loading && <Loader color="black" />}
            </div>
          </ul>
        </div>
      </Content>
    </Container>
  );
};

export default Classes;
