import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Section} from '../../services/tutorial';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent {

  @Input()
  section: Section;
  @Input()
  sectionNumber: number;
  @Input()
  sectionSelected = false;
  @Output()
  videoSelected = new EventEmitter<string>();

  onSectionClick(src: string): void {
    this.videoSelected.next(src);
  }

  getTopicFromLink(link: string): string {
    const index = link.lastIndexOf('.');
    return link.substring(0, index);
  }

}
