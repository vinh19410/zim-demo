import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';

import { AppService } from './app.service';
import { DialogDetailComponent } from './dialog/dialog-detail.component';

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
export class AppComponent {
  title = 'zim-demo';
  isShow: boolean = false;
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

  constructor(private service: AppService, public dialog: MatDialog) {
    this.isShow = true;
    this.service.getSummary().subscribe(
      (res) => {
        this.summary = res.Countries;
        this.dataSource = new MatTableDataSource(this.summary);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => console.log(err),
      () => {
        this.isShow = false;
      }
    );
  }

  clickedRows(row) {
    this.isShow = true;

    let resCountry = this.service.getDetailCountry(row.Slug);
    let resCovis = this.service.getDetailCovid(row.Slug);

    forkJoin([resCountry, resCovis]).subscribe(
      (res) => {
        console.log(res);
        this.dialog.open(DialogDetailComponent, {
          minWidth: '60vw',
          data: {
            country: res[0][0],
            covid: res[1],
          },
        });
      },
      (err) => console.log(err),
      () => {
        this.isShow = false;
      }
    );
  }
}
