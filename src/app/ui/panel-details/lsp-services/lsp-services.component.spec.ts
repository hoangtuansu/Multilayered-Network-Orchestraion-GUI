import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LspServicesComponent } from './lsp-services.component';

describe('LspServicesComponent', () => {
  let component: LspServicesComponent;
  let fixture: ComponentFixture<LspServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LspServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LspServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
