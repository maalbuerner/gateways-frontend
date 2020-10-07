import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewaysItemComponent } from './gateways-item.component';

describe('GatewaysItemComponent', () => {
  let component: GatewaysItemComponent;
  let fixture: ComponentFixture<GatewaysItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatewaysItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewaysItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
