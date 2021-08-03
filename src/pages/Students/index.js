import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import HeaderJS from "../../components/HeaderJS";
import SearchInput from "../../components/SearchInput";
import Loader from '../../components/Loader';

import { SearchContext } from "../../hooks/search";

import certificateStudents from "../../assets/icons/Certificados do aluno.svg";
import addstudents from "../../assets/icons/Adicionar Aluno.svg";
import editStudents from "../../assets/icons/Editar.svg";
import deleteStudents from "../../assets/icons/Deletar.svg";

import api from "../../services/api";

import { Container, Content } from "./styles";

const Students = () => {
  const { filteredList, notFound } = useContext(SearchContext);
  const [toggleModal, setToggleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");

  const token = localStorage.getItem("@CFP:token");

  const observer = useRef();

  const lastStudentElementRef = useCallback(
    (item) => {
      if (loading) return;

      if (total > 0 && students.length === total) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) setPage(page + 1);
      });

      if (item) observer.current.observe(item);
    },
    [loading, hasMore]
  );

  const loadStudents = () => {
    setLoading(true);
    api
      .get("students", {
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
        setStudents([...students, ...res.data.data]);
        setLoading(false);
        // console.log(res.data.data);
      })
      .catch((err) => {
        toast.error("Erro ao carregar alunos");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadStudents();
  }, [page]);

  const handleDelete = (id) => {
    api
      .delete(`students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStudents(students.filter((student) => student.id !== id));

        toast.success("Aluno deletado com sucesso!");
      })
      .catch((err) => {
        toast.error("Erro ao deletar aluno. Por favor, tente novamente.");
      });
  };

  let filteredStudents = students.filter((student) => {
    return student.name.toLowerCase().indexOf(search) !== -1;
  });

  return (
    <>
      <Modal
        show={toggleModal}
        onDelete={() => {
          handleDelete(studentId);
          setToggleModal(false);
        }}
        onClose={() => setToggleModal(false)}
        title="Excluir Aluno"
        bodyText="Deseja mesmo excluir o aluno?"
        buttonRight="Excluir"
      />
      <Container>
        <HeaderJS />
        <Content>
          <header>
          <SearchInput
              placeholder="Buscar Aluno..."
              qField="name"
              component="students"
            />

            <Link className="add-course-link" to="/students/add-student">
              Adicionar Aluno
              <img src={addstudents} alt="" />
            </Link>
          </header>

          <div className="students-list">
            {
            filteredList.length === 0 && !notFound
            ?
            filteredStudents.map((student, index) => (
              <div
                ref={
                  students.length === index + 1 ? lastStudentElementRef : null
                }
                className="student"
                key={student.id}
              >
                <p>{student.name}</p>

                <div id="options">
                  <Link to={`/students/certificate/${student.id}`}>
                    <img
                      id="edit"
                      src={certificateStudents}
                      alt=""
                      className="icons"
                    />
                  </Link>

                  <Link to={`/students/edit-student/${student.id}`}>
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
                      setStudentId(student.id);
                    }}
                    alt=""
                  />
                </div>
              </div>
            ))
          :!notFound ?
          filteredList.map((student, index) => (
            <div
              ref={
                students.length === index + 1 ? lastStudentElementRef : null
              }
              className="student"
              key={student.id}
            >
              <p>{student.name}</p>

              <div id="options">
                <Link to={`/students/certificate/${student.id}`}>
                  <img
                    id="edit"
                    src={certificateStudents}
                    alt=""
                    className="icons"
                  />
                </Link>

                <Link to={`/students/edit-student/${student.id}`}>
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
                    setStudentId(student.id);
                  }}
                  alt=""
                />
              </div>
            </div>
          ))
          :
          <div className="no-students">
            <p>Não foram encontrados Alunos!</p>
          </div>
          }
            {(!loading && students.length) === 0 && (
              <div className="no-students">
                <p>Ainda não foram cadastrados Alunos!</p>
              </div>
            )}
            <div className="loading-more-students">
              {loading && <Loader color = 'black'/>}
            </div>
          </div>
        </Content>
      </Container>
    </>
  );
};

export default Students;
