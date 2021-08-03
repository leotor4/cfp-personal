import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Header from '../../../components/HeaderJS';
import Modal from '../../../components/Modal';

import api from '../../../services/api';

import { Container, Content } from './styles';

function initialState() {
  return {
    name:'',
    workload: '',
  };
}

const EditCourse = () => {
  const [values, setValues] = useState(initialState);
  const [toggleModal, setToggleModal] = useState(false);

  const token = localStorage.getItem('@CFP:token');

  const history = useHistory();

  const { pathname } = useLocation();

  const [, , , id] = pathname.split("/");

  useEffect(() => {
    api.get(`courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
			}
    }).then(res => {
			setValues(res.data.data);
    })
    .catch(err => {
     
    })
  }, [id, token]);

  const editCourse = async (e) => {
    e.preventDefault();

    const data = values;

    try {
      await api.put(`courses/${id}`, {
        name: data.name,
        workload: data.workload,
      }, {        
        headers: {
        Authorization: `Bearer ${token}`,
        }
      });

      toast.success('Curso editado com sucesso!');

      history.push('/courses');

    } catch (err) {
   
     toast.error('Erro ao criar um novo curso. Por favor, tente novamente.');
    }
  }

  function onChange(e) {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    })
  }

  return (
    <>
      <Modal
        show={toggleModal}
        onClose={() => setToggleModal(false)}
        title="Encerrar cadastro"
        bodyText="Você está saindo sem alterar o curso. Deseja mesmo encerrar o formulário?"
        buttonRight="Encerrar"
        path="/courses"
      />

      <Container>
        <Header  />
        <Content>
          <form onSubmit={editCourse} autoComplete="off">
            <div className="first-line-form">
              <span>Nome do curso</span>
              <input onChange={onChange} name="name" value={values.name} />
              <span>Carga Horária</span>
     
              <input onChange={onChange} name="workload" value={values.workload} />

            </div>
            <div className="buttons-form">
              <button type="button" onClick={() => setToggleModal(true)}>Voltar</button>
              <button type="submit">Salvar</button>

            </div>
          </form>     
        </Content>
      </Container>
    </>
  );
}

export default EditCourse;