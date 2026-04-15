import { Component, input, output, signal } from '@angular/core';
import { Ticket } from './ticket.model';

@Component({
  selector: 'app-ticket',
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  ticket = input.required<Ticket>();
  visible = signal(false);
  close = output();

  onToggleDetails() {
    // this.visible.set(!this.visible());
    this.visible.update((v) => !v);
  }

  isOpen() {
    return this.ticket().status === 'open';
  }

  isClosed() {
    return this.ticket().status === 'closed';
  }

  onComplete() {
    this.close.emit();
  }
}
