import { Component, Input } from '@angular/core';
import { option, customer } from './option.model';
import { CustomSortPipe } from '../custom-sort.pipe';

@Component({
  selector: 'app-repeater',
  imports: [CustomSortPipe],
  templateUrl: './repeater.component.html',
  styleUrl: './repeater.component.css',
})
export class RepeaterComponent {
  @Input() options?: option[];
  values = [
    { id: 45, name: 'Astart' },
    { id: 44, name: 'Astart' },
    { id: 45, name: 'Bstart' },
    { id: 65, name: 'Cstart' },
    { id: 44, name: 'Dstart' },
  ];
}
