import {useState} from 'react'
import styles from './devices.module.css'
import {FiServer, FiAirplay, FiPlus, FiArrowLeft} from 'react-icons/fi'
import {FaCircle} from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import {Button} from '../../components'
import {Link} from 'react-router-dom'


export default function Devices () { 
  const [connection, setConnection] = useState(false)
  const [devicesNo, setDevicesNo] = useState(10)
  const toggleConnection = () =>{
    setConnection(!connection)
  }
  const {id} = useParams()
  return (
    <div className={styles.container}>
        <div className={styles.header}>
          <h2>Gateway Name {id} <small className="text-secondary"><sup>{devicesNo} Devices</sup></small></h2>
          <Button type="secondary" text ="Add Device"  icon={<FiPlus />}  action={()=>console.log("Btn")} disabled = {devicesNo >= 10} />
        </div>
        <div className="px-1 my-3">
          <p className="my-1"> 
            <b className="col-4">IPv4:</b> <span className="col-8">192.168.1.1</span> </p>
          <p className="my-1"> <b className="col-4">SN: </b> <span className="col-8"></span>sdsd05212-sdf021212-dsfsdf </p>
        </div>
        <div>
          <table className={`table table-striped ${styles.tableContainer}`}>
            <thead className="table-dark">
              <tr>
                <th scope=""></th>
                <th scope="col">UID  </th>
                <th scope="col">vendor </th>
                <th scope="col">Date Created </th>
                <th scope="col">status  </th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.clickableRow}>
                <td><FiAirplay/></td>
                <td>1</td>
                <td>John</td>
                <td>22-10-2020 10:00:00 PM</td>
                <td>
                  <button className="btn" onClick={toggleConnection}>
                    <FaCircle color="#21dd21"/> <small className="text-success">Online</small>
                  </button>
                  </td>
              </tr>
              <tr className={styles.clickableRow}>
                <td><FiAirplay/></td>
                <td>1</td>
                <td>John</td>
                <td>22-10-2020 10:00:00 PM</td>
                <td>
                  <button className="btn"  onClick={toggleConnection}>
                    <FaCircle color="red"/> <small className="text-danger">Offline</small>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <Link to="/" className="text-secondary">
            <FiArrowLeft />
            <small>Back</small>
          </Link>
        </div>
    </div>
  
  )

 }