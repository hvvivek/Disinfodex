import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CopyToClipboard from 'react-copy-to-clipboard'
import { Zoom } from 'react-toastify';
import {FRONTEND_ENDPOINT} from "../config/ENDPOINTS"
import { Modal } from 'react-bootstrap'
import NetworkCard from './NetworkCard'


function NetworkCardModal(props)
{
    let {isModalOpen, setModelOpen, currentNetwork, tableInstance} = props
      return <Modal animation={false} show={isModalOpen} size="lg" onHide={()=>setModelOpen(false)} className="network-card">
          <Modal.Header closeButton>
            <h1>Network {currentNetwork.original.Name} 
                  <CopyToClipboard text={`${FRONTEND_ENDPOINT}/${currentNetwork.original._id}`} onCopy={() => toast.dark("Copied to Clipboard")}>
                      <i className="fas fa-link permalink" style={{"cursor":"pointer", "fontSize":"1.5rem", "marginLeft":"1rem"}}></i>
                  </CopyToClipboard>
              </h1>
          </Modal.Header>
          <Modal.Body>
                <NetworkCard {...{...currentNetwork.original, tableInstance}}/>
          </Modal.Body>
          <ToastContainer autoClose={2000} hideProgressBar pauseOnFocusLoss={false} transition={Zoom} />
        </Modal>
}

export default NetworkCardModal