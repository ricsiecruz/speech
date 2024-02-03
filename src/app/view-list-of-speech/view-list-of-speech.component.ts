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
  selectedData: any;
  keywords: any;
  keywordsList = [
    {keywords: ''}
  ]

  constructor(private speechService: SpeechService) {}

  ngOnInit() {
    this.speechService.getSpeechList()
      .subscribe(res => {
        this.listOfSpeech = res.speeches;
        if (this.listOfSpeech.length > 0) {
          this.selectTitle(this.listOfSpeech[0]);
        }
      })
  }
  selectTitle(data: any): void {
    this.selectedData = data;
    this.selectedData.keywords.map((text: any) => {
      this.keywords = text.text;
      this.keywordsList.push({keywords: this.keywords})
    })
  }
}
