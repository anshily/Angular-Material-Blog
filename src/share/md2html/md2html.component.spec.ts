import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Md2htmlComponent } from './md2html.component';

describe('Md2htmlComponent', () => {
  let component: Md2htmlComponent;
  let fixture: ComponentFixture<Md2htmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Md2htmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Md2htmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
