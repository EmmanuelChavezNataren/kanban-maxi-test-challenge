import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ThemeProvider } from '@modules/theme';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ThemeSwitcherComponent {
  darkMode: boolean;

  #subs: Subscription = new Subscription();
  //Injects
  #themeProv = inject(ThemeProvider);
  constructor() {
    this.subscribeData();
  }

  /**
   * UI Events
   */

  subscribeData() {
    this.#subs.add(
      this.#themeProv.state.isDarkMode$.subscribe((dark) => {
        this.darkMode = dark;
        document.body.classList.toggle('dark', dark);
      })
    );
  }

  toggleTheme() {
    this.#themeProv.toggleTheme();
  }
}
