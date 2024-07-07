import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'line-chart-instagram',
  templateUrl: './line-chart-instagram.component.html',
  styleUrl: './line-chart-instagram.component.scss'
})

export class LineChartInstagramComponent implements OnChanges {
  @Input() title!: string;
  @Input("data") chartData: any;

  data: any;
  options: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData']) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      const convertDateFormat = (dateString: string): string => {
        const date = new Date(dateString);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${month}-${day}`;
      };

      const labels = Object.keys(this.chartData['1']).map(dateString => convertDateFormat(dateString));

      this.data = {
        labels: labels,
        datasets: [
          {
            label: 'Reacts',
            data: Object.values(this.chartData['1']),
            borderColor: 'rgb(255, 220, 128)',
          },
          {
            label: 'Comments',
            data: Object.values(this.chartData['2']),
            borderColor: 'rgb(193, 53, 132)',
          },
        ]
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 1.1,
        plugins: {
          legend: {
            labels: {
              color: textColor
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          },
          y: {
            ticks: {
              color: textColorSecondary
            },
            grid: {
              color: surfaceBorder
            }
          }
        }
      };

    }
  }

}