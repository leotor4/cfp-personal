import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
import Select from 'react-select'

import Loader from '../Loader'
import api from "../../services/api";
import { FaPlus} from "react-icons/fa";

import { Container, Content } from './styles';


const Modal = ({ title, bodyText, buttonRight, show, onClose, onDelete, classId }) => {
  const [closed, setClosed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false); // -- paginação
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState();

  const history = useHistory();

  const observer = useRef();
  const token = localStorage.getItem("@CFP:token");
  
  let options = []

   const loadingInstructors = () => {
    setLoading(true);
    api
      .get("users", {
        params: {
          filter: { q: [2], qField: ["type"] },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setInstructors(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Erro ao carregar instrutores");
        console.log(err);
        setLoading(false);
      });
  }
  
  useEffect(() => {
    loadingInstructors();
  }, []);

  instructors.map((instructor) => (
    options.push({ value: instructor.id, label: instructor.name })
  ))

  const handleClose = async () => {
    console.log(selectedInstructor.value)
    try {
      await api.post(`/classes/instructor/add/${classId}`, {"instructor" : `${selectedInstructor.value}`}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Instrutor vinculado com sucesso!");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao vincular instrutor. Por favor, tente novamente.");
    }

    setClosed(true);
    setTimeout(() => {

      if(onDelete !== undefined) {
        onDelete();
      } else {
        onClose();
        setTimeout(() => {window.location.reload()},800)
      }
      
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

  if(!show) {
    return null;
  }


  return (
    <Container >
      <Content closed={closed}>
      <h1>{title}</h1>
      <hr />
      <p>{bodyText}</p>
      {
        loading && options.length === 0?
        <Loader color="black"/>
        :
        options.length === 0?
        null
        :
        <Select classNamePrefix="react-select" className="react-select" options={options} onChange={(value)=>{setSelectedInstructor(value)}} placeholder="Instrutor"/>
        
      }
      <div className="add-instructor">
        <Link to="/classes/manage-class/add-instructor">
            Criar Instrutor
            <FaPlus size={16}/>
        </Link>
        </div>
      <div className="footer-buttons">
        <button onClick={handleCancel}>Cancelar</button>
        <button type="submit" onClick={handleClose}>{buttonRight}</button>
      </div>
      </Content>
    </Container>
  );
}

export default Modal;