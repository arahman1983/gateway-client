import { useState } from "react";
import { FiServer, FiAirplay, FiPlus } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import styles from "./gateways.module.css";
import { Button, GatewayForm } from "../../components";
import { Alert } from "react-bootstrap";

export default function GatewaysPage() {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);

  const gatewayDetails = () => {
    history.push("/1");
  };

  const handleAddBtn = () => {
    setShow(true);
    setEdit(false);
  };

  const onHideHandler = () => {
    setShow(false);
  };

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
            <tr className={styles.clickableRow} onClick={gatewayDetails}>
              <td>
                <FiServer />
              </td>
              <td>abs-0-ses-ddf</td>
              <td>John Smith</td>
              <td>192.168.2.1</td>
              <td>
                10 <FiAirplay />
              </td>
              <td>Edit</td>
            </tr>
            <tr className={styles.clickableRow} onClick={gatewayDetails}>
              <td>
                <FiServer />
              </td>
              <td>abs-0-ses-ddf</td>
              <td>John Smith</td>
              <td>192.168.2.1</td>
              <td>
                10 <FiAirplay />
              </td>
              <td>Edit</td>
            </tr>
          </tbody>
        </table>
        <Alert className="text-center" variant="warning">No data to show</Alert>
      </div>
      <GatewayForm show={show} edit={edit} onHideHandler={onHideHandler} />
    </div>
  );
}
