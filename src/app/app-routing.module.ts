import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewListOfSpeechComponent } from './view-list-of-speech/view-list-of-speech.component';
import { AddSpeechComponent } from './add-speech/add-speech.component';
import { SearchSpeechComponent } from './search-speech/search-speech.component';

const routes: Routes = [
  { path: 'view', component: ViewListOfSpeechComponent },
  { path: 'add', component: AddSpeechComponent },
  { path: 'search', component: SearchSpeechComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
