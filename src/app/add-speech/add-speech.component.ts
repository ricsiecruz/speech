import { Component } from '@angular/core';
import { Speech } from '../speech';

@Component({
  selector: 'app-add-speech',
  templateUrl: './add-speech.component.html',
  styleUrls: ['./add-speech.component.css']
})
export class AddSpeechComponent {
  
  currentSpeech: Speech = { id: 0, title: '', speech: '', author: '', date: new Date(), keywords: [] }; 
  listOfSpeech: Speech[] = [];

  add(): void {
    // Check if currentSpeech is not empty
    if (this.currentSpeech.speech.trim() !== '') {
      // Ensure keywords is a string and then convert it into an array of Keyword objects
      if (typeof this.currentSpeech.keywords === 'string' || this.currentSpeech.keywords instanceof String) {
        this.currentSpeech.keywords = (this.currentSpeech.keywords as unknown as string)
          .split(',')
          .map(keyword => ({ text: keyword.trim() }));
      }

      // Generate a unique ID based on timestamp
      this.currentSpeech.id = Date.now();

      // Retrieve existing speeches from local storage
      const existingSpeechData = localStorage.getItem('speechData');
    
      // If there are existing speeches, parse and add them to the listOfSpeech
      if (existingSpeechData) {
        this.listOfSpeech = JSON.parse(existingSpeechData);
      }

      // Add the currentSpeech to the listOfSpeech
      this.listOfSpeech.push(this.currentSpeech);

      // Save the updated listOfSpeech to local storage
      localStorage.setItem('speechData', JSON.stringify(this.listOfSpeech));

      // Clear the input fields
      this.currentSpeech = { id: 0, title: '', speech: '', author: '', date: new Date(), keywords: [] };
    } else {
      alert('Please enter a speech before saving.');
    }
  }
  
}
