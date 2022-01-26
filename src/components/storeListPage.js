import { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as actions from '../actions/index';

import TableHeader from '../utils/tableView.json';
import '../styles/common.css';

const ShopList = () => {
  const [listData, setListData] = useState([]);
  const shopList = useSelector(state => state.shop);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setListData(shopList);
  }, [shopList]);

  const routeChange = () => {
    navigate('/add_store');
  };

  const handleRemoveShop = id => {
    dispatch(actions.deleteShop(id));
  };

  const filterByInput = e => {
    let input = e.target.value;
    const filter = listData.filter(product => {
      return (
        product.area.toLowerCase().includes(input) ||
        product.category.toLowerCase().includes(input)
      );
    });
    input !== '' ? setListData(filter) : setListData(shopList);
  };

  const handleToggle = e => {
    let input = e.target.id;
    const currentDate = new Date().setHours(0, 0, 0, 0);

    const filter = shopList.filter(product => {
      return input === 'open'
        ? new Date(product.closeAt).setHours(0, 0, 0, 0) > currentDate
        : currentDate > new Date(product.closeAt).setHours(0, 0, 0, 0);
    });
    setListData(filter);
  };

  return (
    <div className='table-view'>
      <h1 className='page-header'>SHOP LIST</h1>
      <Button variant='danger' className='add-cta' onClick={routeChange}>
        Add More Shop
      </Button>
      <h6 className='filter-view'>Filter: </h6>
      <div className='filter-view row'>
        <div className='col-12 col-md-6 pl-0'>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Find Shop:</Form.Label>
              <Form.Control
                type='text'
                placeholder='Search by area/category'
                name='filter'
                required
                onChange={filterByInput}
              />
            </Form.Group>
          </Form>
        </div>
        <div className='col-12 col-md-6 pl-0'>
          <Form>
            <Form.Label>Shop Status: </Form.Label>
            <div className='d-flex'>
              <Form.Check
                type={'radio'}
                id={`open`}
                name='status'
                label={`Open Shop`}
                onChange={handleToggle}
              />
              <Form.Check
                type={'radio'}
                id={`close`}
                name='status'
                label={`Closed Shop`}
                onChange={handleToggle}
              />
            </div>
          </Form>
        </div>
      </div>
      <Table responsive>
        <thead>
          <tr>
            {TableHeader.list.map((opt, index) => (
              <th key={index}>{opt}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listData.length > 0 &&
            listData.map(({ id, name, area, category, openAt, closeAt }, i) => {
              return (
                <tr key={id}>
                  <td>{i + 1}</td>
                  <td>{name}</td>
                  <td>{area}</td>
                  <td>{category}</td>
                  <td>{openAt}</td>
                  <td>{closeAt}</td>
                  <Button
                    variant='danger'
                    className='remove-list-cta'
                    onClick={() => handleRemoveShop(id)}
                  >
                    Remove
                  </Button>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {!listData.length > 0 && <h6 className='no-data'>No Record Found.</h6>}
    </div>
  );
};

export default ShopList;
