import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceProductModalComponent } from './invoice-product-modal.component';

describe('InvoiceProductModalComponent', () => {
  let component: InvoiceProductModalComponent;
  let fixture: ComponentFixture<InvoiceProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceProductModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
