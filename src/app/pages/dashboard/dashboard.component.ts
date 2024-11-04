import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { ModalComponent } from '../../modal/modal.component';
import { InputComponent } from '../../input/input.component';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
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

  addUserForm!: FormGroup;
  editUserForm!: FormGroup;
  @Output("submit") onSubmit = new EventEmitter()

  constructor(private userData: UserService, private fb: FormBuilder, private toastService: ToastrService) { }

  ngOnInit(): void {
    this.getUserData();
    this.initForms();
  }

  initForms() {
    this.editUserForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      date: ['', Validators.required],
      value: ['', Validators.required]
    });

    this.addUserForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      date: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  closeModal() {
    this.isModalVisible || this.isModalVisibleEdition;
  }

  openModalAdded() {
    this.isModalVisible = true;
    this.addUserForm.reset();
  }

  openModalEdition(user: UserResponse) {
    this.selectedUserEdit = { ...user };
    this.isModalVisibleEdition = true;
    this.editUserForm.patchValue(user);
  }

  getUserData(): void {
    this.response$ = this.userData.getUser();
  }

  createUser(): void {
    if (this.addUserForm.valid) {
      this.userData.createUser(this.addUserForm.value).subscribe({
        next: () => {
          this.toastService.success("Pagamento criado com sucesso!")
          this.isModalVisible = false;
          this.getUserData();
        },

      });
    }
    else {
      this.toastService.error("Ops! não foi possível criar seu novo registro de pagamento.")
    }
  }

  updateUserData(): void {
    const updatedUser: UserResponse = {
      ...this.selectedUserEdit,
      ...this.editUserForm.value
    };

    this.userData.updateUser(updatedUser).subscribe({
      next: () => {
        this.isModalVisibleEdition = false;
        this.getUserData();
      },
      error: (err) => {
        console.error("Erro ao atualizar o usuário:", err);
      }
    });
  }

  deleteUser(user: UserResponse): void {
    console.log('ID do usuário a ser excluído:', user.id);
    this.userData.deleteUser(user.id).subscribe({
      next: () => {
        this.getUserData();
      },
      error: (err) => {
        console.error("Erro ao deletar o usuário:", err);
      }
    });
  }

}
