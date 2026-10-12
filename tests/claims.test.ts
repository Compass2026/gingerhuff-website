import { test } from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../src/App.tsx';
import { PAGE_PATHS } from '../src/routing.ts';

// Claims Compass CRM has not confirmed for Ginger Huff Interiors (see the approved brand board's hard rules).
// Years-in-business figures conflict across sources, and partner, certification, installation, count and
// timeline claims have no evidence. Reintroducing any of them must be a deliberate, sourced change.
const UNSUPPORTED = [
  /\b\d+\+?\s*years\b(?! ago)/i,
  /\bthree decades\b/i,
  /\best\.?\s*(19|20)\d\d\b/i,
  /hunter\s*douglas/i,
  /\bcertified\b|authori[sz]ed dealer|\bdealer\b/i,
  /trade (partner|relationship|pricing|account|alliance|program)|trade-exclusive/i,
  /white-glove|factory-trained/i,
  /\b\d{2,}\+\s*(homes|clients|projects|fabric)/i,
  /\b\d+\s*(to|-|–)\s*\d+\s*weeks\b/i,
  /national scale|nationwide/i,
];

test('no page renders an unsupported business claim', () => {
  for (const path of Object.values(PAGE_PATHS)) {
    const text = renderToStaticMarkup(React.createElement(App, { initialPath: path })).replace(/<[^>]+>/g, ' ');
    for (const pattern of UNSUPPORTED) assert.ok(!pattern.test(text), `${path} matches ${pattern}: "${text.match(pattern)?.[0]}"`);
  }
});

test('the contact form does not use a real client name as an example', () => {
  const html = renderToStaticMarkup(React.createElement(App, { initialPath: PAGE_PATHS.contact }));
  assert.ok(!/placeholder="[^"]*McDonald/i.test(html));
});
