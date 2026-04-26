import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

const STORAGE_NAME = 'saved-login-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const storageContent = window.localStorage.getItem(STORAGE_NAME);
      if (storageContent) {
        const formData = JSON.parse(storageContent);
        setTimeout(
          () => this.form().setValue({ email: formData.email, password: '' }),
          1,
        );
      }

      const subscription = this.form()
        .valueChanges?.pipe(debounceTime(500))
        .subscribe({
          next: (v) =>
            window.localStorage.setItem(
              STORAGE_NAME,
              JSON.stringify({ email: v.email }),
            ),
        });

      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    });
  }

  onSubmit(form: NgForm) {
    if (form.form.valid) {
      const email = form.form.value.email;
      const password = form.form.value.password;
      console.log(email, password);
    }
    form.form.reset();
  }
}
