import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TutorialService {

  constructor(private http: HttpClient) {
  }

  public getTutorial(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/tutorials');
  }
}
