import React, { useState, useEffect, useRef, useCallback,useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import HeaderJS from "../../components/HeaderJS";
import SearchInput from "../../components/SearchInput";
import Loader from '../../components/Loader';

import { SearchContext } from "../../hooks/search";

import addInstIcon from "../../assets/icons/Adicionar Instrutor.svg";
import editStudents from "../../assets/icons/Editar.svg";
import deleteStudents from "../../assets/icons/Deletar.svg";

import api from "../../services/api";

import { Container, Content } from "./styles";

const Instructors = () => {
  const { filteredList, notFound } = useContext(SearchContext);
  const [toggleModal, setToggleModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [instructorId, setInstructorId] = useState("");
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("@CFP:token");

  const observer = useRef();

  const lastInstructorElementRef = useCallback(
    (item) => {
      if (loading) return;

      if (total > 0 && instructors.length === total) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) setPage(page + 1);
      });

      if (item) observer.current.observe(item);
    },
    [loading, hasMore]
  );

  const loadingInstructors = () => {
    setLoading(true);
    api
      .get("users", {
        params: {
          pagination: { page, perPage: 10 },
          filter: { q: [2], qField: ["type"] },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTotal(res.data.total);
        setHasMore(res.data.data.length > 0);
        setInstructors([...instructors, ...res.data.data]);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Erro ao carregar instrutores");
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadingInstructors();
  }, [page]);

  const deleteInstructor = (id) => {
    api
      .delete(`users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setInstructors(
          instructors.filter((instructor) => instructor.id !== id)
        );
        toast.success("Instrutor deletado com sucesso!");
      })
      .catch((err) => {
        toast.error("Erro ao deletar instrutor. Por favor, tente novamente.");
      });
  };

  return (
    <>
      <Modal
        show={toggleModal}
        onDelete={() => {
          deleteInstructor(instructorId);
          setToggleModal(false);
        }}
        onClose={() => setToggleModal(false)}
        title="Excluir Instrutor"
        bodyText="Deseja mesmo excluir o instrutor?"
        buttonRight="Excluir"
      />
      <Container>
        <HeaderJS />
        <Content>
          <header>
          <SearchInput
              placeholder="Buscar Instrutor..."
              qField="name"
              qField2="type"
              type={2}
              component="users"
            />

            <Link
              className="add-instructor-link"
              to="/instructors/add-instructor"
            >
              Adicionar Instrutor
              <img src={addInstIcon} alt="" />
            </Link>
          </header>

          <div className="instructors-list">
            {filteredList.length === 0 && !notFound
            ?
            instructors.map((instructor, index) => (
              <div
                ref={
                  instructors.length === index + 1
                    ? lastInstructorElementRef
                    : null
                }
                className="instructor"
                key={instructor.id}
              >
                <p>{instructor.name}</p>

                <div id="options">
                  <Link to={`/instructors/edit-instructor/${instructor.id}`}>
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
                      setInstructorId(instructor.id);
                    }}
                    alt=""
                  />
                </div>
              </div>
            ))
            :!notFound ?
            filteredList.map((instructor, index) => (
              <div
                ref={
                  instructors.length === index + 1
                    ? lastInstructorElementRef
                    : null
                }
                className="instructor"
                key={instructor.id}
              >
                <p>{instructor.name}</p>

                <div id="options">
                  <Link to={`/instructors/edit-instructor/${instructor.id}`}>
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
                      setInstructorId(instructor.id);
                    }}
                    alt=""
                  />
                </div>
              </div>
            )) :
              <div className="no-instructors">
                <p>Não foram encontrados instrutores!</p>
              </div>
          }
            {(!loading && instructors.length) === 0 && (
              <div className="no-instructors">
                <p>Ainda não foram cadastrados instrutores!</p>
              </div>
            )}
            <div className="loading-more-instructors">
              {loading && <Loader color = 'black'/>}
            </div>
          </div>
        </Content>
      </Container>
    </>
  );
};

export default Instructors;
