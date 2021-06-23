import styles from './button.module.css'

export default function Button({type, text, icon,  action, disabled}) { 
  return(
    <button className={`btn ${styles[type || 'primary']}`} onClick={action} disabled = {disabled} >
      {icon && icon}
      <span className={styles.text}>
        {text}
      </span>
    </button>
  )
}