import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-payment-cancel',
  templateUrl: './payment-cancel.component.html',
  styleUrls: ['./payment-cancel.component.scss']
})
export class PaymentCancelComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
   goBack() {
    this.router.navigate(['/cart']); // hoặc về trang bạn muốn
  }

}
