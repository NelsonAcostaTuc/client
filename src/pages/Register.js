import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/register', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      history.push('/');
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={submitHandler}>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
