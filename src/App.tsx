import './App.css';
import MainContainer from './containers/MainContainer';
import { Routes, Route } from "react-router-dom";
import ItemViewContainer from './containers/ItemViewContainer';
import { useDispatch } from 'react-redux';
import { totalAmountControl } from './features/flow/flowSlice';
import { useEffect } from 'react';
import { assignItems } from './features/flow/APIFunction';


export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    getItems()
  }, [])

  const getItems = async () => {
    try {
      const res: any = await dispatch(assignItems())
      console.log('res', res?.payload)
    } catch (error) {
      console.log('ERROR GETTING IMTES', error)
    } finally {
      dispatch(totalAmountControl())
    }
  }

  return (
    <Routes>
      <Route path="/" element={<MainContainer />} />
      <Route path="/item/:id" element={<ItemViewContainer />} />
    </Routes>
  );
}
