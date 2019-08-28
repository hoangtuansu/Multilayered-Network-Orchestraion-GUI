import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopoManagerComponent } from './topo-manager.component';

describe('TopoManagerComponent', () => {
  let component: TopoManagerComponent;
  let fixture: ComponentFixture<TopoManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopoManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopoManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
