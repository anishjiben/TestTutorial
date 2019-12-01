import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {

  @Input()
  srcPath: string;
  @Input()
  subTitlePath: string;
  @Output()
  videoEnds = new EventEmitter<string>();

  @ViewChild('media', {static: false})
  videoplayer: ElementRef;

  onVideoEnds(): void {
    this.videoEnds.emit(this.srcPath);
  }

  forward(): void {
    this.videoplayer.nativeElement.currentTime = this.videoplayer.nativeElement.currentTime + 30;
  }

  rewind(): void {
    this.videoplayer.nativeElement.currentTime = this.videoplayer.nativeElement.currentTime - 30;
  }
}
