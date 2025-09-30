import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../model/user.class';

@Component({
  selector: 'app-user',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  readonly dialog = inject(MatDialog);
  user = new User();

  constructor() { }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

}
