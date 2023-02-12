import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/header/header';
import { AddDelivery } from './pages/add-delivery/add-delivery';
import { Cabinet } from './pages/cabinet/cabinet';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Registration } from './pages/registation/registration';
import { fetchGetUser } from './redux/slices/user-slice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetUser());
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/cabinet" element={<Cabinet />} />
        <Route path="/add-delivery" element={<AddDelivery />} />
        <Route
          path="/update-delivery/:id"
          element={<AddDelivery isEditing={true} />}
        />
      </Routes>
    </>
  );
}

export default App;
