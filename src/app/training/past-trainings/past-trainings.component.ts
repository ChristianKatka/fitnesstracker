import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {

  // Which columns are displayd. *matHeaderRowDef="displayedColumns"
  displayedColumns: string[] = ['name', 'duration', 'calories', 'date', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  // Used to sort table data
  @ViewChild(MatSort) sort: MatSort;
  // how many rows of data per page is displayd
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.dataSource.data = this.trainingService.getCompletedOrCanceledExercises();
  }

  // This function runs after page is loaded
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /** User filter data on the table example: write crunches and table will only show crunches
   * 
   * @param filterValue user input
   */
  doFilter(filterValue: string) {
    // trim removes all whitespace
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}

