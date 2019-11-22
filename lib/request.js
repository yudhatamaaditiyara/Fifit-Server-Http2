/**
 * Copyright (C) 2019 Yudha Tama Aditiyara
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const {Http2ServerRequest} = require('http2');
const {Request: HttpRequest} = require('fifit-server-http');
const ObjectAssigner = require('ganiyem-util-objectassigner');

/**
 */
class Request extends Http2ServerRequest
{
  /**
   * @returns {string}
   */
  get host(){
    if (this._host == null) {
      this._host = this.authority || '';
    }
    return this._host;
  }
  
  /**
   * @param {Server} server
   * @returns {function}
   */
  static class(server){
    class Request extends this{};
    Request.prototype.server = server;
    return Request;
  }
}

/**
 * @mixin
 */
ObjectAssigner.create(Request.prototype, HttpRequest.prototype)
  .getter('isSecure')
  .getter('isAbsoluteUrl')
  .getter('href')
  .getter('origin')
  .getter('protocol')
  .getter('hostname')
  .getter('port')
  .getter('path')
  .getter('pathname')
  .getter('search')
  .getter('searchParams')
  .getter('query')
  .getter('queryParams')
  .getter('parsedUrl')
  .getter('parsedHref');

/**
 * @+
 */
module.exports = Request;