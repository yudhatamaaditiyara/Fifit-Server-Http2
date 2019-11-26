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

describe('Request#hostname', () => {
  it('must be work with createServer()', (done) => {
    let server = helper.createServer();
    server.listen((request, response) => {
      response.end(request.hostname);
    });
    server.start().then(() => {
      helper.createHttp2Request({
        host: server.options.host,
        port: server.options.port
      }).then(({buffer}) => {
        assert.strictEqual(buffer, server.options.host);
        server.stop().then(done);
      });
    });
  });

  it('must be work with createServerDefaultPort()', (done) => {
    let server = helper.createServerDefaultPort();
    server.listen((request, response) => {
      response.end(request.hostname);
    });
    server.start().then(() => {
      helper.createHttp2Request({
        host: server.options.host
      }).then(({buffer}) => {
        assert.strictEqual(buffer, server.options.host);
        server.stop().then(done);
      });
    });
  });

  it('must be work with createServerIpv6Host()', (done) => {
    let server = helper.createServerIpv6Host();
    server.listen((request, response) => {
      response.end(request.hostname);
    });
    server.start().then(() => {
      /* todo: "[" + server.options.host + "]" */
      helper.createHttp2Request({
        host: '127.0.0.1',
        port: server.options.port
      }).then(({buffer}) => {
        assert.strictEqual(buffer, '127.0.0.1');
        server.stop().then(done);
      });
    });
  });

  it('must be work with createServerIpv6HostDefaultPort()', (done) => {
    let server = helper.createServerIpv6HostDefaultPort();
    server.listen((request, response) => {
      response.end(request.hostname);
    });
    server.start().then(() => {
      /* todo: "[" + server.options.host + "]" */
      helper.createHttp2Request({
        host: '127.0.0.1'
      }).then(({buffer}) => {
        assert.strictEqual(buffer, '127.0.0.1');
        server.stop().then(done);
      });
    });
  });

  it('must be work with createSecureServer()', (done) => {
    let server = helper.createSecureServer();
    server.listen((request, response) => {
      response.end(request.hostname);
    });
    server.start().then(() => {
      helper.createHttp2SecureRequest({
        host: server.options.host,
        port: server.options.port
      }).then(({buffer}) => {
        assert.strictEqual(buffer, server.options.host);
        server.stop().then(done);
      });
    });
  });

  it('must be work with createSecureServerDefaultPort()', (done) => {
    let server = helper.createSecureServerDefaultPort();
    server.listen((request, response) => {
      response.end(request.hostname);
    });
    server.start().then(() => {
      helper.createHttp2SecureRequest({
        host: server.options.host
      }).then(({buffer}) => {
        assert.strictEqual(buffer, server.options.host);
        server.stop().then(done);
      });
    });
  });
});