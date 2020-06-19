import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GerenciarEventosPage } from './gerenciar-eventos.page';

describe('GerenciarEventosPage', () => {
  let component: GerenciarEventosPage;
  let fixture: ComponentFixture<GerenciarEventosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciarEventosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciarEventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
