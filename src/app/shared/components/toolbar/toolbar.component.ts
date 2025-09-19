import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

import { DarkModeService } from '../../dark-mode.service';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  readonly isDarkMode$ = this.darkModeService.isDarkMode$;

  constructor(
    private readonly darkModeService: DarkModeService,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  toggleDarkMode(enabled: boolean): void {
    this.darkModeService.setDarkMode(enabled);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
