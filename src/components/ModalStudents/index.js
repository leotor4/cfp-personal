import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Select from "react-select";
import { FaPlus } from "react-icons/fa";

import Loader from "../Loader";
import api from "../../services/api";

import { Container, Content } from "./styles";

const Modal = ({
  title,
  bodyText,
  buttonRight,
  show,
  maxStudentAdds,
  studentsInClass,
  onClose,
  onDelete,
  classId,
}) => {
  const [closed, setClosed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false); // -- paginação
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const history = useHistory();

  const observer = useRef();
  const token = localStorage.getItem("@CFP:token");

  let options = [];

  const loadingStudents = () => {
    console.log(maxStudentAdds);
    setLoading(true);
    api
      .get("students", {
        headers: {
          // filter: {q :[{$nin: studentsInClass}] ,  qField: ["_id"]},
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setStudents(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Erro ao carregar alunos");
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadingStudents();
  }, []);

  const handleClose = async () => {
    console.log(selectedStudents.value);
    selectedStudents.map((student) => {
      try {
        api.post(
          `/classes/student/add/${classId}`,
          { student_id: `${student.value}` },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // api.post(
        //   `/classes/studentclasses`,
        //   { student_id: `${student.value}`, classe_id: `classId` },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );

        toast.success(`${student.label} vinculado com sucesso!`);
      } catch (err) {
        console.log(err);
        toast.error(
          `Erro ao vincular Aluno ${student.label}. Por favor, tente novamente.`
        );
      }
      return null;
    });

    setClosed(true);
    setTimeout(() => {
      if (onDelete !== undefined) {
        onDelete();
      } else {
        onClose();
        setTimeout(() => {
          window.location.reload();
          console.log(selectedStudents);
        }, 800);
      }

      setClosed(false);
    }, 500);
  };

  const handleCancel = () => {
    setClosed(true);
    setTimeout(() => {
      onClose();
      setClosed(false);
    }, 500);
  };

  if (!show) {
    return null;
  }

  const newStudents = students.filter(
    (student) => !studentsInClass.includes(student.id)
  );

  newStudents.map((student) =>
    options.push({
      value: student.id,
      label: `${student.name} - ${student.cpf}`,
    })
  );

  return (
    <Container>
      <Content closed={closed}>
        <h1>{title}</h1>
        <hr />
        <p>{bodyText}</p>
        {loading && options.length === 0 ? (
          <Loader color="black" />
        ) :
        options.length === 0?
        null
        :
        (
          <Select
            classNamePrefix="react-select"
            className="react-select"
            options={selectedStudents.length < maxStudentAdds ? options : null}
            isMulti
            onChange={(value) => {
              setSelectedStudents(value);
              console.log(selectedStudents);
            }}
            placeholder="Aluno - CPF"
          />
        )}
        <div className="add-student">
          <Link to="/classes/manage-class/add-student">
            Criar Aluno
            <FaPlus size={16} />
          </Link>
        </div>
        <div className="footer-buttons">
          <button onClick={handleCancel}>Cancelar</button>
          <button type="submit" onClick={handleClose}>
            {buttonRight}
          </button>
        </div>
      </Content>
    </Container>
  );
};

export default Modal;
