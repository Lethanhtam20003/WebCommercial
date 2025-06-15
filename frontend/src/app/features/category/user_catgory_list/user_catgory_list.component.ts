import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [NgFor,RouterModule],
  selector: 'app-user_catgory_list',
  templateUrl: './user_catgory_list.component.html',
  styleUrls: ['./user_catgory_list.component.scss']
})
export class User_catgory_listComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
    defaultImage = 'https://bizweb.dktcdn.net/100/485/982/themes/918620/assets/img_3banner_2.jpg?1749455998723';

  categories = [
    { id: 1, name: 'Bi-a', imageUrl: null, description: null },
    { id: 2, name: 'Bóng chuyền', imageUrl: null, description: null },
    { id: 3, name: 'Pickleball', imageUrl: null, description: null },
    { id: 4, name: 'Chạy bộ', imageUrl: null, description: null },
    { id: 5, name: 'Bóng đá & Futsal', imageUrl: null, description: null },
    { id: 6, name: 'Bóng rổ', imageUrl: null, description: null },
    { id: 7, name: 'Cầu lông', imageUrl: null, description: null },
  ];

}
