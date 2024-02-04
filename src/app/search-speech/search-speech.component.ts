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
  searchQuery: string = ''; // Add this line to declare searchQuery property

  constructor() {}

  ngOnInit() {
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

  search(query: string): void {
    console.log('Search query:', query);
    // Perform case-insensitive search on author
    this.filteredList = this.listOfSpeech.filter(speech =>
      speech.author.toLowerCase().includes(query.toLowerCase())
    );
    console.log('Filtered List:', this.filteredList);
  }
  

  selectTitle(data: Speech): void {
    this.selectedData = data;
    this.keywordsList = data.keywords.map(keyword => ({ keywords: keyword.text }));
  }

}
