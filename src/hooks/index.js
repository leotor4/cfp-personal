import React from 'react';

import { AuthProvider } from './auth';
import { SearchProvider } from './search'

const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <SearchProvider>
      {children}
      </SearchProvider>
      
    </AuthProvider>
  );

}

export default AppProvider;