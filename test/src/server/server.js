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
const http2 = require('http2');
const helper = require('../../helper');
const config = require('../../helper/config');

describe('Server', () => {
  it('must be Server#options.host === config.server.host', () => {
    let server = helper.createServer();
    assert.strictEqual(server.options.host, config.server.host);
  });

  it('must be Server#options.port === config.server.port', () => {
    let server = helper.createServer();
    assert.strictEqual(server.options.port, config.server.port);
  });

  it('must be Server#resource instanceof http2.Server', () => {
    let server = helper.createServer();
    assert.ok(server.resource);
  });

  it('must be Server#isStarted === false', () => {
    let server = helper.createServer();
    assert.ok(server.isStarted === false);
  });

  it('must be work with createServer()', (done) => {
    let server = helper.createServer();
    server.listen((request, response) => {
      response.end(request.href);
    });
    server.start().then(() => {
      helper.createHttp2Request({
        host: server.options.host,
        port: server.options.port
      }).then(({buffer}) => {
        assert.strictEqual(buffer, 'http://' + server.options.host + ':' + server.options.port + '/');
        server.stop().then(done);
      });
    });
  });

  it('must be work with createServerDefaultPort()', (done) => {
    let server = helper.createServerDefaultPort();
    server.listen((request, response) => {
      response.end(request.href);
    });
    server.start().then(() => {
      helper.createHttp2Request({
        host: server.options.host
      }).then(({buffer}) => {
        assert.strictEqual(buffer, 'http://' + server.options.host + ':' + server.options.port + '/');
        server.stop().then(done);
      });
    });
  });

  it('must be work with createServerIpv6Host()', (done) => {
    let server = helper.createServerIpv6Host();
    server.listen((request, response) => {
      response.end(request.href);
    });
    server.start().then(() => {
      /* todo: "[" + server.options.host + "]" */
      helper.createHttp2Request({
        host: '127.0.0.1',
        port: server.options.port
      }).then(({buffer}) => {
        assert.strictEqual(buffer, 'http://127.0.0.1:' + server.options.port + '/');
        server.stop().then(done);
      });
    });
  });

  it('must be work with createServerIpv6HostDefaultPort()', (done) => {
    let server = helper.createServerIpv6HostDefaultPort();
    server.listen((request, response) => {
      response.end(request.href);
    });
    server.start().then(() => {
      /* todo: "[" + server.options.host + "]" */
      helper.createHttp2Request({
        host: '127.0.0.1',
      }).then(({buffer}) => {
        assert.strictEqual(buffer, 'http://127.0.0.1:' + server.options.port + '/');
        server.stop().then(done);
      });
    });
  });

  it('must be work with createSecureServer()', (done) => {
    let server = helper.createSecureServer();
    server.listen((request, response) => {
      response.end(request.href);
    });
    server.start().then(() => {
      helper.createHttp2SecureRequest({
        host: server.options.host,
        port: server.options.port
      }).then(({buffer}) => {
        assert.strictEqual(buffer, 'https://' + server.options.host + ':' + server.options.port + '/');
        server.stop().then(done);
      });
    });
  });

  it('must be work with createSecureServerDefaultPort()', (done) => {
    let server = helper.createSecureServerDefaultPort();
    server.listen((request, response) => {
      response.end(request.href);
    });
    server.start().then(() => {
      helper.createHttp2SecureRequest({
        host: server.options.host
      }).then(({buffer}) => {
        assert.strictEqual(buffer, 'https://' + server.options.host + ':' + server.options.port + '/');
        server.stop().then(done);
      });
    });
  });
});