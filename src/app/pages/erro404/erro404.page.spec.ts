import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Erro404Page } from './erro404.page';

describe('Erro404Page', () => {
  let component: Erro404Page;
  let fixture: ComponentFixture<Erro404Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Erro404Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Erro404Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
