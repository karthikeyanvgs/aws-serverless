import { Component, OnInit } from '@angular/core';
import { DashoardService } from '../../services/dashboard.service';
import { Message } from '../../../../node_modules/primeng/components/common/api';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  dashboards: any = [];
  selectedItems = [];
  totalRecords: number;
  cars: any = [];
  selectedCars: string[] = [];
  listOne: Array<string> = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealty drink!', 'Water'];
  simpleDrop: any = null;
  cols: any = [];
  columnOptions: any = [];
  sortedData: any = [];
  showDatatable: boolean = false;
  constructor(private dashoardService: DashoardService) {
    this.cars = [];
  }
  ngOnInit() {
    this.cols = [
      { field: 'org_eid', header: 'ORG_EID' },
      { field: 'flow_id', header: 'FLOW_ID' },
      { field: 'flow_status', header: 'FLOW_STATUS' },
      { field: 'flow_type', header: 'FLOW_TYPE' },
      { field: 's3_bucket', header: 'S3_BUKET' },
      { field: 's3_key', header: 'S3_KEY' },
      { field: 'start_time', header: 'START_TIME' },
      { field: 'end_time', header: 'END_TIME' }
    ];
    this.columnOptions = [];
    for (let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
    }
  }
  loadDashboardGridData(event: any) {
    setTimeout(() => {
      if (!event.sortField) {
        event.sortField = 'start_time';
        event.sortOrder = -1;
      }
      console.log('event', event);
      let datatableParams = {
        "sort": {
          "fieldName": (event.sortField) ? event.sortField : 'org_eid',
          "order": (event.sortOrder == 1) ? 'asc' : 'desc'
        },
        "pagination": {
          "size": event.rows,
          "from": event.first
        }
      }
      this.getDashboardData(datatableParams);
    }, 250);
  }

  getDashboardData(datatableParams: any = {}) {
    this.dashoardService.getDashboard(datatableParams).subscribe(dashboard => {
      this.totalRecords = dashboard.totalRecords;
      this.dashboards = dashboard.items;
      this.showDatatable = true;
    });
  }
}
