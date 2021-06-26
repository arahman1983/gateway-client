import { useState, useEffect } from "react";
import styles from "./devices.module.css";
import { FiAirplay, FiPlus, FiArrowLeft, FiPenTool, FiTrash2 } from "react-icons/fi";
import { FaCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Button, DeviceForm, DeleteForm } from "../../components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {getDevices} from '../../redux/actions/devices.action'
import { Alert } from "react-bootstrap";
import axios from "../../axios";

export default function Devices() {
  const [selectedDevice, setSelectedDevice] = useState();
  const [edit, setEdit] = useState(false);
  const { id } = useParams();
  const gateway = useSelector((state) => state.gateways.find((gateway) => gateway._doc._id === id));
  const [devices, setDevices] = useState([])
  const devicesArray = useSelector(state => state.devices.devicesArray)
  const count = useSelector(state => state.devices.count)
  const [devicesNo, setDevicesNo] = useState(0);
  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [getAgain, setGetAgain] = useState(false);
  const dispatch = useDispatch()

  const handleAddBtn = () => {
    setEdit(false);
    setShow(true);
  };

  const handleEditBtn = (id) => {
    setShow(true);
    setEdit(true);
    setSelectedDevice(id);
  };

  const handleDeleteBtn = (id) => {
    setSelectedDevice(id);
    setDeleteShow(true);
  };

  const toggleConnection = (id) => {
    const device = devices.find(device => device._id === id)
    axios.put(`/peripheral/update/${id}`,{
      ...device,
      status: !device.status
    }).then(res => 
        onHideHandler()
      )
      .catch(err => {
        console.log(err)
      })
  };

  const onHideHandler = () => {
    setShow(false);
    setEdit(false);
    setSelectedDevice(null)
    setDeleteShow(false);
    setGetAgain(!getAgain);
  };

  const deleteDeviceFn = ()=>{
    axios.delete(`/peripheral/${selectedDevice}`)
    .then(res => res.status === 200 && onHideHandler())
    .catch(err => console.log(err))
  }

  useEffect(() => {
    let async = true
    if(async){
      axios.get('/peripheral')
      .then(res =>{
        const devices = res.data.filter(device => device.gateway === gateway._doc._id)
        dispatch(getDevices(res.data, count > res.data.length ? count : res.data.length))
        setDevices(devices)
        setDevicesNo(devices.length);
      }
        )
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
        <h2>
          {" "}
          {gateway && gateway._doc.name}{" "}
          <small className="text-secondary">
            <sup>{devicesNo} Devices</sup>
          </small>
        </h2>
        <Button type="secondary" text="Add Device" icon={<FiPlus />} action={handleAddBtn} disabled={devicesNo >= 10} />
      </div>
      <div className="px-1 my-3">
        <p className="my-1">
          <b className="col-4">IPv4:</b> <span className="col-8">{gateway && gateway._doc.IPv4}</span>{" "}
        </p>
        <p className="my-1">
          {" "}
          <b className="col-4">SN: </b> <span className="col-8"></span> {gateway && gateway._doc.serialNo}{" "}
        </p>
      </div>
      <div>
        <table className={`table table-striped ${styles.tableContainer}`}>
          <thead className="table-dark">
            <tr>
              <th scope=""></th>
              <th scope="col">UID </th>
              <th scope="col">vendor </th>
              <th scope="col">Date Created </th>
              <th scope="col">status </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {devices.length > 0 ? (
              devices.map((device, i) => (
                <tr key={i}>
                  <td>
                    <FiAirplay />
                  </td>
                  <td>{device.UID}</td>
                  <td>{device.vendor}</td>
                  <td>{device.createdAt}</td>
                  <td>
                      {
                      device.status ?
                      <button className="btn" onClick={()=>toggleConnection(device._id)}>
                          <FaCircle color="#21dd21" /> <small className="text-success">Online</small>
                      </button>
                      : <button className="btn" onClick={()=>toggleConnection(device._id)}>
                          <FaCircle color="red" /> <small className="text-danger">Offline</small>
                      </button>
                      }
                  </td>
                  <td>
                    <Button type="link" text="" icon={<FiPenTool />} action={() => handleEditBtn(device._id)} />
                    <Button type="link" text="" icon={<FiTrash2 />} action={() => handleDeleteBtn(device._id)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="bg-white">
                  <Alert className="text-center text-warning" variant="warning">
                    <b>No data to show</b>
                  </Alert>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <Link to="/" className="text-secondary">
          <FiArrowLeft />
          <small>Back</small>
        </Link>
      </div>
      <DeviceForm show={show} edit={edit} selected={selectedDevice} onHideHandler={onHideHandler} selectedGateway={id}/>
      <DeleteForm show={deleteShow} onHideHandler={onHideHandler} deleteFn={deleteDeviceFn} />
    </div>
  );
}
