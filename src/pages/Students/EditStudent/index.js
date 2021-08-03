import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { useLocation, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import Header from '../../../components/HeaderJS';
import Modal from '../../../components/Modal';

import api from '../../../services/api';

import { Container, Content, LeftSide, RightSide } from './styles';

function initialState() {
  return {
    cpf: '',
    name: '',
    email: '',
    birthdate: '',
    phone: '',
    address: {
      street: '',
      number: '',
      neighborhood: '',
      complement: '',
      zipcode: '',
    },
    class: '',
    survey: {
      work: false,
      middleSchoolStudying: false,
      middleSchoolComplete: true,
      highSchoolStudying: false,
      highSchoolComplete: true,
      coursesHere: {
        answer: false,
        quantity: 0
      },
    },

    specialAttention: false,
    isActive: false,
  }
}


const EditStudent = () => {
  const [values, setValues] = useState({});
  const [student, setStudent] = useState(initialState);
  const [toggleModal, setToggleModal] = useState(false)
  const [classes, setClasses] = useState([]);

  const history = useHistory();
  const { pathname } = useLocation();

  const [, , , id] = pathname.split("/");

  const token = localStorage.getItem('@CFP:token');

  const onChange = (e) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value,
    })
    if (name === "cel") {
      setValues({
        ...values,
        [name]: value,
      })
    }

    if (name === "cpf") {
      setValues({
        ...values,
        [name]: value,
      })
    }
  }

  useEffect(() => {
    api.get(`students/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setStudent(res.data.data);
        console.log(res.data.data);
      })
      .catch(err => {
        toast.error('Erro ao carregar aluno. Por favor, tente novamente');
        history.push('/students');
      });
  }, [])

  useEffect(() => {
    api.get('classes', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(res => {
      setClasses(res.data.data)
    })
      .catch(err => {
        toast.error('Erro ao carregar classe');
      })
  }, [])

  return (
    <>
      <Modal
        show={toggleModal}
        onClose={() => setToggleModal(false)}
        title="Encerrar cadastro"
        bodyText="Você está saindo sem salvar as edições realizadas. Deseja mesmo encerrar o formulário?"
        buttonRight="Encerrar"
        path="/students"
      />

      <Container>
        <Header />
        <Content>
          <form onSubmit={() => { }} autoComplete="off">
            <LeftSide>
              <div className="line-form">
                <div className="form-input">
                  <label>Nome completo</label>
                  <input onChange={onChange} name="name" value={student.name} />
                </div>

                <div className="form-input">
                  <label>Email</label>
                  <input onChange={onChange} name="email" value={student.email} />
                </div>

                <div className="form-input">
                  <label>Telefone</label>
                  <InputMask name="phone" mask="(99) 99999-9999" maskChar="" value={student.phone} onChange={onChange} />
                </div>

              </div>

              <div className="line-form">
                <div className="form-input">
                  <label>Data de nascimento</label>
                  <InputMask name="birthdate" mask="99/99/9999" maskChar="" onChange={onChange} value={student.birthdate} />
                </div>

                <div className="form-input">
                  <label>CPF</label>
                  <InputMask className="inactive" name="cpf" mask="999.999.999-99" maskChar="" onChange={onChange} value={student.cpf} />
                </div>

              </div>
              <br /><hr /><br />

              <div className="line-form">
                <div className="form-input">
                  <label>CEP</label>
                  <InputMask name="zipcode" mask="99.999-999" maskChar="" onChange={onChange} value={student.address.zipcode} />
                </div>

                <div className="form-input">
                  <label>Rua</label>
                  <input onChange={onChange} name="street" value={student.address.street} />
                </div>

                <div className="form-input">
                  <label>Número</label>
                  <input className="small" onChange={onChange} type="number" name="number" value={student.address.number} />
                </div>
              </div>

              <div className="line-form">
                <div className="form-input">
                  <label>Bairro</label>
                  <input onChange={onChange} name="neighborhood" value={student.address.neighborhood} />
                </div>

                <div className="form-input">
                  <label>Complemento</label>
                  <input onChange={onChange} name="complement" value={student.address.complement} />
                </div>

              </div>
            </LeftSide>

            <RightSide>


              <div className="line-form">
                <div className="form-input">
                  <label>Escolaridade</label>
                  <select name="survey">
                    <option hidden value="">Selecione o nível de escolaridade</option>
                    <option value="middleSchoolStudying">Ensino médio cursando</option>
                    <option value="middleSchoolComplete">Ensino médio completo</option>
                    <option value="highSchoolStudying">Ensino superior cursando</option>
                    <option value="highSchoolComplete">Ensino superior completo</option>

                  </select>
                </div>
              </div>

              <div>
                <p>Esse aluno precisa de uma atenção especial?</p>

                <br />

                {student.specialAttention ? (
                  <div className="anwser" value={student.specialAttention}>

                    <div>
                      <input type="radio" name="specialAttention" value="true" />
                      <label>Sim </label>
                    </div>
                    <div>
                      <input type="radio" name="specialAttention" value="false" />
                      <label>Não </label>
                    </div>
                  </div>
                ) : (
                  <div className="anwser" value={student.specialAttention}>

                    <div>
                      <input type="radio" name="specialAttention" value="true" />
                      <label>Sim </label>
                    </div>
                    <div>
                      <input type="radio" name="specialAttention" value="false" />
                      <label>Não </label>
                    </div>
                  </div>
                )}
              </div>
              <br />
              <div>
                <p>Ele trabalha?</p>

                <br />
                <div className="anwser">
                  <div>
                    <input type="radio" name="work" value="true" />
                    <label>Sim </label>
                  </div>
                  <div>
                    <input type="radio" name="work" value="false" />
                    <label>Não </label>
                  </div>
                </div>
              </div>

              <br />
              <div>
                <p>Já fez algum curso CFP antes?</p>

                <br />
                <div className="anwser">
                  <div>
                    <input type="radio" name="coursesHereState" value="true" />
                    <label>Sim </label>
                  </div>
                  <div>
                    <input type="radio" name="coursesHereState" value="false" />
                    <label>Não </label>
                  </div>
                </div>
              </div>
            </RightSide>
            <div className="buttons-form">
              <button type="button" onClick={() => setToggleModal(true)}>Voltar</button>
              <button type="submit">Editar</button>
            </div>
          </form>

        </Content>
      </Container>
    </>
  );
}

export default EditStudent;