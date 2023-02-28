const updateTicketCounts = (tickets, setTicketsCount) => {

    const data = {
        open: 0,
        closed: 0,
        in_progress: 0,
        blocked: 0,
        total: 0
    }
    if (tickets.length > 0) {
        for (let ticket of tickets) {
            // console.log(ticket)
            if (ticket.status === 'OPEN') data.open++;
            else if (ticket.status === 'IN_PROGRESS') data.in_progress++;
            else if (ticket.status === 'BLOCKED') data.blocked++;
            else if (ticket.status === 'CLOSED') data.closed++;
        }
        data.total = data.open + data.blocked + data.closed + data.in_progress
        data.total = (data.total === 0) ? 1 : data.total
        setTicketsCount(data);
    }
}

export default updateTicketCounts;