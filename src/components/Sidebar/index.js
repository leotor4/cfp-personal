import React from 'react';
import { Link, useLocation} from 'react-router-dom';

import Icons from '../../components/Icons';
import logoSidebar from '../../assets/icons/Logo sidebar.svg';
import dashboardIcon from '../../assets/icons/Dashboard Ativo.svg';
import reportIcon from '../../assets/icons/Relatorio Ativo.svg';
import adminIcon from '../../assets/icons/Admin Ativo.svg';
import coursesIcon from '../../assets/icons/Cursos Ativo.svg';
import studentsIcon from '../../assets/icons/Alunos Ativo.svg';
import instructorsIcon from '../../assets/icons/Instrutor.svg';
import certificatesIcon from '../../assets/icons/Certificados Ativo.svg';
import coursesI from '../../assets/icons/cursos.svg';

import { Container } from './styles';

const SideBar = () => {
  const { pathname } = useLocation();

  const firstTrail = pathname.split("/")

  const sidebarIcon = firstTrail[1];

  const typeUser = localStorage.getItem('@CFP:type')

  return (
    <Container>
      <header>
        <img src={logoSidebar} alt="" />
        <h1>CFP</h1>
      </header>
      <div className="sidebar-body">
        {typeUser === "0" && 
          <>
            <Link 
              to="/dashboard"
              className={
                pathname === "/dashboard" ||
                pathname === "/dashboard/import-files"
                ? "link-sidebar active" : "link-sidebar"}
            >
              <img src={dashboardIcon} alt="" />
              <span>Dashboard</span>
            </Link>

            {/* <Link 
              to="/relatories"
              className={pathname === "/relatories" ? "link-sidebar active" : "link-sidebar"}
            >
              <img src={reportIcon} alt="" />
              <span>Relatórios</span>
            </Link> */}

            <Link 
              to="/courses" 
              className={
                sidebarIcon === "courses" ? "link-sidebar active" : "link-sidebar"
              }
            >
              <img src={coursesI} alt="" />
              <span>Cursos</span>
            </Link>

            <Link 
              to="/classes" 
              className={
                sidebarIcon === "classes" ? "link-sidebar active" : "link-sidebar"
              }
            >
              <img src={coursesIcon} alt="" />
              <span>Classes</span>
            </Link>

            <Link 
              to="/students"
              className={
                sidebarIcon === "students" ? "link-sidebar active" : "link-sidebar"
              }
            >
              <img src={studentsIcon} alt="" />
              <span>Alunos</span>
            </Link>

            <Link 
              to="/instructors"
              className={sidebarIcon === "instructors" ? "link-sidebar active" : "link-sidebar" }
            >
              <img src={instructorsIcon} alt="" 
              />
              <span>Instrutores</span>
            </Link>
            
            <Link 
              to="/admins"
              className={sidebarIcon === "admins" ? "link-sidebar active" : "link-sidebar" }
            >
              <img src={adminIcon} alt="" 
              />
              <span>Administradores</span>
            </Link>

            <Link to="/certificates" className={pathname === "/certificates" ? "link-sidebar active" : "link-sidebar"}>
              <Icons image={certificatesIcon} />
              <span>Certificados</span>
            </Link>
          </>
        } 

        {typeUser === "1" && 
          <>
            <Link 
              to="/dashboard"
              className={
                pathname === "/dashboard" ||
                pathname === "/dashboard/import-files"
                ? "link-sidebar active" : "link-sidebar"}
            >
              <img src={dashboardIcon} alt="" />
              <span>Dashboard</span>
            </Link>

            <Link 
              to="/relatories"
              className={pathname === "/relatories" ? "link-sidebar active" : "link-sidebar"}
            >
              <img src={reportIcon} alt="" />
              <span>Relatórios</span>
            </Link>

            <Link 
              to="/courses" 
              className={
                sidebarIcon === "courses" ? "link-sidebar active" : "link-sidebar"
              }
            >
              <img src={coursesI} alt="" />
              <span>Cursos</span>
            </Link>

            <Link 
              to="/classes" 
              className={sidebarIcon === "courses" ? "link-sidebar active" : "link-sidebar"} 
            >
              <img src={coursesIcon} alt="" />
              <span>Classes</span>
            </Link>

            <Link 
              to="/students"
              className={
                sidebarIcon === "students" ? "link-sidebar active" : "link-sidebar"
              }
            >
              <img src={studentsIcon} alt="" />
              <span>Alunos</span>
            </Link>

            <Link to="/certificates" className={pathname === "/certificates" ? "link-sidebar active" : "link-sidebar"}>
              <Icons image={certificatesIcon} />
              <span>Certificados</span>
            </Link>
          </>
        }

        {typeUser === "2" && 
          <>
             <Link 
              to="/classes" 
              className={
                sidebarIcon === "classes" ? "link-sidebar active" : "link-sidebar"
              }
            >
              <img src={coursesIcon} alt="" />
              <span>Classes</span>
            </Link>
          </>
        }  

      </div>
    </Container>
  );
}

export default SideBar;