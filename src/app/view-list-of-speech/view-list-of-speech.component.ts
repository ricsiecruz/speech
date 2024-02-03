import { Component } from '@angular/core';
import { SpeechService } from '../speech.service';
import { map, tap } from 'rxjs';

@Component({
  selector: 'app-view-list-of-speech',
  templateUrl: './view-list-of-speech.component.html',
  styleUrls: ['./view-list-of-speech.component.css']
})
export class ViewListOfSpeechComponent {

  listOfSpeech: any[] = [];
  selectedTitle: string | null = null;
  selectedData: any;

  constructor(private speechService: SpeechService) {}

  ngOnInit() {
    this.speechService.getSpeechList()
      .subscribe(res => {
        console.log('res', res)
        this.listOfSpeech = res.speeches;
        console.log('list', this.listOfSpeech)
      })
  }
  selectTitle(data: any): void {
    console.log('aaa', this.selectedData, this.selectedData?.title)
    console.log('data', data)
    this.selectedData = data;
  }
}
