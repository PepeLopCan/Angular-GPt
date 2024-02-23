import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { OpenAiServie } from '../../services/openai.service';
import { Message } from '../../../interfaces';
import { ChatMessageComponent } from '../../components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '../../components/chat-bubbles/myMessage/myMessage.component';
import { TypingLoaderComponent } from '../../components/typingLoader/typingLoader.component';
import { TextMessageBoxComponent } from '../../components/text-boxes/textMessageBox/textMessageBox.component';
import { TextMessageBoxFileComponent } from '../../components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxSelectComponent } from '../../components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';

@Component({
  selector: 'app-pros-const-stream-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './prosConstStreamPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConstStreamPageComponent {


  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject( OpenAiServie );

  public abortSignal = new AbortController();

  async handleMessage( prompt: string ) {

    this.abortSignal.abort();
    this.abortSignal = new AbortController();

    this.messages.update( prev => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      },
      {
        isGpt: true,
        text: '...'
      }
    ]);


    this.isLoading.set(true);
    const stream = this.openAiService.prosConsStreamDiscusser(prompt, this.abortSignal.signal);
    this.isLoading.set(false);

    for await (const text of stream) {
      console.log(text);

      this.handleStreamResponse(text);
    }

  }


  handleStreamResponse( message: string ) {

    this.messages().pop();
    const messages = this.messages();

    this.messages.set([ ...messages, { isGpt: true, text: message } ]);

  }

 }
