import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink],
  selector: 'app-custom403',
  templateUrl: './custom403.component.html',
  styleUrls: ['./custom403.component.scss']
})
export class Custom403Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
