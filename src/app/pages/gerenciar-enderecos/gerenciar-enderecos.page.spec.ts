import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GerenciarEnderecosPage } from './gerenciar-enderecos.page';

describe('GerenciarEnderecosPage', () => {
  let component: GerenciarEnderecosPage;
  let fixture: ComponentFixture<GerenciarEnderecosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciarEnderecosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciarEnderecosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
