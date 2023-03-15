import { Box, Typography } from '@mui/material';
import { OrderCard } from '../../components/order-card/order-card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetUser, selectIsAuth } from '../../redux/slices/user-slice';
import { Navigate } from 'react-router-dom';
import { fetchDeliveries } from '../../redux/slices/delivery-slice';
import { useEffect } from 'react';

function Home() {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector((state) => state.user.data);
  const deliveries = useSelector((state) => state.deliveries);
  const dispatch = useDispatch();

  const isDeliveriesLoading = deliveries.status === 'loading';

  useEffect(() => {
    dispatch(fetchDeliveries());
  }, []);

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (isDeliveriesLoading) {
    return (
      <Box>
        <Typography>Загрузка</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {deliveries.items.map((item, index) => {
        return (
          <OrderCard
            id={item._id}
            key={index}
            number={index + 1}
            status={item.status}
            address={item.address}
            phone={item.phone}
            position={user?.position}
            isPaid={item?.isPaid}
            price={item?.price}
            name={item.worker?.name}
            worker={user?._id}
            createdAt={`${new Date(
              item.createdAt
            ).toLocaleDateString()} ${new Date(
              item.createdAt
            ).toLocaleTimeString()}`}
          />
        );
      })}
    </Box>
  );
}
export { Home };
