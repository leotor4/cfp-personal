import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from "../../components/Loader";


import certificateIcon from '../../assets/icons/Certificados Ativo.svg'

import api from '../../services/api';

import { Container } from './styles';

function initialState () {
  return {
    intructor: {
      id: '',
      name: '',
    },
    students: [],
  }
}



const ParticipantsList = ({classId}) => {
  const [participants, setParticipants] = useState(initialState);
  const [instructor, setInstructor] = useState({});
  const [loading, setLoading] = useState(false);
  
  
  const token = localStorage.getItem('@CFP:token');
	useEffect(() => {
    setLoading(true)
		api.get(`classes/participants/${classId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}).then(res => {
      setParticipants(res.data.data);
      setLoading(false)

      if (res.data.data.intructor !== null){
      api
        .get(`users/${res.data.data.intructor.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setInstructor(res.data.data);
        })
        .catch((err) => {
          toast.error("Erro ao carregar instrutor");
          console.log(err);
        });	
      }
		})
			.catch(err => {
				toast.error('Erro ao carregar participantes');
			})
      
			// eslint-disable-next-line
	}, []);
  return (
    <Container>
      { loading ? <Loader /> :
      <>
      {participants.intructor === null ? <><div className="no-students"><p>Ainda não foi cadastrado instrutor!</p></div><br/><hr/></> : (
        <>
          <div className="instructor">
            <div> 
              <strong>{instructor.name}</strong>;
              <p>Instrutor</p> 
            </div>
            {/* <button>
              <img src={certificateIcon} alt="" />
            </button> */}
          </div>
          <hr />
        </>
      )
      
      }

      {participants.students.length === 0 && <div className="no-students"><p>Ainda não foram cadastrados estudantes!</p></div>}
      
      {participants.students.map(student => {
        let studentC = student.studentClasses[student.studentClasses.findIndex( studentClass => studentClass.classe === classId)]
        return(
        <div className="students" key={student.id}>
          <strong>{student.name}</strong>

          <div className="students-right">
            <div className="students-status">
              <p>Nota</p>
              <span
              style={
                studentC.score >= 70
                  ? {
                      backgroundColor: "#4CAF50",
                    }
                  : studentC.score > 0
                  ? { backgroundColor: "#f44336" }
                  : { backgroundColor: "#cccccc" }
              }
              > {studentC.score}</span>
              <p>Frequência</p>
              <span
              style={
                studentC.frequency >= 75
                  ? {
                      backgroundColor: "#4CAF50",
                    }
                  :                                  
                  studentC.frequency > 0
                  ? { backgroundColor: "#f44336" }
                  : { backgroundColor: "#cccccc" }
              }
              > {studentC.frequency}%</span>
            </div>
            <Link to={`/students/certificate/${student._id}` }>
            <button>
              <img src={certificateIcon} alt="" />
              </button>
            </Link>
          </div>

        </div>)
      })}
      </>
    }
    </Container>
  );
}

export default ParticipantsList;