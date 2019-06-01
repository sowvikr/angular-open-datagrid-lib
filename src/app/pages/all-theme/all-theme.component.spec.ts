import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllThemeComponent } from './all-theme.component';

describe('AllThemeComponent', () => {
  let component: AllThemeComponent;
  let fixture: ComponentFixture<AllThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
