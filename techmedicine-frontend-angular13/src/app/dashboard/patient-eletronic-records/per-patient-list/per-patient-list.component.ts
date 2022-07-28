import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { catchError, Observable, of, Subject, Subscription } from 'rxjs';
import { Patient } from 'src/app/dashboard/patients/models/patient';
import { PatientService } from 'src/app/dashboard/patients/services/patient.service';

@Component({
  selector: 'app-per-patient-list',
  templateUrl: './per-patient-list.component.html',
  styleUrls: ['./per-patient-list.component.css']
})
export class PerPatientListComponent implements OnInit {
  patients$: Observable<Patient[]>;
  error: Subject<boolean> = new Subject();
  subscription: Subscription;
  page: number;
  currentPage: number;
  itemsPerPage: number;
  paginationSize: number;
  filter: string;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setPaginationSize();
    this.subscription = this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.page = queryParams['pagina'];
        setTimeout(() => (this.currentPage = parseInt(this.page.toString())));
      }
    );
    this.onRefresh();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setPaginationSize(): void {
    if (window.innerWidth < 576) {
      this.paginationSize = 3;
    } else if (window.innerWidth < 992) {
      this.paginationSize = 7;
    } else {
      this.paginationSize = 10;
    }
    this.itemsPerPage = 5;
  }

  onRefresh(): void {
    this.patients$ = this.patientService.findAllFormatted().pipe(
      catchError(() => {
        this.error.next(true);
        return of();
      })
    );
  }

  showData(patients: Patient[]): Patient[] {
    if (this.filter || this.filter != '') {
      return patients.filter((patient: Patient) => {
        if (
          `${patient.name} ${patient.surname}`
            .toLowerCase()
            .indexOf(this.filter.toLowerCase()) >= 0
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
    return patients;
  }

  onFilterInput(): void {
    if (this.currentPage !== 1) {
      this.toFirstPage();
    }
    if (this.filter == '') {
      this.toFirstPage();
    }
  }

  clearFilter(): void {
    this.filter = '';
    this.toFirstPage();
  }

  toFirstPage(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pagina: 1
      },
      queryParamsHandling: 'merge'
    });
  }

  pageChanged(event: PageChangedEvent): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        pagina: event.page
      },
      queryParamsHandling: 'merge'
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

  onHome(): void {
    this.router.navigate(['/home']);
  }
}
