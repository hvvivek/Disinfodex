import React from 'react'

import MailchimpSubscribe from 'react-mailchimp-subscribe'

import "../../assets/stylesheets/footer.css"
import logo_1 from '../../assets/images/sponsor_logos/sponsor_logo_1.png'

const url = "https://disinfodex.us7.list-manage.com/subscribe/post?u=499d0a85d3a80a9a91bbffe88&amp;id=38b358f70d";

function Footer() {

        return <div id="footer" className="flex-container">
            <footer className="flex-9">
                <div className="flex-container align-items-start">
                    <div style={{"flex":"3 1 0%"}}>
                        <p><a href="http://disinfodex.org" target="_blank" rel="noreferrer">Disinfodex</a> is supported by the <a href="https://cyber.harvard.edu/" target="_blank" rel="noreferrer">Berkman Klein Center at Harvard University</a> and the Ethics and Governance of Artificial Intelligence Fund at <a href="https://miamifoundation.org/" target="_blank" rel="noreferrer">The Miami Foundation</a>. Disinfodex is a partner of <a href="https://carnegieendowment.org/specialprojects/counteringinfluenceoperations" target="_blank" rel="noreferrer">Carnegie Endowment’s Partnership for Countering Influence Operations</a>.</p>
                        <br /><br />

                        <label>Subscribe for news and updates</label>
                        <MailchimpSubscribe url={url}
                        messages = {
                            {
                                sending: "Sending...",
                                success: "Thank you for subscribing!",
                                error: "An unexpected internal error has occurred.",
                                empty: "You cannot leave the field empty.",
                                duplicate: "Too many subscribe attempts for this email address",
                                button: "Subscribe!"
                            }
                        } />
                    </div>
                    <div style={{"flex":"1 1 0%"}}>
                        <div className="justify-content-end">
                            <div className="logo-wrapper">
                                <a href="https://carnegieendowment.org/specialprojects/counteringinfluenceoperations" target="_blank" rel="noopener noreferrer" title="Carnegie Endowment for International Peace: Partnership for Countering Influence Operations" ><img alt="Carnegie Endowment for International Peace: Partnership for Countering Influence Operations" src={logo_1}></img></a>
                            </div>
                        </div>
                    </div>

                </div>
            </footer>

        </div>
}

export default Footer