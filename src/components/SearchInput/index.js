import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../hooks/search';

import api from '../../services/api';

import { Container } from './styles';

const SearchInput = ({ placeholder, component,type, qField, qField2 }) => {

  const { handleList } = useContext(SearchContext);

  const [search, setSearch] = useState("");
  const [componentArray, setComponentArray] = useState([]);

  const token = localStorage.getItem('@CFP:token');
  
  

  useEffect(() => {

    if (search !== "") {
      type?
      api.get(`${component}`, {
        params: {
          filter: { q: [search,type], qField: [qField,qField2] }
        },
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(res => {
        handleList(res.data.data, search);
        setComponentArray([...componentArray, ...res.data.data])

      })
        .catch(err => {
          console.log('erro', err);
        })
        :
        api.get(`${component}`, {
          params: {
            filter: { q: [search], qField: [qField] }
          },
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }).then(res => {
          handleList(res.data.data, search);
          setComponentArray([...componentArray, ...res.data.data])
  
        })
          .catch(err => {
            console.log('erro', err);
          })
    } else setTimeout(() => {
      handleList([]);
    }, 1000); 

  }, [search]);


  return (
    <Container
      type="search"
      className="search"
      placeholder={placeholder}
      onChange={(e) => setSearch(e.target.value.toLowerCase())}
    />
  );
}

export default SearchInput;