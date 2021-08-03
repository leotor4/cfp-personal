import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import HeaderJS from "../../components/HeaderJS";
import SearchInput from "../../components/SearchInput";
import Loader from '../../components/Loader';

import { SearchContext } from "../../hooks/search";

import addCourse from "../../assets/icons/Adicionar_Curso.svg";
import editStudents from "../../assets/icons/Editar.svg";
import deleteStudents from "../../assets/icons/Deletar.svg";

import api from "../../services/api";

import { Container, Content } from "./styles";

const Courses = () => {
  const { filteredList, notFound } = useContext(SearchContext);

  const [toggleModal, setToggleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");

  const token = localStorage.getItem("@CFP:token");
  const typeUser = localStorage.getItem("@CFP:type");

  const observer = useRef();
  const lastCourseElementRef = useCallback(
    (item) => {
      if (loading) return;

      if (total > 0 && courses.length === total) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) setPage(page + 1);
      });

      if (item) observer.current.observe(item);
    },
    [loading, hasMore]
  );

  const loadCourses = () => {
    setLoading(true);
    api
      .get("courses", {
        params: {
          pagination: { page, perPage: 10 },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTotal(res.data.total);
        setHasMore(res.data.data.length > 0);
        setCourses([...courses, ...res.data.data]);
        // setTimeout(() => {
        // 	setLoading(false)

        // }, 3000)
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Erro ao carregar cursos");
      });
  };

  useEffect(() => {
    loadCourses();
  }, [page]);

  const deleteCourses = (id) => {
    api
      .delete(`courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCourses(courses.filter((course) => course.id !== id));
        toast.success("Curso deletado com sucesso!");
      })
      .catch((err) => {
        toast.error("Erro ao deletar curso. Por favor, tente novamente.");
      });
  };

  return (
    <>
      <Modal
        show={toggleModal}
        onDelete={() => {
          deleteCourses(courseId);
          setToggleModal(false);
        }}
        onClose={() => setToggleModal(false)}
        title="Excluir Curso"
        bodyText="Deseja mesmo excluir o curso?"
        buttonRight="Excluir"
      />
      <Container>
        <HeaderJS />
        <Content>
          <header>
            <SearchInput
              placeholder="Buscar curso..."
              qField="name"
              component="courses"
            />

            <Link
              className={
                typeUser === "2" ? "add-course-link disable" : "add-course-link"
              }
              to="/courses/add-course"
            >
              Adicionar curso
              <img src={addCourse} alt="" />
            </Link>
          </header>

          <div className="courses-list">
            {filteredList.length === 0 && !notFound
              ?
              courses.map((course, index) => (
                <div
                  ref={
                    courses.length === index + 1 ? lastCourseElementRef : null
                  }
                  className="course"
                  key={course.id}
                >
                  <p>{course.name}</p>

                  <div id="options">
                    <Link to={`/courses/edit-course/${course.id}`}>
                      <img
                        id="edit"
                        src={editStudents}
                        alt=""
                        className="icons"
                      />
                    </Link>
                    <img
                      src={deleteStudents}
                      onClick={() => {
                        setToggleModal(true);
                        setCourseId(course.id);
                      }}
                      alt=""
                    />
                  </div>
                </div>
              ))
              :
              !notFound ?
                filteredList.map((course, index) => (
                  <div
                    ref={
                      courses.length === index + 1 ? lastCourseElementRef : null
                    }
                    className="course"
                    key={course.id}
                  >
                    <p>{course.name}</p>

                    <div id="options">
                      <Link to={`/courses/edit-course/${course.id}`}>
                        <img
                          id="edit"
                          src={editStudents}
                          alt=""
                          className="icons"
                        />
                      </Link>
                      <img
                        src={deleteStudents}
                        onClick={() => {
                          setToggleModal(true);
                          setCourseId(course.id);
                        }}
                        alt=""
                      />
                    </div>
                  </div>
                ))
                : <div className="no-courses">
                  <p>Não foi encontrado um curso com esse nome</p>
                </div>}

            {(!loading && courses.length) === 0 && (
              <div className="no-courses">
                <p>Ainda não foram cadastrados Cursos!</p>
              </div>
            )}
            <div className="loading-more-courses">
              {loading && <Loader color='black' />}
            </div>
          </div>
        </Content>
      </Container>
    </>
  );
};

export default Courses;
