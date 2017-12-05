import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoniterDetailComponent } from './moniter-detail.component';

describe('MoniterDetailComponent', () => {
  let component: MoniterDetailComponent;
  let fixture: ComponentFixture<MoniterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoniterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoniterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
