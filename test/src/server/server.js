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
const config = require('../../helper/config');

describe('Server', () => {
  it('must be Server#config.host === config.server.host', () => {
    let server = helper.createServer();
    assert.strictEqual(server.config.host, config.server.host);
  });

  it('must be Server#config.port === config.server.port', () => {
    let server = helper.createServer();
    assert.strictEqual(server.config.port, config.server.port);
  });

  it('must be Server#resource != null', () => {
    let server = helper.createServer();
    assert.ok(server.resource != null);
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
        host: server.config.host,
        port: server.config.port
      }).then(({buffer}) => {
        assert.strictEqual(buffer, 'http://' + server.config.host + ':' + server.config.port + '/');
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
        host: server.config.host
      }).then(({buffer}) => {
        assert.strictEqual(buffer, 'http://' + server.config.host + ':' + server.config.port + '/');
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
      /* todo: "[" + server.config.host + "]" */
      helper.createHttp2Request({
        host: '127.0.0.1',
        port: server.config.port
      }).then(({buffer}) => {
        assert.strictEqual(buffer, 'http://127.0.0.1:' + server.config.port + '/');
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
      /* todo: "[" + server.config.host + "]" */
      helper.createHttp2Request({
        host: '127.0.0.1',
      }).then(({buffer}) => {
        assert.strictEqual(buffer, 'http://127.0.0.1:' + server.config.port + '/');
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
        host: server.config.host,
        port: server.config.port
      }).then(({buffer}) => {
        assert.strictEqual(buffer, 'https://' + server.config.host + ':' + server.config.port + '/');
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
        host: server.config.host
      }).then(({buffer}) => {
        assert.strictEqual(buffer, 'https://' + server.config.host + ':' + server.config.port + '/');
        server.stop().then(done);
      });
    });
  });
});