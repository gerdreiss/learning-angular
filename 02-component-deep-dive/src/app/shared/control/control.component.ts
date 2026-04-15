import {
  Component,
  contentChild,
  ElementRef,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'control' },
})
export class ControlComponent {
  // old way of doing the host styling thing
  //@HostBinding('class') className = 'control';
  label = input.required<string>();
  content =
    contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');
}
