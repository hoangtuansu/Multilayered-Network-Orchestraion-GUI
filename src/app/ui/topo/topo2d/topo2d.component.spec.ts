import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Topo2dComponent } from './topo2d.component';

describe('Topo2dComponent', () => {
  let component: Topo2dComponent;
  let fixture: ComponentFixture<Topo2dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Topo2dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Topo2dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
