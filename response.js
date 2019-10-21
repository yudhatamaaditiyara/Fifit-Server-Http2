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

const {Http2ServerResponse} = require('http2');
const HttpResponse = require('fifit-server-http/response');
const ObjectAssigner = require('ganiyem-util-objectassigner');

/**
 */
class Response extends Http2ServerResponse
{
	/**
	 * @param {Server} server
	 * @returns {function}
	 */
	static class(server){
		class Response extends this{};
		Response.prototype.server = server;
		return Response;
	}
}

/**
 * @mixin
 */
ObjectAssigner.create(Response.prototype, HttpResponse.prototype)
	.access('status');

/**
 * @+
 */
module.exports = Response;