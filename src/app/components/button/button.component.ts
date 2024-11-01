import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  imports: [CommonModule]
})
export class ButtonComponent {
  @Input() name: string = '';
  @Input() className?: string;
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  get inspectClassName(): string {
    return `Button ${this.className || ''}`.trim();
  }

  onClick(): void {
    this.clickEvent.emit(); // Emite o evento de clique
  }
}
