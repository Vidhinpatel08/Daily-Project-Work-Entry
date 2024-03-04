// React imports
import React, { useContext, useEffect, useRef, useState } from 'react';
// Component imports
import AddClient from './AddClient';
import ClientItem from './ClientItem';
// Context import
import noteContext from '../Context/notes/notecontext';

// ClientList component definition
const ClientList = () => {
    // Refs for modal handling
    const refEdit = useRef(null);
    const refclose = useRef(null);
    const refClient = useRef(null);
    // Accessing context
    const context = useContext(noteContext);
    const { updateClient, getClient, client } = context;
    // State management
    const [mode, setMode] = useState(false);
    const [clients, setClients] = useState({ clientName: '', country: '', code: '' });
    const [filterClient, setFilterClient] = useState('');

    // Function to update client data for editing
    const updateclient = (currentClient) => {
        setMode(currentClient.ActiveStatus);
        setClients(currentClient);
        refEdit.current.click();
    };

    // Function to handle client data submission
    const handleClient = (e) => {
        e.preventDefault();
        updateClient(clients._id, clients.clientName, clients.country, clients.code, mode);
        setClients({ clientName: '', country: '', code: '' });
        setMode(false);
        refclose.current.click();
    };

    // Function to handle input changes
    const onChanges = (e) => {
        setClients({ ...clients, [e.target.name]: e.target.value });
    };

    // Function to toggle client mode
    const toggleMode = () => {
        setMode(!mode);
    };

    // Fetching initial client data
    useEffect(() => {
        getClient();
        // eslint-disable-next-line
    }, []);

    // Component rendering
    return (
        <>
            <div className="topbar fs-5 p-2 m-2 mt-1" style={{ backgroundColor: 'white', color: '#a40df1', fontFamily: 'emoji', borderBottom: '0.5px solid #c1bebe' }}>
                MANAGE CLIENTS
            </div>
            <div className="mx-2 px-3" style={{ backgroundColor: 'white', border: '0.2px solid #c1bebe' }}>
                <h4 className='fw-light mt-4'>Clients List</h4>

                {/* Edit Client button */}
                <button type="button" ref={refEdit} className="btn d-none" data-bs-toggle="modal" data-bs-target="#editClientModal"></button>

                {/* Edit Client Modal */}
                <div className="modal fade" ref={refclose} id="editClientModal" tabIndex="-1" aria-labelledby="#exampleModalAddProject" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Update Client</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleClient}>
                                    <div className="container m-auto">
                                        <div className="AddMember-mobile-style" style={{ display: 'inline-flex' }}>
                                            <label className='' style={{ fontSize: '14px', width: '100%' }}>Client Code</label>
                                            <input type="text" disabled className='bottom-border' style={{ fontSize: '14px' }} value={clients.code} />
                                        </div>
                                        <div className="mt-4 AddMember-mobile-style">
                                            <input type="text" className='bottom-border' placeholder="Client Name *" value={clients.clientName} onChange={onChanges} name="clientName" minLength={2} maxLength={25} required />
                                        </div>
                                        <div className="mt-4 AddMember-mobile-style">
                                            <input type="text" className='bottom-border' placeholder="Country" value={clients.country} onChange={onChanges} name="country" minLength={2} maxLength={25} required />
                                        </div>
                                        <div className="form-check form-switch mt-3 AddMember-mobile-style">
                                            <input className="form-check-input border border-dark" type="checkbox" role="switch" checked={mode} onChange={toggleMode} name="isActive" />
                                            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Is Active?</label>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="submit" className="btn btn-success" ref={refClient}>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add Client button */}
                <div className='d-flex flex-row-reverse mx-2'>
                    <button type="button" className="btn p-0 addMemberStyle" data-bs-toggle="modal" data-bs-target="#createClient">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                        </svg>
                    </button>
                </div>
                {/* AddClient component */}
                <AddClient />

                {/* Filter input */}
                <div className="row">
                    <div className="mt-2 pt-1 AddMember-mobile-style">
                        <input type="text" className='bottom-border w-100 fw-light' value={filterClient} onChange={(e) => setFilterClient(e.target.value)} placeholder="Filter Client" maxLength={25} name="filterClient" />
                    </div>
                </div>

                {/* Client table */}
                <div className='mt-2 border table-responsive p-1'>
                    <table className="table table-striped table-hover text-center p-5">
                        <thead>
                            <tr className='py-2'>
                                <th>Code</th>
                                <th>Client Name</th>
                                <th>Active</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {client.length === 0 ? <tr></tr> :
                                client.filter((client) => {
                                    return filterClient.toLowerCase() === '' ? client : client.clientName.toLowerCase().includes(filterClient.toLowerCase())
                                }).map((client) => {
                                    return <ClientItem key={client._id} code={client.code} clientName={client.clientName} ActiveStatus={client.ActiveStatus} client={client} updateclient={updateclient} />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ClientList;
