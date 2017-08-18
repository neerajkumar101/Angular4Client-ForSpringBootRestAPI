import { Component } from '@angular/core';
import { Logger } from "angular2-logger/core";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent { 
  
  constructor( private _logger: Logger ){
 		this._logger.error('This is a priority level 1 error message...');
 		this._logger.warn('This is a priority level 2 warning message...');
 		this._logger.info('This is a priority level 3 warning message...');
 		this._logger.debug('This is a priority level 4 debug message...');
 		this._logger.log('This is a priority level 5 log message...');
   }
  
  name = 'Angular';  
}


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/