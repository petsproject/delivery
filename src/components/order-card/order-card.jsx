import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import axios from '../../axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchRemoveDelivery } from '../../redux/slices/delivery-slice';

function OrderCard({
  id,
  number,
  address,
  createdAt,
  phone,
  status,
  position,
  worker,
  isPaid,
  isCabinetVersion = false,
  name,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function updateDelivery() {
    navigate(`/update-delivery/${id}`);
  }

  async function deleteDelivery() {
    dispatch(fetchRemoveDelivery(id));
  }

  async function handleGetWork() {
    try {
      const fields = {
        worker,
        status: 'inWork',
      };

      const { data } = await axios.patch(`/deliveries/${id}`, fields);

      if (data) {
        navigate('/cabinet');
      }
    } catch (error) {
      console.log(err);
      alert('Ошибка при взятии заказа');
    }
  }

  async function handleUpdateStatus() {
    try {
      const fields = {
        status: 'done',
        isPaid: true,
      };

      const { data } = await axios.patch(`/deliveries/${id}`, fields);
      if (data) {
        navigate('/');
      }
    } catch (error) {
      console.log(err);
      alert('Ошибка при обновлении статуса заказа');
    }
  }

  async function handleCancel() {
    try {
      const fields = {
        status: 'new',
        worker: '',
      };

      const { data } = await axios.patch(`/deliveries/${id}`, fields);
      if (data) {
        navigate('/');
      }
    } catch (error) {
      console.log(err);
      alert('Ошибка при отказе от заказа');
    }
  }

  return (
    <Card
      sx={{
        minWidth: 275,
        maxWidth: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 2,
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Заказ №{number}
        </Typography>
        <Typography variant="h5" component="div">
          Адрес: {address}
        </Typography>
        <Typography variant="h5" component="div">
          Номер телефона клиента: {phone}
        </Typography>
        <Typography variant="h5" component="div">
          Создан: {createdAt}
        </Typography>
        <Typography variant="h5" component="div">
          Оплата: {isPaid ? 'Оплачено' : 'Не оплачено'}
        </Typography>
        {name ? (
          <Typography variant="h5" component="div">
            Имя курьера: {name}
          </Typography>
        ) : null}
        {status === 'new' ? (
          <Typography variant="h5" component="div" color="#1976d2">
            Статус: новый
          </Typography>
        ) : status === 'inWork' ? (
          <Typography variant="h5" component="div" color="#ed6c02">
            Статус: в работе
          </Typography>
        ) : status === 'done' ? (
          <Typography variant="h5" component="div" color="#2e7d32">
            Статус: завершен
          </Typography>
        ) : (
          <Typography variant="h5" component="div">
            Статус:{status}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        {position === 'new' ? null : position === 'courier' ? (
          status !== 'new' ? null : (
            <Button size="small" onClick={handleGetWork}>
              Взять заказ
            </Button>
          )
        ) : position === 'manager' ? (
          <>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={updateDelivery}
            >
              Редактировать заказ
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={deleteDelivery}
            >
              Удалить заказ
            </Button>
          </>
        ) : isCabinetVersion ? (
          status === 'done' ? null : (
            <>
              <Button
                variant="contained"
                color="success"
                size="small"
                onClick={handleUpdateStatus}
              >
                Завершить заказ
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={handleCancel}
              >
                Отказаться от заказа
              </Button>
            </>
          )
        ) : null}
      </CardActions>
    </Card>
  );
}

export { OrderCard };
