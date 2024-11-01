import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { ModalComponent } from '../../modal/modal.component';
import { InputComponent } from '../../input/input.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonComponent, ModalComponent, InputComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isModalVisible: boolean = false;

  toggleModal() {
    this.isModalVisible = !this.isModalVisible;
  }
}
