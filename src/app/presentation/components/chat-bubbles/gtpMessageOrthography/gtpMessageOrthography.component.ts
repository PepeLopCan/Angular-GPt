import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-gtp-message-orthography',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './gtpMessageOrthography.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GtpMessageOrthographyComponent {
@Input({required:true}) userScore!:number
@Input({required:true}) text!:string
@Input() errors:string[] = [];

}
