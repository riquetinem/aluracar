import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AgendamentosServiceProvider {

  constructor(private _http: HttpClient) {
      
  }

}
