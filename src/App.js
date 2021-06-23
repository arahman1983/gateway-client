import { Header } from "./components";
import {FiServer, FiAirplay} from 'react-icons/fi'

function App() {
  return (
    <>
      <Header />
      <div className="container py-5">
        <table class="table table-striped">
          <thead class="table-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col">Serial Number </th>
              <th scope="col">Name</th>
              <th scope="col">IPv4 </th>
              <th scope="col">Devices </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><FiServer/></td>
              <td>abs-0-ses-ddf</td>
              <td>John Smith</td>
              <td>192.168.2.1</td>
              <td>10 <FiAirplay/></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
