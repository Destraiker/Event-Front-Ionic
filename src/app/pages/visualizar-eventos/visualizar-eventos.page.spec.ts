import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisualizarEventosPage } from './visualizar-eventos.page';

describe('VisualizarEventosPage', () => {
  let component: VisualizarEventosPage;
  let fixture: ComponentFixture<VisualizarEventosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizarEventosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizarEventosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
