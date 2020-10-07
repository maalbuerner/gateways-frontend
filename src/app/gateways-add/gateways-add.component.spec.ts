import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewaysAddComponent } from './gateways-add.component';

describe('GatewaysAddComponent', () => {
  let component: GatewaysAddComponent;
  let fixture: ComponentFixture<GatewaysAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatewaysAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewaysAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
