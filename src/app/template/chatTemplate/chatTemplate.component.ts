import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { OpenAiServie } from '../../presentation/services/openai.service';
import { Message } from '../../interfaces';
import { TextMessageBoxFileComponent, TextMessageEvent } from '../../presentation/components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from '../../presentation/components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { ChatMessageComponent } from '../../presentation/components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '../../presentation/components/chat-bubbles/myMessage/myMessage.component';
import { TypingLoaderComponent } from '../../presentation/components/typingLoader/typingLoader.component';
import { TextMessageBoxComponent } from '../../presentation/components/text-boxes/textMessageBox/textMessageBox.component';

@Component({
  selector: 'app-chat-template',
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
  templateUrl: './chatTemplate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatTemplateComponent {

  public messages = signal<Message[]>([]);
public isLoading = signal(false);
public openAiService = inject(OpenAiServie);



   handleMessage( prompt:string){
    console.log(prompt);

  }
/*
  handleMessageWithFile( event:TextMessageEvent){

    console.log(event);

  }

  handleMessageWithSelect(event: TextMessageBoxEvent){
      console.log(event);
  } */
 }
