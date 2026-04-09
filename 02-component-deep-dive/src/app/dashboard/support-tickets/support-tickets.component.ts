import { Component } from '@angular/core';
import { NewTicketComponent } from './new-ticket/new-ticket.component';

@Component({
  selector: 'app-support-tickets',
  templateUrl: './support-tickets.component.html',
  styleUrl: './support-tickets.component.css',
  imports: [NewTicketComponent],
})
export class SupportTicketsComponent {}
