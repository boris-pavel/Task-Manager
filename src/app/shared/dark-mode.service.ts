import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private readonly storageKey = 'task_manager_dark_mode';
  private readonly darkModeSubject = new BehaviorSubject<boolean>(this.getInitialTheme());
  readonly isDarkMode$ = this.darkModeSubject.asObservable();

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    this.applyTheme(this.darkModeSubject.value);
  }

  toggle(): void {
    this.setDarkMode(!this.darkModeSubject.value);
  }

  setDarkMode(enabled: boolean): void {
    this.darkModeSubject.next(enabled);
    this.persistPreference(enabled);
    this.applyTheme(enabled);
  }

  private getInitialTheme(): boolean {
    const saved = localStorage.getItem(this.storageKey);
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  }

  private persistPreference(enabled: boolean): void {
    localStorage.setItem(this.storageKey, String(enabled));
  }

  private applyTheme(enabled: boolean): void {
    this.document.body.classList.toggle('dark-theme', enabled);
  }
}
