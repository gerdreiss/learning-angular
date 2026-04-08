// An Angular app is started like below when modules are not used:
// import { provideZoneChangeDetection } from "@angular/core";
// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// bootstrapApplication(AppComponent, {providers: [provideZoneChangeDetection()]}).catch((err) => console.error(err));

// start the app that uses modules like below:
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';

platformBrowser()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
