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
const assert = require('assert');
const helper = require('../../helper');

describe('Request#getHeaderNames', () => {
  it('must be work with createServer()', (done) => {
    let server = helper.createServer();
    server.listen((request, response) => {
      response.end(JSON.stringify(request.getHeaderNames()));
    });
    server.start().then(() => {
      helper.createHttp2Request({
        host: server.options.host,
        port: server.options.port,
        headers: {
          'X-Fifit': 'Fithrotun Nisa'
        }
      }).then(({buffer}) => {
        assert.ok(JSON.parse(buffer).indexOf('x-fifit') > -1);
        server.stop().then(done);
      });
    });
  });

  it('must be work with createSecureServer()', (done) => {
    let server = helper.createSecureServer();
    server.listen((request, response) => {
      response.end(JSON.stringify(request.getHeaderNames()));
    });
    server.start().then(() => {
      helper.createHttp2SecureRequest({
        host: server.options.host,
        port: server.options.port,
        headers: {
          'X-Fifit': 'Fithrotun Nisa'
        }
      }).then(({buffer}) => {
        assert.ok(JSON.parse(buffer).indexOf('x-fifit') > -1);
        server.stop().then(done);
      });
    });
  });
});