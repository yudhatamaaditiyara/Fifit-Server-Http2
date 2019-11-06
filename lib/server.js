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

const http2 = require('http2');
const {Server: HttpServer} = require('fifit-server-http');
const Request = require('./request');
const Response = require('./response');

/**
 */
class Server extends HttpServer
{
	/**
	 * @returns {Object}
	 */
	_createServerOptions(){
		let options = super._createServerOptions();
		return Object.assign({}, this.options.options, {
			Http1IncomingMessage: options.IncomingMessage,
			Http1ServerResponse: options.ServerResponse,
			Http2ServerRequest: Request.class(this),
			Http2ServerResponse: Response.class(this)
		});
	}
	
	/**
	 * @returns {http2.Http2Server}
	 */
	_createServerResource(){
		return http2.createServer(this._createServerOptions());
	}
}

/**
 * @+
 */
module.exports = Server;