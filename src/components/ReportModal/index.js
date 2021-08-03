import React, { useState, useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import FormSelect from '../FormSelect';
import FormCheckbox from '../FormCheckbox';

import api from '../../services/api';

import { Container, Content } from './styles';

const ReportModal = ({ type, show, onClose }) => {
  const formRef = useRef(null);
  const [closed, setClosed] = useState(false);
  const [courses, setCourses] = useState([]);

  const handleClose = () => {
    setClosed(true);
    setTimeout(() => {
      onClose();
      setClosed(false);
    }, 500)
  }

  const handleCancel = () => {
    setClosed(true);
    setTimeout(() => {
      onClose();
      setClosed(false);
    }, 500)
  }

  const handleSubmit = (data) => {
    
    console.log(data);
  };

  useEffect(() => {
    api.get('courses').then(res => setCourses(res.data.data))
      .catch(err => {
        toast.error('Erro ao carregar cursos. Por favor, tente novamente');
        onClose();
      })
  }, [])

  if (!show) {
    return null;
  }

  return (
    <Container >
      <Content closed={closed}>
        <h1>{type}</h1>
        <hr />
        <Form ref={formRef} onSubmit={handleSubmit}>
          {type === "Relatório Anual" && (
            <div className="body">
              <p>Selecione 1 (um) ou mais campos que deseja no relatório</p>
              <div className="checkboxes">
                <FormCheckbox name="courses" description="Quantidade de cursos ministrados" />
                <FormCheckbox name="classes" description="Quantidade de classes ministradas" />
                <FormCheckbox name="popularCourses" description="Cursos mais procurados" />
                <FormCheckbox name="students" description="Quantidade de alunos" />
                <FormCheckbox name="passRate" description="Taxa de aprovação geral" />
                <FormCheckbox name="abandonment" description="Percentual de desistência" />
              </div>
            </div>
          )}

          {type === "Curso Específico" && (
            <div className="body">
              <p>Primeiro, selecione o curso que você deseja gerar um relatório</p>

              <div className="course-line">
                <FormSelect name="course" >
                  <option hidden value="">Selecione o curso</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>{course.name}</option>
                  ))}

                </FormSelect>
              </div>
              <br /><br />
              <p>Selecione 1 (um) ou mais campos que deseja no relatório</p>
              <div className="checkboxes">
                <FormCheckbox name="students" description="Quantidade de alunos" />
                <FormCheckbox name="studentsAge" description="Faixa etária dos alunos" />
                <FormCheckbox name="classes" description="Quantidade de classes" />
                <FormCheckbox name="passRate" description="Taxa de aprovação do curso" />
                <FormCheckbox name="abandonment" description="Percentual de desistência" />
                <FormCheckbox name="frequency" description="Frequência dos alunos no curso" />

              </div>

            </div>
          )}

          {type === "Perfil do Aluno" && (
            <div className="body">
              <p>Selecione 1 (um) ou mais campos que deseja no relatório</p>
              <div className="checkboxes">
                <FormCheckbox name="courses" description="Quantidade de cursos ministrados" />
                <FormCheckbox name="classes" description="Quantidade de classes ministradas" />
                <FormCheckbox name="popularCourses" description="Cursos mais procurados" />
                <FormCheckbox name="students" description="Quantidade de alunos" />
                <FormCheckbox name="passRate" description="Taxa de aprovação geral" />
                <FormCheckbox name="abandonment" description="Percentual de desistência" />
              </div>
            </div>
          )}


          <div className="footer-buttons">
            <button type="button" onClick={handleClose}>Cancelar</button>
            <button type="submit" onClick={handleCancel}>Visualizar</button>
          </div>
        </Form>
      </Content>
    </Container>
  );
}

export default ReportModal;