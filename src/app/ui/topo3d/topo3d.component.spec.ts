import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Topo3dComponent } from './topo3d.component';

describe('Topo3dComponent', () => {
  let component: Topo3dComponent;
  let fixture: ComponentFixture<Topo3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Topo3dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Topo3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
