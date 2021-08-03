import api from "../services/api";
import { toast } from 'react-toastify';

const token = localStorage.getItem('@CFP:token');

export default {
  downloadModel: () => api.get('/certificates/model', {
    responseType: 'blob',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      let link = document.createElement('a');

      link.href = url;
      link.setAttribute('download', 'modelo.pdf');

      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch(error => console.log('[API] Download: ' + error)),
    
    download: (user, userType, classId) => api.post('/certificates', 
    {
      user,
      userType,
      class: classId,
    }, 
    {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        let link = document.createElement('a');
  
        link.href = url;
        link.setAttribute('download', 'modelo.pdf');
  
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(error => console.log('[API] Download: ' + error))
}