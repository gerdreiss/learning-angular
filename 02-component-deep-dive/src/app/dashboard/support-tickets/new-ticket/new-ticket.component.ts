import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  output,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from '../../../shared/control/control.component';

@Component({
  selector: 'app-new-ticket',
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  title = '';
  text = '';
  add = output<{ title: string; text: string }>();

  onSubmit() {
    this.add.emit({ title: this.title, text: this.text });
    this.form().nativeElement.reset();
  }

  ngOnInit(): void {
    console.log('INIT');
  }

  ngAfterViewInit(): void {
    console.log('AFTER VIEW INIT');
  }
}
