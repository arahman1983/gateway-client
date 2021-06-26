import { useState, useEffect } from "react";
import { FiEye, FiServer, FiAirplay, FiPlus, FiPenTool, FiTrash2 } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import styles from "./gateways.module.css";
import { Button, GatewayForm, DeleteForm } from "../../components";
import { Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {getGateways, deleteGateway} from '../../redux/actions/gateways.action'
import axios from "../../axios";

export default function GatewaysPage() {
  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [getAgain, setGetAgain] = useState(false)
  const [selectedGateway, setSelectedGateway] = useState()
  const gateways = useSelector(state => state.gateways)
  const dispatch = useDispatch()
  const history = useHistory()
  const handleViewBtn = (id) =>{
    history.push(`/${id}`)
  }

  const handleAddBtn = () => {
    setShow(true);
    setEdit(false);
  };

  const handleEditBtn = (id) => {
    setShow(true);
    setEdit(true);
    setSelectedGateway(id)
  }

  const handleDeleteBtn = (id) => {
    setSelectedGateway(id)
    setDeleteShow(true);
  }

  const onHideHandler = () => {
    setShow(false);
    setDeleteShow(false)
    setGetAgain(!getAgain)
  };

  const deleteGatewayFn = () => {
    axios.delete(`/gateways/${selectedGateway}`)
    .then(res => {
      if(res.status === 200){
        dispatch(deleteGateway(selectedGateway))
        setDeleteShow(false)
        setGetAgain(true)
      }
    })
  }
  

  useEffect(() => {
    let async = true
    if(async){
      axios.get('/gateways')
      .then (res => dispatch(getGateways(res.data), setGetAgain(false)))
      .catch(err => console.log(err))
    }
    return () => {
      async = false
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAgain])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Gateways </h2>
        <Button type="secondary" text="Add Gateway" icon={<FiPlus />} action={handleAddBtn} />
      </div>
      <div>
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th scope=""></th>
              <th scope="col">Serial Number </th>
              <th scope="col">Name</th>
              <th scope="col">IPv4 </th>
              <th scope="col">Devices </th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            {
              gateways && gateways.length > 0
              ? gateways.map((gateway, i) => (
              <tr key={i}>
                <td>
                  <FiServer />
                </td>
                <td>{gateway._doc?.serialNo || gateway.serialNo}</td>
                <td>{gateway._doc?.name || gateway.name}</td>
                <td>{gateway._doc?.IPv4 || gateway.IPv4}</td>
                <td>
                { typeof gateway.devices === Array ? gateway.devices.length : 0 } <FiAirplay />
                </td>
                <td>
                  <Button type="link" text="" icon={<FiEye />} action={() => handleViewBtn(gateway._doc._id)} />
                  <Button type="link" text="" icon={<FiPenTool />} action={() => handleEditBtn(gateway._doc._id)} />
                  <Button type="link" text="" icon={<FiTrash2 />} action={() => handleDeleteBtn(gateway._doc._id)} />
                </td>
            </tr>
              ))
              :
              <tr>
                <td colSpan="6" className="bg-white">
                  <Alert className="text-center text-warning" variant="warning"><b>No data to show</b></Alert>
                </td>
              </tr>
            }
            
            
          </tbody>
        </table>
      </div>
      <GatewayForm show={show} edit={edit} selected={selectedGateway} onHideHandler={onHideHandler} setGetAgain={setGetAgain} getAgain={getAgain} />
      <DeleteForm show={deleteShow} onHideHandler={onHideHandler} deleteFn={deleteGatewayFn}/>
    </div>
  );
}
