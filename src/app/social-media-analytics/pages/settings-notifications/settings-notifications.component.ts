import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AlertType } from '../../models/settings';
import { SettingsApiService } from '../../services/settings-api.service';

@Component({
  selector: 'settings-notifications',
  templateUrl: './settings-notifications.component.html',
  styleUrls: ['./settings-notifications.component.scss']
})

export class SettingsNotificationsComponent implements OnInit {

  socialMediaPlatforms: any[] | undefined;
  selectedPlatform: string | undefined;
  values: string[] | undefined;
  rangeValues: number[] = [20, 80];
  alertTypes: AlertType[] = [
    { name: 'Email Notification' },
    { name: 'App Notification' }
  ];

  notificationsSettingsFormSentiment: FormGroup;
  notificationsSettingsFormKeywordAlert: FormGroup;
  notificationsSettingsFormChannelConfig: FormGroup;
  selectedAlertType: AlertType | undefined;

  constructor(
    private settingsApiService: SettingsApiService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) { 
    this.notificationsSettingsFormSentiment = this.fb.group({
      platform: ['', Validators.required],
      bellowScore: [{ value: 0, disabled: true }, [Validators.min(-10), Validators.max(10)]],
      aboveScore: [{ value: 0, disabled: true }, [Validators.min(-10), Validators.max(10)]],
      aboveNotify: [false],
      bellowNotify: [false],
      alertType: ['', Validators.required]
    });

    this.notificationsSettingsFormKeywordAlert = this.fb.group({
      platform: ['', Validators.required],
      keywords: [[]],
      alertType: ['', Validators.required]
    });

    this.notificationsSettingsFormChannelConfig = this.fb.group({
      dashboardNotifications: [false],
      emailNotifications: [false],
      notificationEmails: [[]]
    });
  }

  ngOnInit() {
    this.socialMediaPlatforms = [
      { name: 'Instagram' },
      { name: 'Facebook' },
      { name: 'Twitter' }
    ];

    this.notificationsSettingsFormSentiment.get('aboveNotify')?.valueChanges.subscribe(checked => {
      if (checked) {
        this.notificationsSettingsFormSentiment.get('aboveScore')?.enable();
      } else {
        this.notificationsSettingsFormSentiment.get('aboveScore')?.disable();
      }
    });

    this.notificationsSettingsFormSentiment.get('bellowNotify')?.valueChanges.subscribe(checked => {
      if (checked) {
        this.notificationsSettingsFormSentiment.get('bellowScore')?.enable();
      } else {
        this.notificationsSettingsFormSentiment.get('bellowScore')?.disable();
      }
    });
  }

  onSubmitsentimentshigtcongif(): void {
    console.log("onSubmitsentimentshigtcongif");
    console.log(this.notificationsSettingsFormSentiment.value);
    if (this.notificationsSettingsFormSentiment.valid) {
      const formData = this.notificationsSettingsFormSentiment.value;
      this.settingsApiService.setSentimentShift(formData).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sentiment shift settings saved successfully!' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save sentiment shift settings.' });
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill out the form correctly.' });
    }
  }

  onSubmitKeywordConfig(): void {
    // Implement keyword alert configuration submission logic here
  }

  onSubmitChannelConfig(): void {
    // Implement channel configuration submission logic here
  }
}
