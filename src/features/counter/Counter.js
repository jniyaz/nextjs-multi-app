import { useState } from "react";
// import { BiUserPlus } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { 
    increment, 
    decrement, 
    incrementByValue, 
    reset 
} from "./counterSlice";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [ incrementVal, setIncrementVal ] = useState(0);
  const addValue = Number(incrementVal) || 0;
  const resetAll = () => {
    setIncrementVal(0);
    dispatch(reset());
}

  return (
    <div>
      <p className="py-10 text-2xl font-semibold">Count: {count}</p>
      <div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-sm"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-sm mx-2"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className="mt-4">
        <hr/>
        <input 
        type="text" 
        className="enabled:hover:border-gray-400 disabled:opacity-75 my-2" 
        value={incrementVal}
        onChange={(e) => setIncrementVal(e.target.value)}
        />
      </div>
      <div>
      <button
          className="bg-blue-500 text-white px-4 py-2 rounded-sm"
          onClick={() => dispatch(incrementByValue(addValue))}
        >
          Add Value
        </button>
      <button
          className="bg-red-500 text-white px-4 py-2 rounded-sm mx-3"
          onClick={resetAll}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
