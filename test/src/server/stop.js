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
const {RuntimeError} = require('ganiyem-error');
const helper = require('../../helper');

describe('Server#stop()', () => {
  it('must be Server#isStarted === false', async() => {
    let server = helper.createServer();
    await server.start();
    assert.ok(server.isStarted === true);
    await server.stop();
    assert.ok(server.isStarted === false);
  });

  it('must be reject(RuntimeError) when server is already stoped', async() => {
    let server = helper.createServer();
    await server.start();
    await server.stop();
    try {
      await server.stop();
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof RuntimeError);
    }
  });
});