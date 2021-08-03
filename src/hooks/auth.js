import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@CFP:token');
    const user = localStorage.getItem('@CFP:user');

    if(token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {};
  })
  
  const signIn = useCallback( async ({ email, password}) => {
    const response = await api.post('login', {
      email,
      password,
    });
    
    
    const { token, user } = response.data;
    localStorage.setItem('@CFP:token', token);
    localStorage.setItem('@CFP:user', JSON.stringify(user.data));
    localStorage.setItem('@CFP:name', user.data.name);
    localStorage.setItem('@CFP:type', user.data.type);
    setData({ token, user });

  }, []);
  
  const signOut = useCallback(() => {
    localStorage.removeItem('@CFP:token');
    localStorage.removeItem('@CFP:user');
    localStorage.removeItem('@CFP:name');
    localStorage.removeItem('@CFP:type');

    setData({});
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { useAuth, AuthProvider };