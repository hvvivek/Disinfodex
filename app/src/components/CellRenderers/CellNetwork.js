import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CopyToClipboard from 'react-copy-to-clipboard'
import { Zoom } from 'react-toastify';
import {FRONTEND_ENDPOINT} from "../../config/ENDPOINTS"

function CellNetwork(props)
{
    let network_name = props.value
    return <div onClick={(e) => {e.stopPropagation()}}>
        {network_name}
        
        <CopyToClipboard text={`${FRONTEND_ENDPOINT}/${props.row.original._id}`} onCopy={() => toast.dark("Copied to Clipboard", {limit: 1})}>
            <i className="fas fa-link permalink" style={{"cursor":"pointer", "fontSize":"0.8rem", "marginLeft":"0.5rem"}}></i>
        </CopyToClipboard>

        <ToastContainer autoClose={2000} limit={1} hideProgressBar pauseOnFocusLoss={false} transition={Zoom} />
    </div>
}

export default CellNetwork