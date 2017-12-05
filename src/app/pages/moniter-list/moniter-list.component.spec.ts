import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoniterListComponent } from './moniter-list.component';

describe('MoniterListComponent', () => {
  let component: MoniterListComponent;
  let fixture: ComponentFixture<MoniterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoniterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoniterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
