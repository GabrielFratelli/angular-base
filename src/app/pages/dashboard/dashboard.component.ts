import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { ModalComponent } from '../../modal/modal.component';
import { InputComponent } from '../../input/input.component';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonComponent, ModalComponent, InputComponent, CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  response$!: Observable<UserResponse[]>;
  isModalVisible: boolean = false;
  isModalVisibleEdition: boolean = false;
  selectedUserEdit!: UserResponse;

  constructor(private userData: UserService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  openModalAdded() {
    this.isModalVisible = true;
  }

  openModalEdition(user: UserResponse) {
    this.selectedUserEdit = { ...user };
    this.isModalVisibleEdition = true;
  }

  getUserData(): void {
    this.response$ = this.userData.getUser()
  }

  updateUserData(): void {
    this.userData.updateUser(this.selectedUserEdit).subscribe(() => {
      this.isModalVisibleEdition = false;
      this.getUserData();
    });
  }
}
