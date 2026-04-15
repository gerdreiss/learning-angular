import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { TicketComponent } from './ticket/ticket.component';
import { Ticket } from './ticket/ticket.model';

@Component({
  selector: 'app-support-tickets',
  templateUrl: './support-tickets.component.html',
  styleUrl: './support-tickets.component.css',
  imports: [NewTicketComponent, TicketComponent],
})
export class SupportTicketsComponent {
  tickets: Ticket[] = [];

  onAdd(data: { title: string; text: string }) {
    const ticket: Ticket = {
      title: data.title,
      request: data.text,
      id: uuidv4(),
      status: 'open',
    };
    this.tickets.push(ticket);
  }

  onCloseTicket(id: string) {
    this.tickets = this.tickets.map((t) => {
      if (t.id === id) {
        return { ...t, status: 'closed' };
      }
      return t;
    });
  }
}
