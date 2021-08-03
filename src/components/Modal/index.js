import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Content } from './styles';

const Modal = ({ title, bodyText, buttonRight, show, onClose, onDelete }) => {
  const [closed, setClosed] = useState(false)
  const history = useHistory();
  
  const handleClose = () => {
    setClosed(true);
    setTimeout(() => {

      if(onDelete !== undefined) {
        onDelete();
      } else {
        onClose();
        history.goBack();
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
      <div className="footer-buttons">
        {/* <button type="submit" onClick={() => history.push(`${path}`)}>{buttonRight}</button> */}
        <button onClick={handleCancel}>Cancelar</button>
        {/* To back to the last page: */}
        <button type="submit" onClick={handleClose}>{buttonRight}</button>
      </div>
      </Content>
    </Container>
  );
}

export default Modal;