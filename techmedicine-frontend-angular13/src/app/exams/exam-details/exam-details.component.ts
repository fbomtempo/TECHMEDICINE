import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Exam } from '../model/exam';

@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.css']
})
export class ExamDetailsComponent implements OnInit {
  exam: Exam;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.exam = this.route.snapshot.data['exam'];
  }
}
