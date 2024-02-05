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
  @ViewChild('saveContent') saveContent?: ElementRef<any>;

  isMobile = false;
  listOfSpeech: any[] = [];
  selectedData: any;
  keywords: any;
  keywordsList = [
    {keywords: ''}
  ]
  title: string = '';
  updatedSpeech: string = '';

  constructor(
    private speechService: SpeechService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };

    const savedSpeechData = localStorage.getItem('speechData');
  
    if (savedSpeechData) {
      this.listOfSpeech = JSON.parse(savedSpeechData);
    } else {
      this.getSpeechList();
    }
  
    if (this.listOfSpeech.length > 0) {
      this.selectTitle(this.listOfSpeech[0]);
    }
  }
  getIsMobile(): boolean {
    const w = document.documentElement.clientWidth;
    const breakpoint = 992;
    console.log(w);
    if (w < breakpoint) {
      return true;
    } else {
      return false;
    }
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
  
    // Reset keywordsList to an empty array before pushing new keywords
    this.keywordsList = [];
  
    this.selectedData.keywords.map((text: any) => {
      this.keywords = text.text;
      this.keywordsList.push({ keywords: this.keywords });
    });
  }
  toggleSelection(data: any): void {
    if (this.selectedData && this.selectedData.title === data.title) {
      // Clicking the same title again should collapse the right column
      this.selectedData = null;
    } else {
      // Clicking a different title should expand the right column
      this.selectedData = data;
    }
  }
  
  openDelete(): void {
    if (this.selectedData) {
      this.modalService.open(this.modalContent);
      this.title = this.selectedData.title;

  }
  }

  delete() {
    if (this.selectedData) {
      const indexToDelete = this.listOfSpeech.findIndex(item => item.id === this.selectedData.id);
  
      if (indexToDelete !== -1) {
        this.listOfSpeech.splice(indexToDelete, 1);
  
        // Update local storage after deletion
        localStorage.setItem('speechData', JSON.stringify(this.listOfSpeech));
  
        this.modalService.dismissAll(); // Close the modal
  
        // Automatically select the next item if available
        const nextIndex = indexToDelete < this.listOfSpeech.length ? indexToDelete : indexToDelete - 1;
        this.selectTitle(this.listOfSpeech[nextIndex]);
      }
    }
  }
  
  
  save(): void {
    // Update the selectedData with the new speech
    if (this.selectedData) {
      this.selectedData.speech
      // Save the updated data to local storage
      localStorage.setItem('speechData', JSON.stringify(this.listOfSpeech));
      this.modalService.open(this.saveContent);
    }
  }
  
  
  
}

