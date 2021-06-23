import styles from './header.module.css'
import {FiPlus, FiServer} from 'react-icons/fi'
import {Button} from '../'

export default function Header({AddGateway}) {
  return (
    <nav class="navbar navbar-dark bg-dark">
      <div class={`container ${styles.headerContainer}`}>
        
        <h2>
          <FiServer className="mx-3"/>
          <span>
            GATEWAY MANAGEMENT
          </span>
        </h2>
        <Button icon={<FiPlus size={20} />} action={AddGateway} text="Add Gateway" type="light" />
      </div>
    </nav>
  );
}
