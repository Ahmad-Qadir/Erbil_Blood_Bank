import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonarListComponent } from './donar-list.component';

describe('DonarListComponent', () => {
  let component: DonarListComponent;
  let fixture: ComponentFixture<DonarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
