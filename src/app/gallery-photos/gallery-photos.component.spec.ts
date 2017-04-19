import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryPhotosComponent } from './gallery-photos.component';

describe('GalleryPhotosComponent', () => {
  let component: GalleryPhotosComponent;
  let fixture: ComponentFixture<GalleryPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
