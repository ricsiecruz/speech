import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Speech } from '../speech';

@Component({
  selector: 'app-search-speech',
  templateUrl: './search-speech.component.html',
  styleUrls: ['./search-speech.component.css']
})
export class SearchSpeechComponent {
  listOfSpeech: Speech[] = [];
  filteredList: Speech[] = [];
  selectedData: Speech | null = null;
  keywordsList: { keywords: string }[] = [];
  title: string = '';
  authorQuery: string = '';
  titleQuery: string = '';
  keywordsQuery: string = '';
  isMobile = false;

  constructor() {}

  ngOnInit() {
    this.isMobile = this.getIsMobile();
    window.onresize = () => {
      this.isMobile = this.getIsMobile();
    };
    // Retrieve existing speeches from local storage
    const existingSpeechData = localStorage.getItem('speechData');

    // If there are existing speeches, parse and add them to the listOfSpeech
    if (existingSpeechData) {
      this.listOfSpeech = JSON.parse(existingSpeechData);
    }

    if (this.listOfSpeech.length > 0) {
      this.selectTitle(this.listOfSpeech[0]);
    }

    // Initialize the filteredList with all speeches
    this.filteredList = [...this.listOfSpeech];
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

  search(): void {
    // Perform case-insensitive search on author, title, and keywords
    this.filteredList = this.listOfSpeech.filter(speech =>
      speech.author.toLowerCase().includes(this.authorQuery.toLowerCase()) &&
      speech.title.toLowerCase().includes(this.titleQuery.toLowerCase()) &&
      speech.keywords.some(keyword => keyword.text.toLowerCase().includes(this.keywordsQuery.toLowerCase()))
    );
  }
  resetFilters(): void {
    // Clear search queries and reset filteredList to the original list
    this.authorQuery = '';
    this.titleQuery = '';
    this.keywordsQuery = '';
    this.filteredList = [...this.listOfSpeech];
  }

  selectTitle(data: Speech): void {
    this.selectedData = data;
    this.keywordsList = data.keywords.map(keyword => ({ keywords: keyword.text }));
  }

}
