import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import ParticipantsList from '../ParticipantsList';

import { FiChevronDown, FiSettings } from 'react-icons/fi';

import { Container } from './styles';

const Accordion = ({ title, classId, children }) => {
  const [handleMenu, setHandleMenu] = useState(false);

  const toggleAccordion = () => {
    setHandleMenu(!handleMenu);
  }

  return (
    <Container isFocused={handleMenu} >
      <div name="course" className={handleMenu === true ? "list active" : "list desactive"}>
        <div className="header-li">
          <p name="coursename">{title}</p>
          <div className="header-buttons">
            <Link to={`/classes/manage-class`} onClick={() => localStorage.setItem('classID', classId)}>
              <FiSettings size={28} />
            </Link>
            <button onClick={toggleAccordion}>
              <FiChevronDown size={30} />
            </button>
          </div>
        </div>

        <div className="body-menu-courses">
          {children}
          {handleMenu && 
            <ParticipantsList classId={classId}/>
          }
        </div>
      </div>
    </Container>
  );
}

export default Accordion;