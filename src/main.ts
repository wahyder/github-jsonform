import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterOutlet, RouterLink } from '@angular/router';
import { routes } from './app/app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <nav>
      <a routerLink="/form-array">Form Array Demo</a> |
      <a routerLink="/json-form">JSON Form Demo</a> |
      <a routerLink="/json-form-demo">Dynamic JSON Form Demo</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    nav {
      padding: 1rem;
      background: #f0f0f0;
      margin-bottom: 1rem;
    }
    nav a {
      margin: 0 1rem;
      text-decoration: none;
      color: #333;
    }
    nav a:hover {
      color: #666;
    }
  `]
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App, {
  providers: [provideRouter(routes)]
});