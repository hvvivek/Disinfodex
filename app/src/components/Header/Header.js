import "../../assets/stylesheets/header.css"

function Header(props)
{

    return <div id="header" className="flex-container" >
                <div className="flex-container flex-9" style={{"flexDirection":"column"}} >
                    <div className="navbar flex-container" style={{"alignSelf":"start"}}>
                        <a className="brand" href="/">dis<span>•</span>info<span>•</span>dex</a>

                    </div>
                    <div className="flex-container sub-header">
                        <div style={{"flex":"1 30%"}}>
                            <p>Disinfodex is a database of publicly available information about disinformation campaigns. It currently includes disclosures issued by major online platforms and accompanying reports from independent open source investigators.</p>
                        </div>
                        <div  style={{"flex":"3 1 0%", "textAlign":"right"}}>
                            <p className="links"><a href="/" className={props.active === "database" && "active"}>Database</a></p>
                            <p className="links"><a href="/about" className={props.active === "about" && "active"}>About this project</a></p>
                            <p className="links"><a href="how-to" className={props.active === "how-to" && "active"}>How it works</a></p>
                        </div>
                    </div>
                </div>
            </div>
}

export default Header