import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSpeechComponent } from './add-speech.component';

describe('AddSpeechComponent', () => {
  let component: AddSpeechComponent;
  let fixture: ComponentFixture<AddSpeechComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSpeechComponent]
    });
    fixture = TestBed.createComponent(AddSpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
