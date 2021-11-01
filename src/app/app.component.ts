import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

import { AppService } from './app.service';

class SummaryModel {
  country: string;
  countryCode: string;
  date: string;
  id: string;
  newConfirmed: number;
  newDeaths: number;
  newRecovered: number;
  premium: any;
  slug: string;
  totalConfirmed: number;
  totalDeaths: number;
  totalRecovered: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'zim-demo';

  dataSource: MatTableDataSource<SummaryModel>;

  summary: SummaryModel[] = [];
  displayedColumns: string[] = [
    'country',
    'totalConfirmed',
    'totalDeaths',
    'totalRecovered',
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private service: AppService) {
    this.service.getSummary().subscribe((res) => {
      this.summary = res.Countries;
      this.dataSource = new MatTableDataSource(this.summary);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    // this.dataSource = new MatTableDataSource(this.summary);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
}
