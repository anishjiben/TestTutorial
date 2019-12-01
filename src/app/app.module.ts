import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {VideoPlayerComponent} from './media-components/video-player/video-player.component';
import {TutorialService} from './services/tutorial.service';
import {HttpClientModule} from '@angular/common/http';
import {VgCoreModule} from 'videogular2/compiled/src/core/core';
import {VgBufferingModule} from 'videogular2/compiled/src/buffering/buffering';
import {VgOverlayPlayModule} from 'videogular2/compiled/src/overlay-play/overlay-play';
import {VgControlsModule} from 'videogular2/compiled/src/controls/controls';
import { SectionComponent } from './common-components/section/section.component';
import {CommonModule} from '@angular/common';
import { TitleComponent } from './common-components/title/title.component';


@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    SectionComponent,
    TitleComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  providers: [TutorialService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
