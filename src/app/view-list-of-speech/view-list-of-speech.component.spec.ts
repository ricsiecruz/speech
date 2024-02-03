import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListOfSpeechComponent } from './view-list-of-speech.component';

describe('ViewListOfSpeechComponent', () => {
  let component: ViewListOfSpeechComponent;
  let fixture: ComponentFixture<ViewListOfSpeechComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewListOfSpeechComponent]
    });
    fixture = TestBed.createComponent(ViewListOfSpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
