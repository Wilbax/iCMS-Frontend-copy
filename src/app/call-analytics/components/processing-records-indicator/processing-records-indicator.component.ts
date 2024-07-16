import {Component, inject, OnInit} from '@angular/core';
import {CallRecordingService} from "../../services/call-recording.service";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../../auth/services/authentication.service";

@Component({
  selector: 'app-processing-records-indicator',
  templateUrl: './processing-records-indicator.component.html',
  styleUrls: ['./processing-records-indicator.component.scss']
})
export class ProcessingRecordsIndicatorComponent implements OnInit {
  pendingCallData: any = [];
  isLoading: boolean = true;
  data: number = 0;
  private sseSubscription: Subscription | undefined;
  private callsSubscription: Subscription | undefined;

  constructor(
    private callRecordingService: CallRecordingService) {
  }
  ngOnInit() {
    this.reloadDataSource();
    this.sseSubscription = this.callRecordingService.getServerSentEvent()
      .subscribe(
        data => {
          this.data = data;
          console.log("test", this.data);
          if(this.pendingCallData.length > this.data){
            location.reload();
          }
        },
        err => console.error('Error receiving SSE:', err)
      );

  }
  reloadDataSource(): void {
    try {
      this.isLoading = true;
      this.callRecordingService.getPendingCallsList().subscribe((data) => {
        // Map the fetched data to match the structure of callRecordings
        if (data.status) {
          if (data.data.length > 0) {
            this.pendingCallData = data.data
            console.log('Pending callRecordings:', data.data);
          }
        }
        this.isLoading = false;
      }, (error) => {
        console.error('Error fetching call recordings', error);
      });
    } catch (error) {
      console.error('Error fetching recordings', error);
    }
  }
}
