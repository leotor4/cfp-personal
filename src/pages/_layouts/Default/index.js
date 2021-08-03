import React from 'react';

import SideBar from '../../../components/Sidebar';
import Footer from '../../../components/Footer';
import { Wrapper, Body } from './styles';

const DefaultLayout = ({children}) => {
  return (
    <>
      
      <Wrapper>
      <SideBar />
      <Body>
        {children}
      </Body>
        <Footer />
      </Wrapper>
    </>
  );
}

export default DefaultLayout;