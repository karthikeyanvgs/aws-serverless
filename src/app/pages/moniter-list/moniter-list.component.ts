import { Component, OnInit } from '@angular/core';
import { MoniterService } from '../../services/moniter.service';
@Component({
  selector: 'app-moniter-list',
  templateUrl: './moniter-list.component.html',
  styleUrls: ['./moniter-list.component.css']
})
export class MoniterListComponent implements OnInit {
  moniterLists: any = [];
  constructor(private moniterService: MoniterService) { }

  ngOnInit() {
    this.moniterService.getMoniterList().subscribe(moniterLists =>{
      this.moniterLists = moniterLists;
    })
  }

}
