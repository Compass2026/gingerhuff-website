import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { PAGE_PATHS, pageMetadata, resolveRoute } from './routing';
import { BLOG_POSTS } from './content/articles';
export const paths = [...Object.values(PAGE_PATHS), ...BLOG_POSTS.map(post => `/${post.slug}/`)];
export function render(path: string) {const {article, service} = resolveRoute(path); return {html:renderToString(<App initialPath={path}/>), ...pageMetadata(path), article, service};}
export { SERVICE_PAGES } from './content/service-pages';
