import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'TaskManagerFrontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('TaskManagerFrontend');
  });

  it('should render title in a h3 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Project Manager');
  });

  it('check all navbar link', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const routerLinks = compiled.querySelectorAll('a');
    expect(routerLinks.length).toBe(4, 'should have 4 routerLinks');
    expect(routerLinks[0].attributes.routerlink.value).toBe('/add-project');
    expect(routerLinks[1].attributes.routerlink.value).toBe('/add-task');
    expect(routerLinks[2].attributes.routerlink.value).toBe('/add-user');
    expect(routerLinks[3].attributes.routerlink.value).toBe('/view-task');
  }));

});
