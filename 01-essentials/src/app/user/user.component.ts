import { Component, computed, input, output } from '@angular/core';
import { CardComponent } from '../shared/card/card.component';
import { type User } from './user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [CardComponent],
})
export class UserComponent {
  // old, more complex way of doing in
  //@Input({ required: true }) id!: string;
  //@Input({ required: true }) avatar!: string;
  //@Input({ required: true }) name!: string;
  //@Output() select = new EventEmitter<string>();
  //get imagePath() {
  //  return 'assets/users/' + this.avatar();
  //}

  // new better way
  // id = input.required<string>();
  // avatar = input.required<string>();
  // name = input.required<string>();
  // imagePath = computed(() => 'assets/users/' + this.avatar());
  // select = output<string>();

  // use the whole User object instead of separate fields
  user = input.required<User>();
  selected = input.required<boolean>();
  imagePath = computed(() => 'assets/users/' + this.user().avatar);
  select = output<User>();

  onSelectUser() {
    this.select.emit(this.user());
  }
}
