import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ["./sidenav.component.scss"]
})
export class SidenavComponent implements OnInit {
  menuItems!: MenuItem[];
  logoutItems!: MenuItem[];

  ngOnInit() {
    this.logoutItems = [
      {
        label: "Logout",
        icon: "pi pi-fw pi-external-link"
      }
    ];

    this.menuItems = [
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-th-large'
      },
      {
        label: 'Email Analytics',
        icon: 'pi pi-fw pi-envelope',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-th-large'
          },
          {
            label: 'Email Filtering',
            icon: 'pi pi-fw pi-filter'
          },
          {
            label: 'Conversation Summaries',
            icon: 'pi pi-fw pi-book'
          },
          {
            label: 'Settings',
            icon: 'pi pi-fw pi-sliders-h'
          }
        ]
      },
      {
        label: 'Call Analytics',
        icon: 'pi pi-fw pi-phone',
        items: [
          {
            label: 'Dashboard',
            routerLink: "call/dashboard",
            icon: 'pi pi-fw pi-th-large'
          },
          {
            label: 'Call Recordings',
            icon: 'pi pi-fw pi-volume-down'
          },
          {
            label: 'Call Filtering',
            icon: 'pi pi-fw pi-filter',
          },
          {
            label: 'Settings',
            icon: 'pi pi-fw pi-sliders-h',
          }
        ]
      },
      {
        label: 'Social Media Analytics',
        icon: 'pi pi-fw pi-comments',
        items: [
          {
            label: 'Dashboard',
            icon: 'pi pi-fw pi-th-large'
          },
          {
            label: 'Campaign Analysis',
            icon: 'pi pi-fw pi-chart-line',
          },
          {
            label: 'Platform Insights',
            icon: 'pi pi-fw pi-desktop',
          },
          {
            label: 'Settings',
            icon: 'pi pi-fw pi-sliders-h',
          }
        ]
      },
      {
        label: 'App Settings',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Users',
            icon: 'pi pi-fw pi-users',
          },
          {
            label: 'Permissions',
            icon: 'pi pi-fw pi-unlock',
          }
        ]
      }
    ];
  }
}