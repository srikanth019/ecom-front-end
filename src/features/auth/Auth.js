import { useSelector, useDispatch } from 'react-redux';
import {
  increment,
  selectCount,
} from './AuthSlice';

export function Counter () {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();


  return (
    <div>
      <div>
        <span>{count}</span>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div>
      </div>
    </div>
  );
}
