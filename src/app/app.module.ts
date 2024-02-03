import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewListOfSpeechComponent } from './view-list-of-speech/view-list-of-speech.component';
import { AddSpeechComponent } from './add-speech/add-speech.component';
import { SearchSpeechComponent } from './search-speech/search-speech.component';
import { SpeechService } from './speech.service';

@NgModule({
  declarations: [
    AppComponent,
    ViewListOfSpeechComponent,
    AddSpeechComponent,
    SearchSpeechComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [SpeechService],
  bootstrap: [AppComponent]
})
export class AppModule { }
