import test from 'node:test';
import assert from 'node:assert/strict';
import { sanitizeUrl } from './sanitizeUrl.js';

test('sanitizeUrl should allow http and https protocols', () => {
  assert.equal(sanitizeUrl('http://example.com'), 'http://example.com');
  assert.equal(sanitizeUrl('https://example.com'), 'https://example.com');
});

test('sanitizeUrl should allow relative URLs (parsed as http)', () => {
  assert.equal(sanitizeUrl('/path/to/resource'), '/path/to/resource');
});

test('sanitizeUrl should block javascript, data, and vbscript protocols', () => {
  assert.equal(sanitizeUrl('javascript:alert(1)'), undefined);
  assert.equal(sanitizeUrl('data:text/html,<h1>Hello</h1>'), undefined);
  assert.equal(sanitizeUrl('vbscript:msgbox("hi")'), undefined);
});

test('sanitizeUrl should block unknown protocols', () => {
  assert.equal(sanitizeUrl('ftp://example.com'), undefined);
  assert.equal(sanitizeUrl('mailto:test@example.com'), undefined);
  assert.equal(sanitizeUrl('ssh://example.com'), undefined);
  assert.equal(sanitizeUrl('file:///etc/passwd'), undefined);
});
