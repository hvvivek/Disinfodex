import { useContext } from "react"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import NetworkCard from "../components/NetworkCard"
import DataContext from "../contexts/DataContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CopyToClipboard from 'react-copy-to-clipboard'
import { Zoom } from 'react-toastify';

function Network(props)
{
    const {networks} = useContext(DataContext)
    let network_data = networks.filter(network => network._id === props.id)[0]
    if(network_data)
    {
        return <>
            <div className="flex-container" style={{"flexDirection":"column"}}>
                <Header {...{active: "database"}}/>
                <div className="flex-6" style={{"marginTop":"2rem", "marginBottom":"2rem"}}>
                    <h1 style={{"fontWeight":"700", "display":"flex", "alignItems":"center"}}>Network {network_data["Name"]} 
                    
                    <CopyToClipboard text={window.location} onCopy={() => toast.dark("Copied to Clipboard")}>
                        <i className="fas fa-link permalink" style={{"cursor":"pointer", "fontSize":"1.5rem", "marginLeft":"1rem"}}></i>
                    </CopyToClipboard>
                    </h1>
                    <NetworkCard {...network_data}></NetworkCard>
                </div>
                <Footer {...{active: "database"}}/>
            </div>
            <ToastContainer autoClose={2000} hideProgressBar pauseOnFocusLoss={false} transition={Zoom} />
            </>
    }
    else
    {
        return <p>Loading...</p>
    }
}

export default Network