import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { random } from 'faker';
import { Form, Button } from 'react-bootstrap';

import * as actions from '../actions/index';
import CategoryJson from '../utils/category.json';
import AreaJson from '../utils/area.json';

import '../styles/common.css';

const AddStorePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shop, setShop] = useState({
    name: '',
    area: '',
    category: '',
    openAt: '',
    closeAt: '',
  });

  const [error, setError] = useState({
    name: false,
    area: false,
    category: false,
    openAt: false,
    closeAt: false,
  });

  const [enableDate, setEnable] = useState(false);

  const onChange = event => {
    const { name, value } = event.target;

    if (name === 'name' && value.match('^[a-zA-Z ]*$') === null) {
      setError(prevState => ({ ...prevState, [name]: true }));
    } else {
      setError(prevState => ({ ...prevState, [name]: false }));
    }

    if (name === 'closeAt' && shop.openAt === '') {
      setEnable(true);
    } else {
      setEnable(false);
    }

    setShop(prevState => ({ ...prevState, [name]: value }));
  };

  const handleClick = event => {
    event.preventDefault();
    const isAnyEmpty = Object.keys(shop).find(key => shop[key] === '');

    if (isAnyEmpty) {
      setError(prevState => ({ ...prevState, [isAnyEmpty]: true }));
    } else {
      shop['id'] = random.uuid();
      dispatch(actions.saveShop(shop));
      setShop({
        name: '',
        area: '',
        category: '',
        openAt: '',
        closeAt: '',
      });
      routeChange();
    }
  };

  const routeChange = () => {
    navigate('/store_list');
  };

  return (
    <div className='form-card'>
      <Form>
        <Form.Label className='form-header'>ADD SHOP</Form.Label>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter shop name'
            name='name'
            required
            onChange={onChange}
          />
          {error.name && (
            <Form.Text className='error-text'>
              Please enter/correct shop name
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Area:</Form.Label>
          <Form.Control
            name='area'
            as='select'
            custom='true'
            onChange={onChange}
          >
            {AreaJson.list.map((opt, i) => {
              return (
                <option value={opt} key={i}>
                  {opt}
                </option>
              );
            })}
          </Form.Control>
          {error.area && (
            <Form.Text className='error-text'>Please select one area</Form.Text>
          )}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Category:</Form.Label>
          <Form.Control
            name='category'
            as='select'
            custom='true'
            onChange={onChange}
          >
            {CategoryJson.list.map((opt, i) => {
              return (
                <option value={opt} key={i}>
                  {opt}
                </option>
              );
            })}
          </Form.Control>
          {error.category && (
            <Form.Text className='error-text'>
              Please select one category
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Open At:</Form.Label>
          <Form.Control
            type='date'
            placeholder='Open Date'
            name='openAt'
            required
            onChange={onChange}
          />
          {error.openAt && (
            <Form.Text className='error-text'>Please select date</Form.Text>
          )}
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Close At:</Form.Label>
          <Form.Control
            type='date'
            placeholder='Enter email'
            name='closeAt'
            required
            onChange={onChange}
            min={shop.openAt}
          />
          {error.closeAt && (
            <Form.Text className='error-text'>Please select date</Form.Text>
          )}
          {enableDate && (
            <Form.Text className='error-text'>
              Please select open date first
            </Form.Text>
          )}
        </Form.Group>
        <Button
          variant='primary'
          className='form-submit'
          type='submit'
          onClick={handleClick}
        >
          Add Shop
        </Button>
      </Form>
    </div>
  );
};

export default AddStorePage;
