import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlterarEventoPage } from './alterar-evento.page';

describe('AlterarEventoPage', () => {
  let component: AlterarEventoPage;
  let fixture: ComponentFixture<AlterarEventoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarEventoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlterarEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
