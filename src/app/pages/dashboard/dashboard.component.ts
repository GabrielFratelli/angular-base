import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { ModalComponent } from '../../modal/modal.component';
import { InputComponent } from '../../input/input.component';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonComponent, ModalComponent, InputComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  response$!: Observable<UserResponse[]>;
  isModalVisible: boolean = false;
  isModalVisibleEdition: boolean = false;

  constructor(private userData: UserService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }

  toggleModalEdition() {
    this.isModalVisibleEdition = !this.isModalVisibleEdition;
  }

  getUserData(): void {
    this.response$ = this.userData.getUser()
  }
}
