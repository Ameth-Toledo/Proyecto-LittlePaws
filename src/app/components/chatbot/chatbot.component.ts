import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChatbotApiService } from '../../services/chatbot-api.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterOutlet],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  geminiService = inject(ChatbotApiService);
  chatbotResponses : string[] = [];
  isChatOpen: boolean = false;

  async getAnswer() {
    const userInput = this.geminiService.form.get('userInput')?.value;
    if (userInput) {
      this.chatbotResponses.push(`Tú: ${userInput}`);
      const response = await this.geminiService.generate(userInput);
      let cleanResponse = response.replace(/\*/g, '');
      this.chatbotResponses.push(`LittlePaws: ${cleanResponse}`);
      this.geminiService.form.reset();
    }
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }
}
