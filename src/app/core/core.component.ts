import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-core',
  imports: [TranslatePipe],
  templateUrl: './core.component.html',
  styleUrl: './core.component.scss'
})
export class CoreComponent {

  constructor(private router:Router){}

  onEmployeesRouterClick() {
    this.router.navigate(['/employees']);
  }

}
