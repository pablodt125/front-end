import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcontenidoComponent } from './list-contenido.component';

describe('ListPlanComponent', () => {
  let component: ListcontenidoComponent;
  let fixture: ComponentFixture<ListcontenidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcontenidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcontenidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
