import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RepeaterComponent } from "./repeater/repeater.component";
import { CustomSortPipe } from './custom-sort.pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RepeaterComponent, CustomSortPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ECT-Task';
  data = [{ name: 'A' }, { name: 'B' }, { name: 'C' }];
}
