import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchmapComponent } from './searchmap.component';

describe('SearchmapComponent', () => {
  let component: SearchmapComponent;
  let fixture: ComponentFixture<SearchmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchmapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
