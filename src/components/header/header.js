import styles from './header.module.css'
import {FiServer} from 'react-icons/fi'
export default function Header() {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className={`container ${styles.headerContainer}`}>
        
        <h2>
          <FiServer className="mx-3" size={24}/>
          <span>
            GATEWAY MANAGEMENT
          </span>
        </h2>
        
      </div>
    </nav>
  );
}
