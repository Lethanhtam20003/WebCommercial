// oauth2-redirect.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-oauth2-redirect',
  template: `<p>Đang xử lý đăng nhập...</p>`
})
export class Oauth2RedirectComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1000); // giả delay 1 chút cho đẹp
  }
}
