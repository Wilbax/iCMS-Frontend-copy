import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { ApiResponse, CallSettingsDetails } from '../types';

@Injectable({
  providedIn: 'root',
})
export class CallSettingsService {
  constructor(private http: HttpClient) {}

  API_ROOT = 'http://ec2-52-66-17-237.ap-south-1.compute.amazonaws.com:8000';

  public getNotificationSettings(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.API_ROOT}/notification-settings`);
  }
  public updateNotificationSettings(settings: CallSettingsDetails): Promise<ApiResponse> {
    console.log(settings)
    return firstValueFrom(this.http.post<ApiResponse>(this.API_ROOT + '/notification-settings', settings));
  }
}
