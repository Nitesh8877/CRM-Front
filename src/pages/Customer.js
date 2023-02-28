import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar';
import TicketsCard from '../components/TicketsCard';
import '../styles/customer.css'
import axios from 'axios'
import fetchTickets from '../utils/fetchTickets';
import updateTicketCounts from '../utils/updateTicketCounts';
import TicketTable from '../components/TicketTable';
import { Button, Modal } from 'react-bootstrap'
import EditTicketModal from '../components/EditTicketModal';
const BASE_URL = process.env.REACT_APP_SERVER_URL

function Customer() {
  const [ticketStatusCount, setTicketStatusCount] = useState({
    open: 0,
    closed: 0,
    in_progress: 0,
    blocked: 0,
    total: 1
  })
  const [message, setMessage] = useState("");
  const [ticketDetails, setTicketDetails] = useState([]);
  const [ticketCreationModal, setTicketCreationModal] = useState(false)
  const [ticketUpdateModal, setTicketUpdateModal] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState({})
  const fetchAndUpdateTickets = async () => {
    let tickets = await fetchTickets(localStorage)
    updateTicketCounts(tickets, setTicketStatusCount);
    setTicketDetails(tickets)
  }
  useEffect(() => {
    (async () => {
      await fetchAndUpdateTickets()
    })()
  })

  const createTicket = (e) => {
    e.preventDefault();

    const data = {
      title: e.target.title.value,
      description: e.target.description.value
    }
    axios.post(BASE_URL + '/crm/api/tickets/', data, {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }, {
      'userId': localStorage.getItem('userId')
    })
      .then(function (response) {
        setMessage("Ticket Created Successfully")
        closeTicketCreationModal()
        fetchAndUpdateTickets()
      })
      .catch(function (error) {
        if (error.status && error.status === 400) {
          setMessage(error.message)
        }
        else
          console.log(error)
      })

  }

  const closeTicketUpdateModal = () => setTicketUpdateModal(false);
  const closeTicketCreationModal = () => setTicketCreationModal(false);

  const editTicket = (ticket) => {
    const ticketCopy = { ...ticket };
    setSelectedTicket(ticketCopy)
    setTicketUpdateModal(true)
  }
  const onTicketUpdate = (e) => {
    if (e.target.name === 'title')
      selectedTicket.title = e.target.value
    else if (e.target.name === 'description')
      selectedTicket.description = e.target.value
    else if (e.target.name === "status")
      selectedTicket.status = e.target.value
    else if (e.target.name === "ticketPriority")
      selectedTicket.ticketPriority = e.target.value
    setSelectedTicket({ ...selectedTicket })
  }
  const updateTicket = (e) => {
    e.preventDefault()
    axios.put(BASE_URL + '/crm/api/tickets/' + selectedTicket.id, selectedTicket, {
      headers: {
        'x-access-token': localStorage.getItem('token')
      }
    }, {
      'userId': localStorage.getItem("userId")
    }).then(
      (response) => {
        setMessage("Ticket Updated Successfully")
        closeTicketUpdateModal()
        fetchAndUpdateTickets()
      }
    ).catch(
      (error) => {
        if (error.status === 400)
          setMessage(error.message)
        else if (error.status === 401)
          setMessage("Authorization error, retry logging in")
        closeTicketUpdateModal()
        console.log(error.message)
      }
    )
  }

  return (
    <div className="row bg-light" >
      <div className="col-1"><Sidebar home='/' /></div>
      <div className="col-11 py-5 vh-100">
        <div className='container'>
          <div className='pt-4'>
            <h3 className='text-primary text-center'>Welcome, {localStorage.name}</h3>
            <p className='text-muted text-center'>Take a quick look at your dashboard.</p>
          </div>
          {/* {Import some cards} */}

          <div className='row my-4 mx-2 text-cneter'>
            {/* {Open} */}

            <TicketsCard
              type="Open"
              color="bg-primary"
              icon='bi-pencil'
              borders='borders-b'
              count={ticketStatusCount.open}
              total={ticketStatusCount.total}
            />

            {/* {In progress} */}

            <TicketsCard
              type="In_Progress"
              color="bg-warning"
              icon='bi-lighting-charge'
              borders='borders-y'
              count={ticketStatusCount.in_progress}
              total={ticketStatusCount.total}
            />


            {/* {Closed} */}

            <TicketsCard
              type="Closed"
              color="bg-success"
              icon='bi-check2-circle'
              borders='borders-g'
              count={ticketStatusCount.closed}
              total={ticketStatusCount.total}
            />


            {/* {Blocked} */}

            <TicketsCard
              type="Blocked"
              color="bg-secondary"
              icon='bi-slash-circle'
              borders='borders-grey'
              count={ticketStatusCount.blocked}
              total={ticketStatusCount.total}
            />
          </div>
          <hr />
          <p className='text-success'>{message}</p>
          <TicketTable
            ticketDetails={ticketDetails}
            editTicket={editTicket}
          />

          <input
            type='submit'
            className='form-control btn btn-primary my-4'
            value='RAISE TICKET'
            onClick={() => setTicketCreationModal(true)}

          />

          {
            ticketUpdateModal ? (
              <EditTicketModal
                show={ticketUpdateModal}
                onHide={closeTicketUpdateModal}
                selectedTicket={selectedTicket}
                onTicketUpdate={onTicketUpdate}
                updateTicket={updateTicket}
              />
            ) : ("")
          }

          {
            ticketCreationModal ? (
              <Modal
                show={ticketCreationModal}
                onHide={closeTicketCreationModal}
                backdrop='static'
                keyboard={false}
                centered
              >

                <Modal.Header>
                  <Modal.Title>Create A Ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form onSubmit={createTicket}>
                    <div className='p-1'>
                      <div className='input-group'>
                        <span className='input-group-text id=basic-addon2'>Title</span>
                        <input type='text' className='form-control' name='title' required />
                      </div><br />
                      <div className='md-form amber-textarea active-ambar-textarea-2'>
                        <span className='input-group-text id=basic-addon2'>Description</span><br />
                        <textarea id='form16' className='md-textarea form-control' rows='3' name='description' required />

                      </div>
                    </div><br />
                    <div className='d-flex '>
                      <Button variant='secondary' onClick={() => closeTicketCreationModal()}>Cancel</Button>
                      <Button type='submit' variant='primary' onSubmit={createTicket}>Craete</Button><br />
                    </div>
                  </form>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
              </Modal>

            ) : (
              ""
            )
          }

        </div>
      </div>
    </div>

  )
}

export default Customer;