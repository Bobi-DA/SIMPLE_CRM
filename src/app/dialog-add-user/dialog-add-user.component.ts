import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { User } from '../model/user.class';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true, // ✅ WICHTIG!
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatInputModule,
    MatDatepickerModule,
    MatProgressBarModule
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss'] // ✅ Plural
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  loading = false;

  constructor(private firestore: Firestore) {}

  async saveUser() {
    this.loading = true;

    try {
      const usersCollection = collection(this.firestore, 'users');
      this.user.birthDate = this.birthDate.getTime();
      await addDoc(usersCollection, { ...this.user });
      console.log('✅ User gespeichert:', this.user);
    } catch (error) {
      console.error('❌ Fehler beim Speichern:', error);
    } finally {
      this.loading = false;
    }
  }
}
