import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueThemeComponent } from './standard-theme.component';

describe('StandardThemeComponent', () => {
  let component: BlueThemeComponent;
  let fixture: ComponentFixture<BlueThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlueThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlueThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
