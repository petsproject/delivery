import { Box } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { OrderCard } from '../../components/order-card/order-card';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/user-slice';
import { fetchDeliveries } from '../../redux/slices/delivery-slice';
import { useEffect } from 'react';

function Cabinet() {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector((state) => state.user);
  const deliveries = useSelector((state) => state.deliveries.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, []);

  if (user.data) {
    if (user.data?.position !== 'courier') {
      return <Navigate to="/" />;
    }
  }

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (user.status === 'loading') {
    return <h1>Загрузка...</h1>;
  }

  return (
    <Box>
      {deliveries
        .filter((item) => item.worker === user.data?._id)
        .map((item, index) => (
          <OrderCard
            id={item._id}
            key={index}
            number={index + 1}
            status={item.status}
            address={item.address}
            phone={item.phone}
            position={user?.position}
            worker={user?._id}
            isCabinetVersion={true}
            createdAt={`${new Date(
              item.createdAt
            ).toLocaleDateString()} ${new Date(
              item.createdAt
            ).toLocaleTimeString()}`}
          />
        ))}
    </Box>
  );
}

export { Cabinet };
