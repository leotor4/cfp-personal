import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Content } from './styles';

const Modal = ({ title, bodyText, buttonName, show, onClose, onDelete, historyPush }) => {
  const [closed, setClosed] = useState(false)
  const history = useHistory();
  
  const handleFunction = () => {
    setClosed(true);
    setTimeout(() => {
      if(onDelete !== undefined) {
        onDelete();
      } else {
        onClose();
        historyPush ? history.push(historyPush) : history.goBack();
      }
      
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
        <button onClick={handleFunction}>{buttonName}</button>
      </div>
      </Content>
    </Container>
  );
}

export default Modal;