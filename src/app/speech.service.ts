import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  private dataUrl = 'assets/speech.json';

  constructor(private http: HttpClient) {}

  getSpeechList(): Observable<any> {
    console.log('data', this.http.get<any>(this.dataUrl))
    return this.http.get<any>(this.dataUrl)
  }
}
