import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay">
      <div class="modal-content">
        <h2>{{ title }}</h2>
        <p>{{ message }}</p>
        <div class="button-group">
          <button class="btn-cancel" (click)="onCancel()">Cancelar</button>
          <button class="btn-confirm" (click)="onConfirm()">Aceptar</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      max-width: 700px;
      width: 90%;
      text-align: center;
    }

    h2 {
      margin: 0 0 1rem;
      color: #333;
    }

    p {
      margin: 0 0 1.5rem;
      color: #666;
    }

    .button-group {
      display: flex;
      justify-content: center;
      gap: 1rem;
    }

    button {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-cancel {
      background-color: #e0e0e0;
      color: #333;
    }

    .btn-cancel:hover {
      background-color: #d0d0d0;
    }

    .btn-confirm {
      background-color: #1976d2;
      color: white;
    }

    .btn-confirm:hover {
      background-color: #1565c0;
    }
  `]
})
export class ConfirmationDialogComponent {
  @Input() title: string = 'Confirmar';
  @Input() message: string = '¿Está seguro de continuar?';
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
} 