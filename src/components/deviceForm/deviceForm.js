import {Modal, Button} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import {FormError} from '../index'
import { useSelector } from 'react-redux'
import {FiLoader} from 'react-icons/fi'
import axios from '../../axios'
import {Alert} from 'react-bootstrap'
// import {addGateway, editGateway} from '../../redux/actions/gateways.action'


export default function DeviceForm({edit, show, onHideHandler, selected, selectedGateway}) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState({})
  const gateways = useSelector(state => state.gateways)
  const {devicesArray, count} = useSelector(state => state.devices)
  const [vendor, setVendor] = useState(!edit && "")
  const [vendorError, setVendorError] = useState("")

  // const dispatch = useDispatch()
  const vendorChangeHandler = (e) =>{
    setVendor(e.target.value);
    setVendorError("")
  }

  const validateForm = () => {
    if(!vendor){
      setVendorError("This field is required")
      return false
    }
    return true
  }

  const addDeviceHandler = () => {
    setLoading(true)
    const formValid = validateForm()
    if(formValid){
      axios.post('/peripheral/add',{
        UID:  count+1, 
        vendor: vendor,
        status: true,
        gateway: selectedGateway,
      }).then(res => res.status === 200 && (
        setSuccess(true),
        setLoading(false),
        setTimeout(()=>{
          setSuccess(false)
          onHideHandler()
          setVendor("")
        },1000)))
        .catch(err => {
          setLoading(false)
          console.log(err)
        })
    }
  }

  const editDeviceHandler = () => {
    setLoading(true)
    const formValid = validateForm()
    if(formValid){
      axios.put(`/peripheral/update/${selected}`,{
        ...selectedDevice,
        vendor,
      }).then(res => 
        setLoading(false),
        setVendor(""),
        onHideHandler()
        )
        .catch(err => {
          setLoading(false)
          console.log(err)
        })
    }
  }

  const resetForm = (e) => {
    e.preventDefault()
    onHideHandler()
  } 

  useEffect(() => {
    if(selected){
      const device = devicesArray.find(device => device._id === selected)
      setVendor(device.vendor)
      setSelectedDevice(device)
    }else{
      setVendor("")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  return (
    <Modal show={show} onHide={onHideHandler} >
      <Modal.Header closeButton>
        <Modal.Title> { `${edit ? 'Edit' : 'Add'} Gateway`} </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label>Vendor</label>
          <input type="text" className={`form-control ${vendorError && 'border border-danger'}`} value={vendor} onChange={vendorChangeHandler} />
          {vendorError && <FormError error={vendorError} />}
        </div>
        {
          success &&  <Alert className="text-center text-success" variant="success">Gateway Added Successfully</Alert> 
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={edit ? onHideHandler : resetForm}>Cancel</Button>
        <Button variant="info" onClick={edit ? editDeviceHandler : addDeviceHandler} disabled={loading}>
          {loading && <FiLoader />}
        { `${edit ? 'Edit' : 'Add'} Gateway`}
        </Button>
      </Modal.Footer>
    </Modal>
  )
 }