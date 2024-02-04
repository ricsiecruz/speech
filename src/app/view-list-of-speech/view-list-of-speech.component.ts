import { Component, ElementRef, ViewChild } from '@angular/core';
import { SpeechService } from '../speech.service';
import { map, tap } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-list-of-speech',
  templateUrl: './view-list-of-speech.component.html',
  styleUrls: ['./view-list-of-speech.component.css']
})
export class ViewListOfSpeechComponent {
  
  @ViewChild('modalContent') modalContent?: ElementRef<any>;

  listOfSpeech: any[] = [];
  selectedData: any;
  keywords: any;
  keywordsList = [
    {keywords: ''}
  ]
  title: string = '';

  constructor(
    private speechService: SpeechService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit() {
    this.getSpeechList()
  }

  getSpeechList() {
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
  
  openDelete(): void {
    if (this.selectedData) {
      const modalRef = this.modalService.open(this.modalContent, { size: 'lg' });
      this.title = this.selectedData.title;

  }
  }

  delete() {
    if (this.selectedData) {
      const indexToDelete = this.listOfSpeech.findIndex(item => item.id === this.selectedData.id);
  
      if (indexToDelete !== -1) {
        this.listOfSpeech.splice(indexToDelete, 1);
        this.modalService.dismissAll(); // Close the modal
  
        // Automatically select the next item if available
        const nextIndex = indexToDelete < this.listOfSpeech.length ? indexToDelete : indexToDelete - 1;
        this.selectTitle(this.listOfSpeech[nextIndex]);
      }
    }
  }
  
  
}

