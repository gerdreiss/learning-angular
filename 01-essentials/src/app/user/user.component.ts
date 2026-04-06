import { Component, computed, input, output } from '@angular/core';

//export type User = { id: string; avatar: string; name: string };

export interface User {
  id: string;
  avatar: string;
  name: string;
}

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  //@Input({ required: true }) id!: string;
  //@Input({ required: true }) avatar!: string;
  //@Input({ required: true }) name!: string;
  //@Output() select = new EventEmitter<string>();
  //get imagePath() {
  //  return 'assets/users/' + this.avatar();
  //}

  // id = input.required<string>();
  // avatar = input.required<string>();
  // name = input.required<string>();
  // imagePath = computed(() => 'assets/users/' + this.avatar());
  // select = output<string>();

  user = input.required<User>();
  imagePath = computed(() => 'assets/users/' + this.user().avatar);
  select = output<User>();

  onSelectUser() {
    this.select.emit(this.user());
  }
}
