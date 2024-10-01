import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent implements OnInit {
  ngOnInit() {
    
  }
  @Input() message: string = ''; // Use @Input to receive the message
  displayStyle: string = 'none'; // Initial style to hide the modal

  open(msg: string) {
    this.message = msg;
    this.displayStyle = 'block'; // Show the modal
    setTimeout(() => {
      this.close(); // Automatically close after a few seconds
    }, 2000);
  }

  close() {
    this.displayStyle = 'none'; // Hide the modal
    this.message = ''; // Clear the message
  }
}
