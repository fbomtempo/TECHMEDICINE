import { Location } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.css']
})
export class AppointmentViewComponent implements OnInit, AfterViewInit {
  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.cdRef.detectChanges();
  }

  onBack(): void {
    this.location.back();
    this.route.snapshot.queryParams['pagina'];
  }

  selectListTab(): void {
    this.router.navigate([], {
      queryParams: { pagina: 1 },
      queryParamsHandling: 'merge'
    });
  }

  activeListTab(): boolean {
    return this.route.snapshot.queryParams['pagina'];
  }

  log() {
    console.log('teste');
  }
}
