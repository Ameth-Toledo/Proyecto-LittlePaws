import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { loadGapiInsideDOM } from 'gapi-script';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GmailService {
  private CLIENT_ID = ''; 
  private CLIENT_SECRET = '';
  private API_KEY = '';
  private SCOPES = 'https://www.googleapis.com/auth/gmail.send';

  private gapiLoadedSubject = new BehaviorSubject<boolean>(false);
  gapiLoaded$ = this.gapiLoadedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCredentials();
  }

  private loadCredentials() {
    this.http.get('/assets/credentials.json').subscribe(
      (data: any) => {
        this.CLIENT_ID = data.web.client_id;
        this.CLIENT_SECRET = data.web.client_secret;
        this.API_KEY = data.web.api_key;
        this.initClient();
      },
      (error) => {
        console.error('Error loading credentials:', error);
      }
    );
  }


  private async initClient() {
    try {
      const gapi = await loadGapiInsideDOM();
      gapi.load('client:auth2', async () => {
        await gapi.client.init({
          apiKey: this.API_KEY,
          clientId: this.CLIENT_ID,
          discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest',
          ],
          scope: this.SCOPES,
        });
        this.gapiLoadedSubject.next(true);
        console.log('Google API client initialized successfully');
      });
    } catch (error) {
      console.error('Error initializing Google API client:', error);
    }
  }

  async signIn() {
    const gapi = (window as any).gapi;
    const auth = gapi.auth2.getAuthInstance();

    if (!this.gapiLoadedSubject.value) {
      console.error('GAPI not loaded yet!');
      return;
    }

    try {
      if (auth.isSignedIn.get()) {
        console.log('Ya está autenticado, cerrando sesión primero');
        await auth.signOut();
      }

      const user = await auth.signIn();
      console.log('Usuario autenticado:', user.getBasicProfile().getEmail());
      localStorage.setItem('email', user.getBasicProfile().getEmail());
      localStorage.setItem('username', user.getBasicProfile().getName());
      localStorage.setItem('user_id', user.getId());
    } catch (error) {
      console.error('Error en el inicio de sesión de Gmail:', error);
    }
  }

  async signOut() {
    const gapi = (window as any).gapi;
    const auth = gapi.auth2.getAuthInstance();
    await auth.signOut();
    console.log('Usuario cerrado sesión');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
  }

  async sendEmail(to: string, subject: string, body: string) {
    const gapi = (window as any).gapi;
    const message = this.createMessage(to, subject, body);
    const request = gapi.client.gmail.users.messages.send({
      userId: 'me',
      resource: {
        raw: message,
      },
    });
    return request.execute();
  }

  createMessage(to: string, subject: string, body: string) {
    const encodedMessage = [
      `Content-Type: text/html; charset="UTF-8"`,
      `MIME-Version: 1.0`,
      `To: ${to}`,
      `Subject: ${subject}`,
      '',
      body,
    ].join('\r\n');

    return btoa(encodedMessage).replace(/\+/g, '-').replace(/\//g, '_');
  }
}
