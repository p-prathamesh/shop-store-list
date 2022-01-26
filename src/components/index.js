import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const InitialRoute = () => {
  const navigate = useNavigate();
  const shopList = useSelector(state => state.shop);

  const routeChange = () => {
    navigate(shopList.length > 0 ? '/store_list' : '/add_store');
  };
  useEffect(() => {
    routeChange();
  }, [shopList]);

  return <h1>Loading</h1>;
};

export default InitialRoute;
