import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InscritoEventosPage } from './inscrito-eventos.page';

describe('InscritoEventosPage', () => {
  let component: InscritoEventosPage;
  let fixture: ComponentFixture<InscritoEventosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InscritoEventosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InscritoEventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
