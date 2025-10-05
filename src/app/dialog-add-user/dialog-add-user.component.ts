import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../model/user.class';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-add-user',
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatDatepickerModule,
    MatProgressBarModule
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;

  // Observable für alle User
  users$!: Observable<User[]>;

  constructor(private firestore: Firestore) {
    const usersRef = collection(this.firestore, 'users');
    this.users$ = collectionData(usersRef, { idField: 'id' }) as Observable<User[]>;
  }

  async saveUser() {
    const usersCollection = collection(this.firestore, 'users');

    // 3. Geburtstdatum speichern (Timestamp)
    this.user.birthDate = this.birthDate.getTime();

    // 4. Speichern in Firestore
    await addDoc(usersCollection, { ...this.user });

    console.log('User gespeichert:', this.user);
  }
}
