import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent } from '../../components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '../../components/chat-bubbles/myMessage/myMessage.component';
import { TypingLoaderComponent } from '../../components/typingLoader/typingLoader.component';
import { TextMessageBoxComponent } from '../../components/text-boxes/textMessageBox/textMessageBox.component';
import { TextMessageBoxFileComponent } from '../../components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import {  TextMessageBoxSelectComponent } from '../../components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { Message } from '../../../interfaces';
import { OpenAiServie } from '../../services/openai.service';
import { GtpMessageOrthographyComponent } from '../../components/chat-bubbles/gtpMessageOrthography/gtpMessageOrthography.component';
@Component({
  selector: 'app-ortography-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent,
    GtpMessageOrthographyComponent

  ],
  templateUrl: './ortographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrtographyPageComponent {

public messages = signal<Message[]>([{text: 'Hola Mundo', isGpt:false}]);
public isLoading = signal(false);
public openAiService = inject(OpenAiServie);



   handleMessage( prompt:string){

    this.isLoading.set(true) // para marcar la burbuja de escribiendo

    this.messages.update((prev) => [...prev, {
      isGpt:false // poruqe estoy enviado yo mensaje
      ,text:prompt
    }])

    this.openAiService.checkOrthography(prompt).subscribe(resp => {
        this.isLoading.set(false)
        this.messages.update(prev =>[
          ...prev,
          {
            isGpt:true,
            text:resp.message,
            info:resp
          }
        ])
    })
  }

 }
