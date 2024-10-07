import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessModalComponent } from './success-modal.component';

describe('SuccessModalComponent', () => {
  let component: SuccessModalComponent;
  let fixture: ComponentFixture<SuccessModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 
  it('should initialize with default values', () => {
    expect(component.message).toBe('');
    expect(component.displayStyle).toBe('none');
  });

  it('should open the modal with a message', () => {
    const testMessage = 'Operation successful!';
    component.open(testMessage);

    expect(component.message).toBe(testMessage);
    expect(component.displayStyle).toBe('block');
  });

  it('should close the modal after 2 seconds', (done) => {
    const testMessage = 'Operation successful!';
    component.open(testMessage);
    
    expect(component.displayStyle).toBe('block'); // Modal is open
    expect(component.message).toBe(testMessage); // Message is set

    // Wait for 2 seconds and then check if the modal closes
    setTimeout(() => {
      expect(component.displayStyle).toBe('none'); // Modal should be closed
      expect(component.message).toBe(''); // Message should be cleared
      done();
    }, 2000);
  });

  it('should manually close the modal', () => {
    component.open('Operation successful!'); // Open with a message
    component.close(); // Manually close

    expect(component.displayStyle).toBe('none'); // Modal should be closed
    expect(component.message).toBe(''); // Message should be cleared
  });
});
