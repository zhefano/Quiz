import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayQuizPageComponent } from './play-quiz-page.component';

describe('PlayQuizPageComponent', () => {
  let component: PlayQuizPageComponent;
  let fixture: ComponentFixture<PlayQuizPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayQuizPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayQuizPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
