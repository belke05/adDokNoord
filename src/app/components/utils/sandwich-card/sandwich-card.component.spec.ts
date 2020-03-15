import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SandwichCardComponent } from './sandwich-card.component';

describe('SandwichCardComponent', () => {
  let component: SandwichCardComponent;
  let fixture: ComponentFixture<SandwichCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SandwichCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SandwichCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
