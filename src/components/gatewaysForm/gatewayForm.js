import {Modal, Button} from 'react-bootstrap'
import {useState, useEffect} from 'react'
import {FormError} from '../index'
import { useSelector, useDispatch } from 'react-redux'
import {FiLoader} from 'react-icons/fi'
import axios from '../../axios'
import {Alert} from 'react-bootstrap'
import {addGateway, editGateway} from '../../redux/actions/gateways.action'

const IPRegex = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/

export default function GatewayForm({edit, show, onHideHandler, selected}) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [serialNumber, setSerialNumber] = useState("")
  const [gatewayName, setGateway] = useState("")
  const [IPv4, setIPv4] = useState("")
  const [selectedGateWay, setSelectedGateWay] = useState({})
  const gateways = useSelector(state => state.gateways)
  
  const dispatch = useDispatch()
  const [serialNumberError, setSerialNumberError] = useState("")
  const [gatewayNameError, setGatewayError] = useState("")
  const [IPv4Error, setIPv4Error] = useState("")

  const serialChangeHandler = (e) => {
    setSerialNumberError(""); 
    setSerialNumber(e.target.value)
  }
  const gatewayNameHandler = (e) => {
    setGatewayError("")
    setGateway(e.target.value)
  }
  const IPv4ChangeHandler = (e) => {
    setIPv4Error("")
    setIPv4(e.target.value)
  }

  const validateGateway = () => {
    const uniqueCheck = 
    selected 
    // eslint-disable-next-line array-callback-return
    ? gateways.filter(gateway => {
      if(gateway._doc.serialNo === serialNumber && gateway._doc.serialNo !== selectedGateWay._doc.serialNo){
      return gateway
      }}
      )
    : gateways.filter(gateway => gateway._doc.serialNo === serialNumber)
    
    if(!serialNumber || uniqueCheck.length > 0){
      setSerialNumberError("Unique Serial Number is required")
      setLoading(false)
      return false
    }
    if(!gatewayName){
      setGatewayError("This field is required")
      setLoading(false)
      return false
    }
    if(!IPRegex.test(IPv4)){
      setIPv4Error("Please enter valid IPv4")
      setLoading(false)
      return false
    }
    
    return true
  }

  const addGatewayHandler = () => {
    setLoading(true)
    const formValid = validateGateway()
    if(formValid){
      axios.post('/gateways/add',{
        serialNo: serialNumber,
        name: gatewayName,
        IPv4: IPv4
      }).then(res => res.status === 200 && (
        setSuccess(true),
        setLoading(false),
        setTimeout(()=>{
          setSuccess(false)
          onHideHandler()
          setSerialNumber("")
          setGateway("")
          setIPv4("")
        },1000)
      ))
      .catch(err => console.error(err))
    }
  }

  const editGatewayHandler = () => {
    setLoading(true)
    const formValid = validateGateway()
    if(formValid){
      axios.put(`/gateways/update/${selected}`,{
        serialNo: serialNumber,
        name: gatewayName,
        IPv4: IPv4
      })
      .then(() =>
        setLoading(false),
        onHideHandler()
      )
      .catch(err => console.log(err))
    }
  }

  const resetForm = (e) => {
    e.preventDefault()
    setSerialNumber("")
    setGateway("")
    setIPv4("")
    setSerialNumberError("")
    setGatewayError("")
    setIPv4Error("")
    onHideHandler()
  } 

  useEffect(() => {
    if(selected){
      const gateway = gateways.find(gateway => gateway._doc._id === selected)
      console.log(selected, gateway)
      setSerialNumber(gateway._doc.serialNo)
      setGateway(gateway._doc.name)
      setIPv4(gateway._doc.IPv4)
      setSelectedGateWay(gateway)
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
          <label>Serial Number</label>
          <input type="text" className={`form-control ${serialNumberError && 'border border-danger'}`} value={serialNumber} onChange={serialChangeHandler} />
          {serialNumberError && <FormError error={serialNumberError} />}
        </div>
        <div className="form-group">
          <label>Gateway Name</label>
          <input type="text" className={`form-control ${gatewayNameError && 'border border-danger'}`}  value={gatewayName} onChange={gatewayNameHandler} />
          {gatewayNameError && <FormError error={gatewayNameError} />}
        </div>
        <div className="form-group">
          <label>IPv4</label>
          <input type="text" className={`form-control ${IPv4Error && 'border border-danger'}`}  minLength="7" maxLength="15" size="15" value={IPv4} onChange={IPv4ChangeHandler} />
          {IPv4Error && <FormError error={IPv4Error} />}
        </div>
        {
          success &&  <Alert className="text-center text-success" variant="success">Gateway Added Successfully</Alert> 
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={edit ? onHideHandler : resetForm}>Cancel</Button>
        <Button variant="info" onClick={edit ? editGatewayHandler : addGatewayHandler} disabled={loading}>
          {loading && <FiLoader />}
        { `${edit ? 'Edit' : 'Add'} Gateway`}
        </Button>
      </Modal.Footer>
    </Modal>
  )
 }