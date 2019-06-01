import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialThemeComponent } from './material-theme.component';

describe('MaterialThemeComponent', () => {
  let component: MaterialThemeComponent;
  let fixture: ComponentFixture<MaterialThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
