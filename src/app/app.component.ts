import { Component } from '@angular/core';
import {RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CONFIGS } from './configs/config';
import { TranslateService } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = CONFIGS.TITLE;
  currentLang: string = 'jp';

  constructor(private translate:TranslateService) {
    translate.addLangs(['en', 'jp']);
    translate.setDefaultLang('jp');
    this.currentLang = sessionStorage.getItem('lang') || 'jp';
    translate.use(this.currentLang.match(/en|jp/) ? this.currentLang : 'jp');
  }

  switchLang(lang:string) {
    this.translate.use(lang);
    this.currentLang = lang;
    sessionStorage.setItem('lang', lang);
  }


}
