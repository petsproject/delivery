import { Box } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/user-slice';
import { useEffect, useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import axios from '../../axios';

function AddDelivery({ isEditing = false }) {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector((state) => state.user.data?.userData);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  if (user) {
    if (user.position !== 'manager') {
      return <Navigate to="/" />;
    }
  }

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    if (isEditing) {
      axios
        .get(`/deliveries/${id}`)
        .then(({ data }) => {
          setAddress(data.address);
          setPhone(data.phone);
        })
        .catch((err) => {
          console.warn(err);
          alert('Ошибка при получении заказа');
        });
    }
  }, [id]);

  function handleChange(e, type) {
    switch (type) {
      case 'phone':
        setPhone(e.target.value);
        break;
      case 'address':
        setAddress(e.target.value);
        break;
      default:
        break;
    }
  }

  async function handleSubmit() {
    try {
      const fields = {
        address,
        phone,
      };

      const { data } = isEditing
        ? await axios.patch(`/deliveries/${id}`, fields)
        : await axios.post('/deliveries', fields);

      if (data) {
        navigate('/');
      }
    } catch (err) {
      console.log(err);
      alert('Ошибка при добалении заказа');
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {isEditing ? 'Редактирование доставки' : 'Добавление доставки'}
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="address"
            label="Адрес доставки"
            name="address"
            autoFocus
            onChange={(e) => handleChange(e, 'address')}
            value={address}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Телефон клиента"
            type="phone"
            id="phone"
            onChange={(e) => handleChange(e, 'phone')}
            value={phone}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isEditing ? 'Обновить' : 'Добавить'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export { AddDelivery };
