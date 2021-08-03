import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Modal from "../../components/Modal";
import HeaderJS from "../../components/HeaderJS";
import SearchInput from "../../components/SearchInput";
import Loader from '../../components/Loader';

import { SearchContext } from "../../hooks/search";

import addAdmin from "../../assets/icons/Adicionar_Admin.svg";
import editAdmins from "../../assets/icons/Editar.svg";
import deleteAdmin from "../../assets/icons/Deletar.svg";

import api from "../../services/api";

import { Container, Content } from "./styles";

const Admins = () => {
  const { filteredList, notFound } = useContext(SearchContext);
  const [toggleModal, setToggleModal] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [adminId, setAdminId] = useState("");

  const token = localStorage.getItem("@CFP:token");

  const observer = useRef();

  const lastAdminElementRef = useCallback(
    (item) => {
      if (loading) return;

      if (total > 0 && admins.length === total) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) setPage(page + 1);
      });

      if (item) observer.current.observe(item);
    },
    [loading, hasMore]
  );

  const loadAdmins = () => {
    setLoading(true);
    api
      .get("users", {
        params: {
          pagination: { page, perPage: 10 },
          filter: { q: [1], qField: ["type"] },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setTotal(res.data.total);
        setHasMore(res.data.data.length > 0);
        setAdmins([...admins, ...res.data.data]);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Erro ao carregar administradores");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadAdmins();
  }, [page]);

  const deleteAdmins = (id) => {
    api
      .delete(`users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAdmins(admins.filter((admin) => admin.id !== id));
        toast.success("Administrador deletado com sucesso!");
      })
      .catch((err) => {
        toast.error(
          "Erro ao deletar administrador. Por favor, tente novamente."
        );
      });
  };


  return (
    <>
      <Modal
        show={toggleModal}
        onDelete={() => {
          deleteAdmins(adminId);
          setToggleModal(false);
        }}
        onClose={() => setToggleModal(false)}
        title="Excluir Administrador"
        bodyText="Deseja mesmo excluir o administrador?"
        buttonRight="Excluir"
      />
      <Container>
        <HeaderJS />
        <Content>
          <header>
          <SearchInput
              placeholder="Buscar Admin..."
              qField="name"
              qField2="type"
              type={1}
              component="users"
            />

            <Link className="add-admin-link" to="/admins/add-admin">
              Adicionar Administrador
              <img src={addAdmin} alt="" />
            </Link>
          </header>

          <div className="admins-list">
            {filteredList.length === 0 && !notFound
            ?
            admins.map((admin, index) => (
              <div
                ref={admins.length === index + 1 ? lastAdminElementRef : null}
                className="admin"
                key={admin.id}
              >
                <p>{admin.name}</p>

                <div id="options">
                  <Link to={`/admins/edit-admin/${admin.id}`}>
                    <img id="edit" src={editAdmins} alt="" className="icons" />
                  </Link>
                  <img
                    src={deleteAdmin}
                    onClick={() => {
                      setToggleModal(true);
                      setAdminId(admin.id);
                    }}
                    alt=""
                  />
                </div>
              </div>
            ))
          :!notFound ?
          filteredList.map((admin, index) => (
            <div
              ref={admins.length === index + 1 ? lastAdminElementRef : null}
              className="admin"
              key={admin.id}
            >
              <p>{admin.name}</p>

              <div id="options">
                <Link to={`/admins/edit-admin/${admin.id}`}>
                  <img id="edit" src={editAdmins} alt="" className="icons" />
                </Link>
                <img
                  src={deleteAdmin}
                  onClick={() => {
                    setToggleModal(true);
                    setAdminId(admin.id);
                  }}
                  alt=""
                />
              </div>
            </div>
          ))
          :
          <div className="no-admins">
                <p>Não foram encontrados administradores!</p>
              </div>
          }
            {(!loading && admins.length) === 0 && (
              <div className="no-admins">
                <p>Ainda não foram cadastrados administradores!</p>
              </div>
            )}
            <div className="loading-more-admins">
              {loading && <Loader color = 'black'/>}
            </div>
          </div>
        </Content>
      </Container>
    </>
  );
};

export default Admins;
