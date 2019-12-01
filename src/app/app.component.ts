import {Component, OnInit} from '@angular/core';
import {Section, Tutorial} from './services/tutorial';
import {TutorialService} from './services/tutorial.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tutorial: Tutorial;
  selectedVideoSrc = '';
  private allVideos = [];
  selectedSection: Section;

  constructor(private readonly tutorialService: TutorialService) {
  }

  ngOnInit() {
    this.tutorialService.getTutorial().subscribe(this.handleResponse.bind(this));
  }

  onVideoSelected(src: string): void {
    this.selectedSection = this.getSectionOfSrc(src);
    if (src.endsWith('.mp4')) {
      this.selectedVideoSrc = src;
    } else {
      window.open(src, '_blank');
    }
  }

  loadNextVideo(finishedSrc: string): void {
    const index = this.allVideos.findIndex(link => link === finishedSrc);
    if (index + 1 < this.allVideos.length) {
      this.selectedVideoSrc = this.allVideos[index + 1];
      this.selectedSection = this.getSectionOfSrc(this.selectedVideoSrc);
    }
    const selectedResournce = this.getSectionOfSrc(finishedSrc).resources.find(item => {
      return item.videoLink === finishedSrc;
    });
    selectedResournce.played = true;
    const currentSection = this.getSectionOfSrc(finishedSrc);
    currentSection.numberOfVideosPlayed = this.getNumberOfVideosWatched(currentSection);
  }

  private handleResponse(tutorial): void {
    this.tutorial = {videos: []};
    this.allVideos = [];
    if (tutorial.videos.length > 0) {
      tutorial.videos.forEach(item => {
        const mp4Videos = item.resources.filter(resource => {
          return resource.endsWith('.mp4');
        });
        this.allVideos.push(...mp4Videos);
        const section: Section = {
          title: item.title,
          numberOfVideos: mp4Videos.length,
          numberOfVideosPlayed: 0,
          totalDurationOfVideos: '0',
          resources: item.resources.map(resource => {
            return {
              videoLink: resource,
              played: false,
              topic: this.getTopicFromLink(resource)
            };
          }),
          subtitles: item.subtitles
        };
        this.tutorial.videos.push(section);
      });
      this.selectedVideoSrc = this.tutorial.videos[0].resources[0].videoLink;
      this.selectedSection = this.tutorial.videos[0];
    }
  }

  private getTopicFromLink(link: string): string {
    const index = link.lastIndexOf('/');
    return link.substring(index + 1);
  }

  private getSectionOfSrc(src: string): Section {
    const section = this.tutorial.videos.find(item => {
      const index = item.resources.findIndex(resource => resource.videoLink === src);
      return index > -1;
    });
    return section;
  }

  private getNumberOfVideosWatched(section: Section): number {
    let numberOfWatchedVideos = 0;
    section.resources.forEach(item => {
      if (item.played === true) {
        numberOfWatchedVideos++;
      }
    });
    return numberOfWatchedVideos;
  }

  getTrackOfVideo(src: string): string {
    const trackSrc = this.getSectionOfSrc(src).subtitles.find(item => {
      return this.removeExtension(item) === this.removeExtension(src);
    });
    if (trackSrc) {
      return trackSrc;
    } else {
      return '';
    }
  }

  private removeExtension(link: string): string {
    const index = link.lastIndexOf('.');
    return link.substring(0, index);
  }

}
