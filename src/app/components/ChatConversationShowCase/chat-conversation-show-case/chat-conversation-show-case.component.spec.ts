import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatConversationShowCaseComponent } from './chat-conversation-show-case.component';

describe('ChatConversationShowCaseComponent', () => {
  let component: ChatConversationShowCaseComponent;
  let fixture: ComponentFixture<ChatConversationShowCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatConversationShowCaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatConversationShowCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
