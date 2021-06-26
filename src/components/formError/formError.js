import {errorClass} from './formError.module.css'
import {FiAlertCircle} from 'react-icons/fi'

export default function FormError({error}){
  return(
    <p className={errorClass}><FiAlertCircle size={10} className="mx-1" />{error}</p>
  )
}