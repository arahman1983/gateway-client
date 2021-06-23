import styles from './button.module.css'

export default function Button({type, text, icon,  action}) { 
  return(
    <button className={`btn ${styles[type]}`} onClick={action}>
      {icon && icon}
      <span className={styles.text}>
        {text}
      </span>
    </button>
  )
}