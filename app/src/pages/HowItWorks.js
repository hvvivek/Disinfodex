
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import "../assets/stylesheets/how_it_works.css"

function HowItWorks()
{
    return (<>
        <Header {...{active: "how-to"}}/>
        <div id="contents">
            <div className="c10">
                <div>
                    <p className="c4 c5"><span className="c0"></span></p>
                </div>
                <p className="c4 c5"><span className="c3 c12"></span></p>
                <p className="c4"><span className="c12">How it works</span></p>
                <p className="c4 c5"><span className="c0"></span></p>
                <p className="c4"><span className="c2">In this page, you will find more information about the </span><span
                        className="c2 c3">contents of the Disinfodex database</span><span className="c2">&nbsp;and about the
                    </span><span className="c2 c3"> ways to search and read the database</span><span className="c2">. In addition, you
                        will find a </span><span className="c2 c3">FAQ </span><span className="c7 c2">addressing questions such as our
                        source inclusion process, frequency of updating, and other considerations. </span></p>
                <p className="c4 c5"><span className="c0"></span></p>
                <p className="c4"><span className="c14 c13 c3">What you will find in the Disinfodex database</span></p>
                <p className="c4"><span className="c7 c2">Disinfodex.org indexes, aggregates and makes it easier to search and analyze
                        publicly available information about disinformation campaigns posted since 2017. As of Autumn 2020, it
                        focuses on information released by the following technology companies: </span></p>
                <ul className="c8 lst-kix_3dm2a9cn64mm-0 start">
                    <li className="c4 c9 li-bullet-0"><span className="c7 c2">Facebook</span></li>
                    <li className="c4 c9 li-bullet-0"><span className="c7 c2">Twitter</span></li>
                    <li className="c4 c9 li-bullet-0"><span className="c2 c7">Google/YouTube</span></li>
                    <li className="c4 c9 li-bullet-0"><span className="c7 c2">Reddit</span></li>
                </ul>
                <p className="c4"><span className="c7 c2">For these companies, Disinfodex typically indexes information posted on the
                        company’s official channels or by its official representatives on social media, which specifically
                        pertains to actions taken against networks of accounts, pages, etc. driving disinformation campaigns.
                    </span></p>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4"><span className="c7 c2">In addition, the database includes information released by the following
                        organizations’ open source investigation teams (with more to come):</span></p>
                <ul className="c8 lst-kix_grif655x4puz-0 start">
                    <li className="c4 c9 li-bullet-0"><span className="c7 c2">Graphika</span></li>
                    <li className="c4 c9 li-bullet-0"><span className="c7 c2">DFR Lab</span></li>
                    <li className="c4 c9 li-bullet-0"><span className="c7 c2">Stanford Internet Observatory (SIO)</span></li>
                </ul>
                <p className="c4"><span className="c2">For these organizations, Disinfodex will typically index in-depth reports
                        published about actions taken by one or more or the technology companies mentioned above against
                        disinformation networks, as opposed to other reports these organizations might publish (for instance,
                        reports analyzing trends in the disinformation landscape, </span><span className="c2">or analyzing
                        operations that are not connected to actions taken by one or more of the platforms outlined
                        above</span><span className="c7 c2">). </span></p>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4"><span className="c7 c2">We aim to make it easy for users to see when such reports are connected and
                        relate to the same networks. </span></p>
                <p className="c4 c5"><span className="c0"></span></p>
                <p className="c4"><span className="c13 c3">How to search and use the Disinfodex database</span></p>
                <p className="c4"><span className="c2">This s</span><span className="c7 c2">ection covers the different views of the
                        database, the search box and filters for the database, and how to download a CSV version of the
                        database.</span></p>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4"><span className="c14 c2 c3">Card view and Table view</span></p>
                <p className="c4"><span className="c2">As of</span><span className="c2">&nbsp;</span><span className="c2">May 2021</span><span
                        className="c2">, the Disinfodex database indexes action taken against more than </span><span className="c2">250
                        networks spanning more than 340 disclosures </span><span className="c7 c2">since 2017.</span></p>
                <ul className="c8 lst-kix_gqhugt66gsak-0 start">
                    <li className="c4 c9 li-bullet-0"><span className="c7 c2">A “network” means: groups of accounts or entities
                            coordinating in ways that are deceptive or inauthentic, typically resulting in violations of the
                            policies of the platforms who report on these networks. </span></li>
                    <li className="c4 c9 li-bullet-0"><span className="c7 c2">A “disclosure” means: the ways by which a platform
                            communicates on actions taken against one or more networks. Typically, disclosures take the form of
                            blog posts in which platforms list actions taken against a number of networks and provide some
                            information about their origin, activity, and/or policy violations. </span></li>
                </ul>
                <p className="c4"><span className="c2">⇒ One network may be involved in multiple disclosures. For instance, it may be
                        that a platform notes that a disclosure it makes on date t+1 pertains to a network it already took
                        action against on date t, but which has since deployed new tactics or renewed its efforts to create
                        assets on the platform. </span></p>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4"><span className="c2">Networks and disclosures</span><span className="c7 c2">&nbsp;can be explored in two
                        ways: a card view (default) and a table view.. More on each view: </span></p>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4"><span className="c2">Each line in t</span><span className="c2">he </span><span className="c6 c2 c3">Table
                        view</span><span className="c2">&nbsp;</span><span className="c2">(default view) represents a network, which may
                        be associated to one or more disclosures by one or more platforms. The default view is sorted by
                        chronological order, starting with the networks that have been most recently featured in a disclosure –
                        and where multiple entities have reported on a network (e.g. one platform and one third party
                        investigator), they will be highlighted in the “source” column.</span><span className="c2">. </span><span
                        className="c2">Clicking on a line will lead to the card view for further exploration of a
                        network.</span><span className="c7 c2">&nbsp;</span></p>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4"><span className="c2">The </span><span className="c6 c2 c3">Card view</span><span className="c2">&nbsp;provides
                        an easily readable recap of actions taken against each network in the database. </span><span
                        className="c2">Upon opening a card, </span><span className="c2">you will see key information about the network
                        and actions taken against it, and have the option to open more detailed descriptions from each of the
                        entities that reported on the network </span><span className="c2">&nbsp;</span><span
                        className="c2">&nbsp;</span></p>
                <p className="c4 c5"><span className="c6 c2 c11"></span></p>
                <p className="c4"><span className="c14 c2 c3">Searching Disinfodex</span></p>
                <p className="c4"><span className="c7 c2">Both the Card and Table views are meant to be easily searched or filtered so
                        you can find the exact information you need. </span></p>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4"><span className="c7 c2">You can search each view by typing the keyword(s) you are interested in
                        directly in the search bar that’s above the database. All relevant entries will be pulled
                        dynamically.</span></p>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4"><span className="c2">Alternatively, you can use the filters displayed above the table to focus on
                        specific companies, dates, </span><span className="c2">named entities,</span><span
                        className="c2">&nbsp;</span><span className="c7 c2">types of removals, or countries. </span></p>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4"><span className="c2 c3">Downloading Disinfodex</span></p>
                <p className="c4"><span className="c2">You can download a CSV of the database by clicking the ‘download CSV’ link that
                        appears at the bottom left of the Table view. Downloading Disinfodex is free, as is using information
                        from the database for your research or journalistic projects –&nbsp;we simply ask that you cite us if
                        you do. </span></p>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4"><span className="c14 c13 c3">How to read the Disinfodex database</span></p>
                <p className="c4"><span className="c7 c2">The Disinfodex database codes public disclosures alongside a number of
                        attributes, for the purpose of making them easier for you to search and analyze. This section outlines
                        what each of these attributes represent, starting with the arbitrary Network Codes that we generate for
                        each network in the database. </span></p>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4"><span className="c2 c3">Reading Network Codes in the Disinfodex database: </span></p>
                <p className="c4"><span className="c2">Disinfodex indexes actions or findings about disinformation networks, by which we
                        mean </span><span className="c2">groups of accounts or entities coordinating in ways that are deceptive or
                        inauthentic, typically resulting in violations of the policies of the platforms who report on these
                        networks</span><span className="c7 c2">. Each platform and investigator may have different criteria for
                        determining what constitutes a network and Disinfodex reflects these determinations.</span></p>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4"><span className="c7 c2">To that end, for each distinct network detailed in disclosures or reports that
                        we index, we generate an arbitrary network identifiers, or “Network ID”, which is structured as
                        [ENTITY]-[COUNTRY]-[DATE] – where:</span></p>
                <ul className="c8 lst-kix_fw8uh1wwswqz-0 start">
                    <li className="c4 c9 li-bullet-0"><span className="c6 c2">“</span><span className="c6 c2 c3">ENTITY</span><span
                            className="c2 c6">” </span><span className="c7 c2">refers to a 2 or 3 letters identifier for the entity
                            releasing information about this network. The current list of entities includes:</span></li>
                </ul>
                <ul className="c8 lst-kix_fw8uh1wwswqz-1 start">
                    <li className="c1 li-bullet-0"><span className="c7 c2">DFR: DFR Lab</span></li>
                    <li className="c1 li-bullet-0"><span className="c7 c2">GRA: Graphika</span></li>
                    <li className="c1 li-bullet-0"><span className="c7 c2">GY: Google/YouTube</span></li>
                    <li className="c1 li-bullet-0"><span className="c7 c2">FB: Facebook</span></li>
                    <li className="c1 li-bullet-0"><span className="c7 c2">RD: Reddit</span></li>
                    <li className="c1 li-bullet-0"><span className="c2">SIO: Stanford Internet Observatory</span></li>
                    <li className="c1 li-bullet-0"><span className="c7 c2">TW: Twitter</span></li>
                </ul>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <ul className="c8 lst-kix_fw8uh1wwswqz-0">
                    <li className="c4 c9 li-bullet-0"><span className="c2">“</span><span className="c2 c3">COUNTRY</span><span className="c2">”
                        </span><span className="c2">refers to the country of origin of a network, referred to via its </span><span
                            className="c2">2-letter </span><span className="c2">ISO country code as indexed here (for instance: FR for
                            France, EG for Egypt). </span><span className="c2">The notion of ‘origin’ should be understood here as:
                            the country that the platform and investigators have deemed that the network was most likely
                            operated from – which does not always mean that the local government or that local actors were
                            involved. </span><span className="c2">For cases where the country of origin is unclear in the reporting,
                            we mark the country section as “UNKNOWN’. For instance, GRA-UNKNOWN would refer to a network
                            reported by Graphika whose country of origin is unknown. For cases where there are multiple
                            countries of origin, we include all of their 2-letter codes in a sequence. For instance, GY-EGFR
                            would refer to a network reported by Google/YouTube originating from Egypt and France.</span></li>
                </ul>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <ul className="c8 lst-kix_fw8uh1wwswqz-0">
                    <li className="c4 c9 li-bullet-0"><span className="c2 c3">“DATE”</span><span className="c7 c2">&nbsp;refers to the month
                            and year of initial reporting of this network by the entity who disclosed it. For instance,
                            DFR-EE-0519 would refer to a network reported on by DFR Lab for the first time in May 2019. If an
                            entity later reports more information or actions taken about the same network, we will continue to
                            use the same network ID. There are occasions for which an entity first reports on multiple separate
                            networks originating from the same country at the same date. In that case, we add letters (A, B, C…)
                            at the end of network IDs to differentiate these networks. For instance, DFR-EE-0519-A and
                            DFR-EE-0519-B would refer to two separate networks reported on by DFR Lab for the first time in May
                            2019.</span></li>
                </ul>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4"><span className="c2 c3">Attributes in the Disinfodex database</span></p>
                <p className="c4"><span className="c7 c2">The database comprises the following attributes – all of which are available
                        in its downloadable CSV version; some may be removed from the online version for legibility: </span></p>
                <ul className="c8 lst-kix_4k2xl69enp6p-0 start">
                    <li className="c4 c9 li-bullet-0"><span className="c2 c3">Date</span><span className="c7 c2">: the date of publication
                            of the report or disclosure</span></li>
                    <li className="c4 c9 li-bullet-0"><span className="c2 c3">Source</span><span className="c7 c2">: the name of the
                            organization releasing a report or disclosure</span></li>
                    <li className="c4 c9 li-bullet-0"><span className="c2 c3">Network ID</span><span className="c7 c2">: the network
                            identifiers of all networks related to this disclosure or report (see Network ID, above, for more
                            information on identifiers).</span></li>
                </ul>
                <ul className="c8 lst-kix_4k2xl69enp6p-1 start">
                    <li className="c1 li-bullet-0"><span className="c7 c2">This means that if, for instance, Twitter reports actions
                            taken against a network of accounts that Graphika has also covered in a separate, third party
                            report, two network IDs will be displayed – one from Twitter, one from Graphika.</span></li>
                    <li className="c1 li-bullet-0"><span className="c7 c2">The purpose of showing all network IDs is to help third
                            Disinfodex users easily understand what connections exist between different public reports.</span>
                    </li>
                </ul>
                <ul className="c8 lst-kix_4k2xl69enp6p-0">
                    <li className="c4 c9 li-bullet-0"><span className="c2 c3">Destination country</span><span className="c7 c2">: any
                            information shared about the country the network targeted (sometimes it may be more than one
                            country; and sometimes it may be simply information about the languages the network used). </span>
                    </li>
                    <li className="c4 c9 li-bullet-0"><span className="c2 c3">Origin country:</span><span className="c2">&nbsp;any
                            information shared about the country in which the network was operated from </span><span
                            className="c2">(here too it may be more than one country).</span></li>
                    <li className="c4 c9 li-bullet-0"><span className="c2 c3">Named entities</span><span className="c7 c2">: any information
                            shared about a specific entity connected to a campaign (e.g. Government of country X, PR agency Y.
                            There may be more than one entity.)</span></li>
                    <li className="c4 c9 li-bullet-0"><span className="c2 c3">Main URL</span><span className="c7 c2">: the primary URL
                            associated with a disclosure or report (usually a blog post)</span></li>
                    <li className="c4 c9 li-bullet-0"><span className="c2 c3">Secondary URL</span><span className="c7 c2">: any other
                            relevant URL associated with a disclosure or report (usually a PDF)</span></li>
                    <li className="c4 c9 li-bullet-0"><span className="c2 c3">Description</span><span className="c7 c2">: Long-form text
                            providing information about the network and actions taken.</span></li>
                </ul>
                <ul className="c8 lst-kix_4k2xl69enp6p-1 start">
                    <li className="c1 li-bullet-0"><span className="c2">On average, reports from</span><span className="c2">&nbsp;open
                            source investigators tend to be longer than those of platforms, and as such, we include a smaller
                            portion of those directly in disinfodex and recommend clicking through to view full reports if they
                            are of interest.</span></li>
                </ul>
                <ul className="c8 lst-kix_4k2xl69enp6p-0">
                    <li className="c4 c9 li-bullet-0"><span className="c2 c3">Other notes:</span><span className="c7 c2">&nbsp;any other
                            information relevant about the network that does not fit in the prior categories (e.g. advertising
                            spend, when available)</span></li>
                    <li className="c4 c9 li-bullet-0"><span className="c2 c3">Screenshots</span><span className="c7 c2">: links to
                            screenshots related to this disclosure, as provided by the platform or open source investigator.
                            Note: screenshots that are published in PDF reports are not included.</span></li>
                </ul>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4"><span className="c7 c2">In addition, the following attributes are captured specifically for reports
                        provided by technology companies: </span></p>
                <ul className="c8 lst-kix_4k2xl69enp6p-0">
                    <li className="c4 c9 li-bullet-0"><span className="c2 c3">Removal type</span><span className="c7 c2">: in the case of
                            platforms, this covers what they say they took action on (e.g. Facebook, Instagram, Twitter, or
                            YouTube accounts).</span></li>
                    <li className="c4 c9 li-bullet-0"><span className="c2 c3">Removal number</span><span className="c7 c2">: The numbers of
                            removals that took place.</span></li>
                    <li className="c4 c9 li-bullet-0"><span className="c2 c3">Engagement language</span><span className="c7 c2">: what the
                            platform says, if anything, about the amount of engagement with the content or accounts that were
                            removed (e.g. ‘more than X views’, ‘less than Y followers’)</span></li>
                    <li className="c4 c9 li-bullet-0"><span className="c2 c3">Engagement number</span><span className="c7 c2">: raw numbers
                            from the engagement language column, for ease of analysis by researchers.</span></li>
                    <li className="c4 c9 li-bullet-0"><span className="c2 c3">Policy violations</span><span className="c7 c2">: policy
                            violation that resulted in the action taken by the platform.</span></li>
                    <li className="c4 c9 li-bullet-0"><span className="c2 c3">Archive URL</span><span className="c7 c2">: link to an archive
                            of the content that was removed, where available</span></li>
                </ul>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4"><span className="c14 c13 c3">FAQ</span></p>
                <p className="c4 c5"><span className="c14 c2 c3"></span></p>
                <p className="c4"><span className="c2 c3">How did you select the organizations whose content you index in the Disinfodex
                        database?</span></p>
                <p className="c4"><span className="c7 c2">We included the disclosures of four major technology companies that have
                        provided information about actions taken against disinformation campaigns on a regular basis since 2017.
                        In addition, we are in the process of including open source investigators, selected with guidance from
                        the Carnegie Endowment’s Partnership for Countering Influence Operations, who meet certain standards of
                        methodology and transparency.</span></p>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4"><span className="c2 c3">How often is the Disinfodex database updated?</span></p>
                <p className="c4"><span className="c2">We aim to include new updates within days of their release by the organizations
                        whose content we index. </span></p>
                <p className="c4 c5"><span className="c2 c3 c14"></span></p>
                <p className="c4"><span className="c2 c3">Who writes the content in the Disinfodex database? </span></p>
                <p className="c4"><span className="c7 c2">All the content in the database comes directly from the entities that are
                        indexed. Whether it is for raw numbers or full text (e.g. descriptions; naming countries or
                        organizations…), we simply replicate the wording of the entity.</span></p>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4"><span className="c2 c3">I have seen a mistake in the database, how can I call it out? </span></p>
                <p className="c4"><span className="c2">Thanks for spotting it, please let us know by reaching out at </span><span
                        className="c6 c2"><a className="c15"
                            href="mailto:teamdisinfodex@gmail.com">teamdisinfodex@gmail.com</a></span><span className="c2">.</span>
                </p>
                <p className="c4 c5"><span className="c7 c2"></span></p>
                <p className="c4"><span className="c2 c3">What is your funding structure? </span></p>
                <p className="c4"><span className="c2">Disinfodex is a small-scale and mostly volunteer-led project. As of November
                        2020, our funding comes from the Miami Foundation and the Carnegie Endowment for International Peace’s
                        Partnership for Countering Influence Operations. We have also benefited from support from the Harvard
                        Berkman Klein Center’s Assembly program. </span></p>
            </div>
        </div>
        <Footer {...{active: "database"}}/>
        </>
        )
}

export default HowItWorks