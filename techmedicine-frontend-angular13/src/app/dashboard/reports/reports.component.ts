import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';
import { map } from 'rxjs';
import { DropdownService } from 'src/app/shared/services/dropdown.service';

import { CheckUp } from '../check-ups/models/check-up';
import { CheckUpService } from '../check-ups/services/check-up.service';
import { Medic } from '../medics/models/medic';
import { ReportService } from './services/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  totalPatients: number;
  totalAppointments: number;
  totalCheckUps: number;
  lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ]
  };
  lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      x: {},
      'y-axis-0': {
        position: 'right'
      },
      'y-axis-1': {
        position: 'left',
        grid: {
          color: 'rgba(255,0,0,0.3)'
        },
        ticks: {
          color: 'red'
        }
      }
    },
    plugins: {
      legend: { display: true }
    }
  };
  lineChartType: ChartType = 'line';
  loadGraph: boolean = false;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  medics: Medic[];
  medicsLoading: boolean = true;
  compareFnMedic(c1: Medic, c2: Medic): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  filterMedic: Medic;

  constructor(
    private reportService: ReportService,
    private dropdownService: DropdownService,
    private checkUpService: CheckUpService,
    private router: Router
  ) {
    Chart.register(Annotation);
  }

  ngOnInit(): void {
    this.getTotals();
    this.fetchData();
    this.generateGraph();
  }

  private getTotals(): void {
    this.reportService.getTotalPatients().subscribe((total: number) => {
      this.totalPatients = total;
    });
    this.reportService.getTotalAppointments().subscribe((total: number) => {
      this.totalAppointments = total;
    });
    this.reportService.getTotalCheckUps().subscribe((total: number) => {
      this.totalCheckUps = total;
    });
  }

  private fetchData(): void {
    this.dropdownService.getMedics().subscribe({
      next: (medics: Medic[]) => {
        this.medics = medics.map((medic: any) => {
          medic.searchLabel = `${medic.name} ${medic.surname}`;
          return medic;
        });
      },
      complete: () => {
        this.medicsLoading = false;
      }
    });
  }

  private generateGraph(): void {
    this.checkUpService
      .findAllByCheckUpSituationFinished()
      .pipe(
        map((checkUps: CheckUp[]) => {
          let totalByMonth: number[] = new Array(12).fill(0);
          let totalByMonthFilter: number[] = new Array(12).fill(0);
          checkUps.forEach((checkUp: CheckUp) => {
            let month: number = new Date(checkUp.checkUpHeader.date).getMonth();
            totalByMonth[month]++;
          });
          if (this.filterMedic) {
            checkUps = checkUps.filter((checkUp: CheckUp) => {
              return checkUp.checkUpHeader.medic.id === this.filterMedic.id;
            });
            checkUps.forEach((checkUp: CheckUp) => {
              let month: number = new Date(
                checkUp.checkUpHeader.date
              ).getMonth();
              totalByMonthFilter[month]++;
            });
          }
          return {
            totalByMonth: totalByMonth,
            totalByMonthFilter: totalByMonthFilter
          };
        })
      )
      .subscribe({
        next: (totals: any) => {
          this.lineChartData.datasets = [
            {
              data: totals.totalByMonthFilter,
              label: `${this.filterMedic?.name} ${this.filterMedic?.surname}`,
              yAxisID: 'y-axis-1',
              backgroundColor: 'rgba(255,0,0,0.3)',
              borderColor: 'red',
              pointBackgroundColor: 'rgba(148,159,177,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(148,159,177,0.8)',
              fill: 'origin'
            },
            {
              data: totals.totalByMonth,
              label: 'Total',
              backgroundColor: 'rgba(148,159,177,0.2)',
              borderColor: 'rgba(148,159,177,1)',
              pointBackgroundColor: 'rgba(148,159,177,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(148,159,177,0.8)',
              fill: 'origin'
            }
          ];
          this.loadGraph = true;
        }
      });
  }

  setFilterMedic(medic: Medic) {
    this.filterMedic = medic;
    this.loadGraph = false;
    this.generateGraph();
  }

  onHome(): void {
    this.router.navigate(['/home']);
  }
}
