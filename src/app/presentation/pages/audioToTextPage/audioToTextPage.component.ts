import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AudioToTextResponse, Message } from '../../../interfaces';
import { OpenAiServie } from '../../services/openai.service';
import { ChatMessageComponent } from '../../components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '../../components/chat-bubbles/myMessage/myMessage.component';
import { TypingLoaderComponent } from '../../components/typingLoader/typingLoader.component';
import { TextMessageBoxFileComponent, TextMessageEvent } from '../../components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';

@Component({
  selector: 'app-audio-to-text-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxFileComponent,
  ],
  templateUrl: './audioToTextPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiServie);



  handleMessageWithFile( { prompt, file }: TextMessageEvent ) {

    const text = prompt ?? file.name ?? 'Traduce el audio';
    this.isLoading.set(true);

    this.messages.update( prev => [...prev, { isGpt: false, text: text }] );

    this.openAiService.audioToText( file, text )
      .subscribe( resp => this.handleResponse(resp) );


  }


  handleResponse( resp: AudioToTextResponse | null) {

    this.isLoading.set(false);
    if ( !resp ) return;

    const text = `## Transcripción:
__Duración:__ ${ Math.round( resp.duration ) } segundos.

## El texto es:
${ resp.text }
    `;

    this.messages.update( prev => [...prev, { isGpt: true, text: text }] );

    for (const segment of resp.segments) {
      const segmentMessage = `
__De ${ Math.round(segment.start) } a ${ Math.round( segment.end ) } segundos.__
${ segment.text }
      `;

      this.messages.update( prev => [...prev, { isGpt: true, text: segmentMessage }] );

    }



  }
}
