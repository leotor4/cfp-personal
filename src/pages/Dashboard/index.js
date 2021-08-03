// NOVO ---------------------------------------------------------------------------

import React, { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Popup } from 'semantic-ui-react'

import Header from "../../components/HeaderJS";
import Loader from "../../components/Loader";
import Checkbox from "@material-ui/core/Checkbox";

import uploadIcon from "../../assets/icons/Arquivo Upload.svg";
import infoIcon from "../../assets/icons/Info.svg";

import api from "../../services/api";
import { parseISO, format, addDays } from "date-fns";

import { Container, Content, ButtonsBody, RightSide, LeftSide } from "./styles";

export default function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [totalCourses, setTotalCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState();
  const [studentsPerCourse, setStudentsPerCourse] = useState([]);
  const [maxStudents, setMaxStudents] = useState(0);
  const [passRate, setPassRate] = useState();
  const [activeStudents, setActiveStudents] = useState();
  const [loading, setLoading] = useState(false);
  const [hideZero, setHideZero] = useState(false);

  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loadingClasses, setLoadingClasses] = useState(false);

  const token = localStorage.getItem("@CFP:token");
  const typeUser = localStorage.getItem("@CFP:type");

  const observer = useRef();

  const lastClassElementRef = useCallback(
    (node) => {
      if (loadingClasses) return;

      if (total > 0 && classes.length === total) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) setPage(page + 1);
      });

      if (node) observer.current.observe(node);
    },
    [loadingClasses, hasMore]
  );

  const loadClasses = () => {
    setLoadingClasses(true);
    api
      .get("classes", {
        params: {
          filter: { q: [true], qField: ["active"] },
          pagination: { page, perPage: 10 },
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data)
        setTotal(res.data.total);
        setHasMore(res.data.data.length > 0);
        setClasses([...classes, ...res.data.data]);
        setLoadingClasses(false);
        // console.log(res.data)
      })
      .catch((err) => {
        toast.error("Erro ao carregar classe");
        console.log(err);
        setLoadingClasses(false);
      });
  };

  useEffect(() => {
    setLoading(true);

    api
      .get("dashboard")
      .then((res) => {
        setStudents(res.data.total_students);
        setPassRate(res.data.passRate);
        setActiveStudents(res.data.active_students);
        setStudentsPerCourse(res.data.activeStudentsPerCourse);
        setTotalCourses(res.data.total_courses);
        if(res.data.activeStudentsPerCourse[0]) setMaxStudents( res.data.activeStudentsPerCourse[0].amount)
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Erro ao carregar alunos. Por favor tente novamente");
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadClasses();
  }, [page]);

  return (
    <Container>
      <Header />
      {/* <ButtonsBody>
        <Link to="/dashboard/import-files">
          <span>Importar CSV ou XLSX</span>
          <img src={uploadIcon} alt="Upload CSV" />
        </Link>
        <button>
          <img src={infoIcon} alt="Botão de informação" />
        </button>
      </ButtonsBody> */}
      <br />
      <br />

      <Content>
        <LeftSide>
          {loading ? (
            <div className="section">
              <h2>Aprovações</h2>

              <p>
                <Loader color="white" />
              </p>
            </div>
          ) : passRate !== 0 ? (
            <div className="section">
              <h2>Aprovações</h2>

              <p>Porcentagem de alunos aprovados</p>
              <strong> {passRate !== "NaN" ? `${passRate} %` : '-'} </strong>
            </div>
          ) : (
            <div className="section">
              <h2>Aprovações</h2>

              <p>Sem porcentagem disponível</p>
            </div>
          )}

          <div className="section">
            <h2>Cursos</h2>
            <p>em andamento:</p>
            <strong>{totalCourses}</strong>
          </div>

          {loading ? (
            <div className="section">
              <h2>Alunos</h2>
              <p>
                <Loader color="white" />
              </p>
            </div>
          ) : students ? (
            <div className="section">
              <h2>Alunos</h2>
              <p>Total de alunos</p>
              <strong>{students}</strong>
            </div>
          ) : (
            <div className="section">
              <h2>Alunos</h2>
              <p>Sem alunos cadastados!</p>
            </div>
          )}

          {loading ? (
            <div className="section">
              <h2>Alunos Ativos</h2>
              <div id="students-section">
                <p>
                  <Loader color="white" />
                </p>
              </div>
            </div>
          ) : activeStudents ? (
            <div className="section">
              <h2>Alunos Ativos</h2>
              <div id="students-section">
                <p>Total de alunos ativos</p>
                <strong> {activeStudents}</strong>
              </div>
            </div>
          ) : (
            <div className="section">
              <h2>Alunos Ativos</h2>
              <div id="students-section">
                <p>Sem alunos ativos</p>
              </div>
            </div>
          )}
          <div className="biggerSection">
            <h2>Classes Ativas</h2>
            <div className="first-line">
              <div> Curso </div>
              <div> Dias </div>
              <div> Turno </div>
              <div> Sala </div>
            </div>
            <div className="classes-body">
              {classes.length !== 0 ? (
                <ul>
                  {classes.map((classObject, index) => {
                    return (
                      <li
                        ref={
                          classes.length === index + 1
                            ? lastClassElementRef
                            : null
                        }
                        key={classObject.id}
                      >
                        <Link
                          to={`/classes/manage-class`}
                          onClick={() =>
                            localStorage.setItem("classID", classObject.id)
                          }
                          className="link class-grid"
                        >
                          <div className="class-attribute">
                            {classObject.course.name}
                          </div>

                          <div className="class-attribute">
                            {classObject.schedule}
                          </div>
                          <div className="class-attribute">
                            {classObject.shift}
                          </div>
                          <div className="class-attribute room">
                            {classObject.room}
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="no-classes"><hr/> <p>Sem classes ativas no momento</p> </div>
              )}

              <div className="loading-more-classes">
                {loadingClasses && <Loader color="white" />}
              </div>
            </div>
          </div>
        </LeftSide>

        <RightSide>
          <h2>Alunos Ativos por curso</h2>
          {loading ? (
            <Loader color="white" />
          ) : (
            <div id="graphic-section">
              <div className="graph-header">Nº de Alunos - Curso</div>
              <div id="list-section">
                {activeStudents ? studentsPerCourse.map((studentCourse) => {
                  console.log(studentsPerCourse)
                  return (

                    <div
                      className="list-line"
                      key={studentCourse.name}
                      style={{
                        textOverflow: "ellipsis",
                        display:`${hideZero ? (hideZero && studentCourse.amount ? "flex" : "none") : "flex"}`,
                      }}
                    >
                      <div
                        className="fixed-background"
                        key={studentCourse.name}
                      >
                        <p className="class-line">
                          {studentCourse.amount} - {studentCourse.name}
                        </p>
                        <div
                          className="relative-background"
                          style={{
                            // background: `${course.color}`, -- Removido: cores para cada curso não são mais relevantes
                            width: `${
                              100 * (studentCourse.amount / maxStudents)
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    
                  );
                }):
                <p> <hr/> Sem Alunos Ativos</p>
                }
              </div>
              <div className="graph-footer" onClick={()=>setHideZero(!hideZero)}>Esconder cursos vazios
                <Checkbox
                  value="checkedA"
                  inputProps={{ "aria-label": "Checkbox A" }}
                  style={{color:"#FFF"}}
                  checked={hideZero}
                /></div>
              
            </div>
          )}
        </RightSide>
      </Content>
    </Container>
  );
}

// ANTIGO =========================================================================================================================
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { toast } from "react-toastify";
// import { Link } from "react-router-dom";

// import Header from "../../components/HeaderJS";
// import Loader from "../../components/Loader";

// import uploadIcon from "../../assets/icons/Arquivo Upload.svg";
// import infoIcon from "../../assets/icons/Info.svg";

// import api from "../../services/api";
// import { parseISO, format, addDays } from "date-fns";

// import { Container, Content, ButtonsBody, RightSide, LeftSide } from "./styles";

// export default function Dashboard() {
//   const [courses, setCourses] = useState([]);
//   const [totalCourses, setTotalCourses] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [students, setStudents] = useState();
//   const [studentsPerCourse, setStudentsPerCourse] = useState([]);
//   const [maxStudents, setMaxStudents] = useState(0);
//   const [passRate, setPassRate] = useState();
//   const [activeStudents, setActiveStudents] = useState();
//   const [loading, setLoading] = useState(false);

//   const [hasMore, setHasMore] = useState(false);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [loadingClasses, setLoadingClasses] = useState(false);

//   const token = localStorage.getItem("@CFP:token");
//   const typeUser = localStorage.getItem("@CFP:type");

//   const observer = useRef();

//   const lastClassElementRef = useCallback(
//     (node) => {
//       if (loadingClasses) return;

//       if (total > 0 && classes.length === total) return;

//       if (observer.current) observer.current.disconnect();

//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore) setPage(page + 1);
//       });

//       if (node) observer.current.observe(node);
//     },
//     [loadingClasses, hasMore]
//   );

//   const loadClasses = () => {
//     setLoadingClasses(true);
//     api
//       .get("classes", {
//         params: {
//           filter: {q:[true],qField:["active"]},
//           pagination: { page, perPage: 5 },
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         // console.log(res.data)
//         setTotal(res.data.total);
//         setHasMore(res.data.data.length > 0);
//         setClasses([...classes, ...res.data.data]);
//         setLoadingClasses(false);
//       })
//       .catch((err) => {
//         toast.error("Erro ao carregar classe");
//         console.log(err);
//         setLoadingClasses(false);
//       });
//   };

//   useEffect(() => {
//     setLoading(true);
//     api
//       .get("courses", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         setCourses(res.data.data);
//         setTotalCourses(res.data.total);
//       })
//       .catch((err) => {
//         toast.error("Erro ao carregar cursos. Por favor tente novamente");
//       });
//     api
//       .get("dashboard/students")
//       .then((res) => {
//         setStudents(res.data.total);
//       })
//       .catch((err) => {
//         toast.error("Erro ao carregar alunos. Por favor tente novamente");
//       });
//     api
//       .get("dashboard/passrate")
//       .then((res) => {
//         setPassRate(res.data.data.passRate);
//       })
//       .catch((err) => {
//         toast.error("Erro ao carregar aprovações. Por favor tente novamente");
//       });
//     api
//       .get("dashboard/students/active")
//       .then((res) => {
//         setActiveStudents(res.data.total);
//         setLoading(false);
//       })
//       .catch((err) => {
//         toast.error(
//           "Erro ao carregar alunos ativos. Por favor tente novamente"
//         );
//       });
//     // eslint-disable-next-line
//   }, []);

//   useEffect(() => {
//     loadClasses();
//     // eslint-disable-next-line
//   }, [page]);

//   // useEffect(() => {
//   //   api.get('dashboard/students')
//   //     .then(res => setCourses(res.data.data))
//   //     .catch(err => { toast.error('Erro ao carregar cursos. POr favor tente novamente') })

//   //   api.get('dashboard/students/active')
//   //     .then(res => setCourses(res.data.data))
//   //     .catch(err => { toast.error('Erro ao carregar cursos. POr favor tente novamente') })
//   //   // eslint-disable-next-line
//   // }, [])

//   return (
//     <Container>
//       <Header />
//       {/* <ButtonsBody>
//         <Link to="/dashboard/import-files">
//           <span>Importar CSV ou XLSX</span>
//           <img src={uploadIcon} alt="Upload CSV" />
//         </Link>
//         <button>
//           <img src={infoIcon} alt="Botão de informação" />
//         </button>
//       </ButtonsBody> */}
//       <br/>
//       <br/>

//       <Content>
//         <LeftSide>
//           {loading ? (
//             <div className="section">
//               <h2>Aprovações</h2>

//               <p>
//                 <Loader color="white" />
//               </p>
//             </div>
//           ) : passRate !== 0 ? (
//             <div className="section">
//               <h2>Aprovações</h2>

//               <p>Porcentagem de alunos aprovados</p>
//               <strong> {passRate} </strong>
//             </div>
//           ) : (
//             <div className="section">
//               <h2>Aprovações</h2>

//               <p>Sem porcentagem disponível</p>
//             </div>
//           )}

//           <div className="section">
//             <h2>Cursos</h2>
//             <p>em andamento:</p>
//             <strong>
//               {totalCourses}
//             </strong>
//           </div>

//           {loading ? (
//             <div className="section">
//               <h2>Alunos</h2>
//               <p>
//                 <Loader color="white" />
//               </p>
//             </div>
//           ) : students ? (
//             <div className="section">
//               <h2>Alunos</h2>
//               <p>Total de alunos</p>
//               <strong>{students}</strong>
//             </div>
//           ) : (
//             <div className="section">
//               <h2>Alunos</h2>
//               <p>Sem alunos cadastados!</p>
//             </div>
//           )}

//           {loading ? (
//             <div className="section">
//               <h2>Alunos Ativos</h2>
//               <div id="students-section">
//                 <p>
//                   <Loader color="white" />
//                 </p>
//               </div>
//             </div>
//           ) : activeStudents ? (
//             <div className="section">
//               <h2>Alunos Ativos</h2>
//               <div id="students-section">
//                 <p>Total de alunos ativos</p>
//                 <strong> {activeStudents}</strong>
//               </div>
//             </div>
//           ) : (
//             <div className="section">
//               <h2>Alunos Ativos</h2>
//               <div id="students-section">
//                 <p>Sem alunos ativos</p>
//               </div>
//             </div>
//           )}
//           <div className="biggerSection">
//             <h2>Classes Ativas</h2>
//             <div className="first-line">
//               <div > Curso </div>
//               <div > Dias </div>
//               <div > Turno </div>
//               <div > Sala </div>
//             </div>
//             <div className="classes-body">
//               {classes.length!== 0 ?
//               <ul>
//                 {classes.map((classObject, index) => {
//                   return (
//                     <li
//                       ref={
//                         classes.length === index + 1
//                           ? lastClassElementRef
//                           : null
//                       }
//                       key={classObject.id}
//                     >
//                       <Link
//                         to={`/classes/manage-class`}
//                         onClick={() =>
//                           localStorage.setItem("classID", classObject.id)
//                         }
//                         className="link class-grid"
//                       >
//                         <div className="class-attribute">
//                           {classObject.course.name}
//                         </div >

//                         <div className="class-attribute">
//                           {classObject.schedule}
//                         </div>
//                         <div className="class-attribute">
//                           {classObject.shift}
//                         </div>
//                         <div className="class-attribute room">
//                           {classObject.room}
//                         </div>

//                         {/* <strong>
//                         {`
//                   ${format(
//                     addDays(parseISO(classObject.period.start), 1),
//                     "dd'/'MM'/'yy"
//                   )}
//                   à
//                   ${format(
//                     addDays(parseISO(classObject.period.end), 1),
//                     "dd'/'MM'/'yy"
//                   )}
//                   `}
//                       </strong>

//                       <strong>{` ${classObject.course.workload} horas `}</strong>

//                       <strong>{classObject.maxStudents}</strong> */}
//                       </Link>
//                     </li>
//                   );
//                 })}
//               </ul>
//               :
//               <div> Sem classes ativas no momento </div>
//               }

//               <div className="loading-more-classes">
//                 {loadingClasses && <Loader color="white" />}
//               </div>
//             </div>
//           </div>
//         </LeftSide>

//         <RightSide >
//           <h2>Alunos Ativos por curso</h2>
//           {loading ? (
//             <Loader color="white" />
//           ) : (
//             <div id="graphic-section">
//                <div className="graph-header">
//                   Nº de Alunos - Curso
//                  </div>
//               <div id="list-section">
//                 {courses.map((course) => (
//                   <div
//                     className="list-line"
//                     key={course.id}
//                     style={{
//                       textOverflow: "ellipsis",
//                     }}
//                   >
//                     {course.classes
//                       ? (() => {
//                         let courseStudents = []
//                           course.classes.map((classe) => {
//                             classe.students.map((student)=>{
//                             if(!courseStudents.includes(student)) courseStudents.push(student);
//                             }); // class is a reserved word
//                             return null
//                           });
//                           if (courseStudents.length > maxStudents){
//                             setMaxStudents(courseStudents.length);
//                           }

//                           // if(!studentsPerCourse.includes({p:`${courseStudents.length} - ${course.name}` , students:courseStudents.length})){
//                           //   studentsPerCourse.push({p:`${courseStudents.length} - ${course.name}`, students:courseStudents.length })
//                           // }
//                           // console.log(studentsPerCourse)
//                           return (
//                             <div className="fixed-background">
//                               <p className="class-line">
//                                   {courseStudents.length} - {course.name}
//                                 </p>
//                               <div
//                                 className="relative-background"
//                                 style={{
//                                   // background: `${course.color}`, -- Removido: cores para cada curso não são mais relevantes
//                                   width: `${
//                                     100 * (courseStudents.length / maxStudents)
//                                   }%`,
//                                 }}
//                               >

//                               </div>
//                             </div>
//                           );
//                         }).call()
//                       : null}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </RightSide>
//       </Content>
//     </Container>
//   );
// }
