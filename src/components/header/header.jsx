import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, logout } from '../../redux/slices/user-slice';
import { Link } from 'react-router-dom';
function Header() {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector((state) => state.user.data);
  const position = user?.position;
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    window.localStorage.removeItem('token');
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            typography: 'body1',
            '& > :not(style) + :not(style)': {
              ml: 2,
            },
          }}
        >
          <Link className="link" to="/">
            Главная
          </Link>
          {position === 'courier' ? (
            <Link className="link" to="/cabinet">
              Кабинет
            </Link>
          ) : position === 'manager' ? (
            <Link className="link" to="/add-delivery">
              Добавить заказ
            </Link>
          ) : null}
        </Box>
        {isAuth ? (
          <Button
            onClick={handleLogout}
            variant="contained"
            color="error"
            sx={{ marginLeft: 'auto' }}
          >
            Выйти
          </Button>
        ) : (
          <Box
            sx={{
              typography: 'body1',
              '& > :not(style) + :not(style)': {
                ml: 2,
              },
              marginLeft: "auto",
            }}
          >
            <Link className="link" to="/login">
              Авторизация
            </Link>
            <Link className="link" sx={{ marginLeft: 2 }} to="/registration">
              Регистрация
            </Link>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export { Header };
