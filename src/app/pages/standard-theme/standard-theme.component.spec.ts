import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardThemeComponent } from './standard-theme.component';

describe('StandardThemeComponent', () => {
  let component: StandardThemeComponent;
  let fixture: ComponentFixture<StandardThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
