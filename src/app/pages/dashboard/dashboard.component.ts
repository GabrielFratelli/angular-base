import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { ModalComponent } from '../../modal/modal.component';
import { InputComponent } from '../../input/input.component';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonComponent, ModalComponent, InputComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  response$!: Observable<UserResponse[]>;
  isModalVisible: boolean = false;
  isModalVisibleEdition: boolean = false;
  selectedUserEdit!: UserResponse;

  // FormGroups
  addUserForm!: FormGroup;
  editUserForm!: FormGroup;
  @Output("submit") onSubmit = new EventEmitter()

  constructor(private userData: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getUserData();
    this.initForms(); // Inicializa os formulários
  }

  initForms() {
    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      date: ['', Validators.required],
      value: ['', Validators.required]
    });

    this.editUserForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      date: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  openModalAdded() {
    this.isModalVisible = true;
    this.addUserForm.reset();
  }

  openModalEdition(user: UserResponse) {
    this.selectedUserEdit = { ...user };
    this.isModalVisibleEdition = true;
    this.editUserForm.patchValue(user); // Preenche o formulário de edição
  }

  getUserData(): void {
    this.response$ = this.userData.getUser();
  }

  updateUserData(): void {

  }
}
