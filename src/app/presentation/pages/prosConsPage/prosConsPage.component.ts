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
  selector: 'app-pros-cons-page',
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
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent {


  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiServie);



     handleMessage( prompt:string){
      console.log(prompt);
      this.messages.update((prev) => [...prev, {
        isGpt:false // poruqe estoy enviado yo mensaje
        ,text:prompt
      }])

      this.isLoading.set(true);
      this.openAiService.prosConsDiscusser(prompt)
      .subscribe(resp  => {
        this.isLoading.set(false);
        this.messages.update( prev => [
            ...prev,
            {
              isGpt:true,
              text:resp.content
            },
          ])
      })

    }
  }
