import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { OpenAiServie } from '../../services/openai.service';
import { Message } from '../../../interfaces';
import { ChatMessageComponent } from '../../components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '../../components/chat-bubbles/myMessage/myMessage.component';
import { TypingLoaderComponent } from '../../components/typingLoader/typingLoader.component';
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from '../../components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';

@Component({
  selector: 'app-text-to-audio-page',
  standalone: true,
  imports: [
    CommonModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './textToAudioPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpenAiServie);
  public voices = signal([
    { id: "nova", text: "Nova" },
    { id: "alloy", text: "Alloy" },
    { id: "echo", text: "Echo" },
    { id: "fable", text: "Fable" },
    { id: "onyx", text: "Onyx" },
    { id: "shimmer", text: "Shimmer" },
  ]);



  handleMessageWithSelect( {prompt,selectedOption}:TextMessageBoxEvent){
      const message = `${selectedOption} - ${prompt}`;

      this.messages.update(prev => [...prev , {text:message, isGpt:false}]);
      this.isLoading.set(true);

      this.openAiService.textToAudios(prompt , selectedOption).subscribe(({message,audioUrl})=> {
        this.isLoading.set(false);
        this.messages.update(prev => [
          ...prev,
          {
            isGpt:true,
            text:message,
            audioUrl:audioUrl
          }
        ])
      })
    }
 }
