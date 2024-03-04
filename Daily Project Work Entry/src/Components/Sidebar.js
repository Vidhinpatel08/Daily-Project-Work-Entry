import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import globalContext from '../Context/notes/globalContext';

// Sidebar component definition
const Sidebar = ({ children }) => {
    // Accessing global context
    const gContext = useContext(globalContext);
    // Destructuring sidebarIsOpen and setSidebarIsOpen from global context
    const { sidebarIsOpen, setSidebarIsOpen } = gContext;
    // State variables for sidebar status
    const [isopen, setIsOpen] = useState(sidebarIsOpen);
    const [isopenMaster, setIsOpenMaster] = useState(false);
    const [isopenReport, setIsOpenReport] = useState(false);

    // Function to toggle sidebar
    const toggle = () => {
        setIsOpen(!isopen);
        setSidebarIsOpen(!isopen);
    };

    // // Function to handle window resize
    // const handleResize = () => {
    //     if (window.innerWidth <= 722) {
    //         setIsOpen(true);
    //         setSidebarIsOpen(true);
    //     }
    // };

    // // Effect to listen for window resize
    // useEffect(() => {
    //     window.addEventListener('resize', handleResize);
    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    //     // eslint-disable-next-line
    // }, []);

    useEffect(() => {
        setIsOpen(sidebarIsOpen);
        // console.log("isopen:",isopen)
        // eslint-disable-next-line
    }, [sidebarIsOpen]);

    const navigation_mobile = () => {
        if (window.innerWidth <= 722) {
            toggle()
        }
    }


    return (
        <div className='d-flex ' id='sidebar-main-container'>
            <div className={isopen ? "sidebar open" : "sidebar"} id='sidebar-container' style={{ transition: 'all 0.5s' }} >
                <div className="top_section" id='Bar-logo-sidebar'>
                    <div className="bars pt-1">
                        {!isopen ?
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={toggle} width="30" height="30" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                            </svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" onClick={toggle} width="29" height="29" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                            </svg>
                        }
                    </div>
                </div>

                {/* Navigation links */}
                <NavLink to='/' className='link d-flex align-items-center justify-content-start  Navigatiom_mobile_sidebar' onClick={navigation_mobile} aria-activedescendant='active'  >
                    <div className="icone">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-display" viewBox="0 0 16 16">
                            <path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4c0 .667.083 1.167.25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75c.167-.333.25-.833.25-1.5H2s-2 0-2-2V4zm1.398-.855a.758.758 0 0 0-.254.302A1.46 1.46 0 0 0 1 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 0 0 .254-.302 1.464 1.464 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 0 0-.302-.254A1.46 1.46 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145z" />
                        </svg>
                    </div>
                    <div className="link_text  justify-content-start" style={{ display: isopen ? 'block' : 'none' }}>
                        DASHBOARD
                    </div>
                </NavLink>
                <NavLink to='/dprs' className='link d-flex align-items-center justify-content-start  Navigatiom_mobile_sidebar' onClick={navigation_mobile} aria-activedescendant='active'  >
                    <div className="icone">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                        </svg>
                    </div>
                    <div className="link_text justify-content-start" style={{ display: isopen ? 'block' : 'none' }}>
                        DPRS
                    </div>
                </NavLink>
                <NavLink to='/project' className='link d-flex align-items-center justify-content-start  Navigatiom_mobile_sidebar' onClick={navigation_mobile} aria-activedescendant='active'  >
                    <div className="icone">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-vcard" viewBox="0 0 16 16">
                            <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8Zm1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z" />
                            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12V4Z" />
                        </svg>
                    </div>
                    <div className="link_text justify-content-start" style={{ display: isopen ? 'block' : 'none' }}>
                        MANAGE PROJECT
                    </div>
                </NavLink>

                {/* Master section */}
                <div className={isopenMaster ? 'sidebar-item open' : 'sidebar-item'} aria-activedescendant='active' tabIndex={0}>
                    <div className="sidebar-title" onClick={() => { setIsOpenMaster(!isopenMaster) }}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-window-stack" viewBox="0 0 16 16">
                                <path d="M4.5 6a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM6 6a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" />
                                <path d="M12 1a2 2 0 0 1 2 2 2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2 2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10ZM2 12V5a2 2 0 0 1 2-2h9a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1Zm1-4v5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8H3Zm12-1V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2h12Z" />
                            </svg>
                            <div className="link_text justify-content-start" style={{ display: isopen ? 'block' : 'none' }}>
                                MASTER
                            </div>
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" style={{ display: isopen ? 'block' : 'none' }} className="bi bi-chevron-down toggle-btn" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </div>
                    <div className='sidebar-content'>
                        <NavLink to='/member' className="sidebar-subconent Navigatiom_mobile_sidebar" onClick={navigation_mobile} >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                </svg>
                                <div className=" justify-content-start" style={{ display: isopen ? 'block' : 'none' }}>
                                    MEMBERS
                                </div>
                            </span>
                        </NavLink>
                        <NavLink to='/client' className="sidebar-subconent Navigatiom_mobile_sidebar" onClick={navigation_mobile} >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z" />
                                </svg>
                                <div className=" justify-content-start" style={{ display: isopen ? 'block' : 'none', transition: 'all 0.5s' }}>
                                    CLIENTS
                                </div>
                            </span>
                        </NavLink>

                    </div>
                </div>

                {/* Report section */}
                <div className={isopenReport ? 'sidebar-item open' : 'sidebar-item'} aria-activedescendant='active' tabIndex={1}>
                    <div className="sidebar-title" onClick={() => { setIsOpenReport(!isopenReport) }}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-card-list" viewBox="0 0 16 16">
                                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                                <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                            </svg>
                            <div className="link_text justify-content-start" style={{ display: isopen ? 'block' : 'none', transition: 'all 0.5s' }}>
                                REPORT
                            </div>
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" style={{ display: isopen ? 'block' : 'none' }} className="bi bi-chevron-down toggle-btn" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </div>
                    <div className='sidebar-content'>
                        <NavLink to='/activitydetails' className="sidebar-subconent Navigatiom_mobile_sidebar" onClick={navigation_mobile} >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list-task" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z" />
                                    <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />
                                    <path fillRule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z" />
                                </svg>
                                <div className=" justify-content-start" style={{ display: isopen ? 'block' : 'none' }}>
                                    USER ACTIVITY DETAIL
                                </div>
                            </span>
                        </NavLink>
                        <NavLink to='/activitysummary' className="sidebar-subconent Navigatiom_mobile_sidebar" onClick={navigation_mobile} >
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list-stars" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z" />
                                    <path d="M2.242 2.194a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.256-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53z" />
                                </svg>
                                <div className=" justify-content-start" style={{ display: isopen ? 'block' : 'none' }}>
                                    USER ACTIVITY SUMMARY
                                </div>
                            </span>
                        </NavLink>

                    </div>
                </div>
            </div>
            <main>{children}</main>
        </div>
    )
}

export default Sidebar;