/** srcset for an optimized /images/*.webp file: the 640px phone copy plus the full file at its real width. */
export const imageSrcSet = (src: string, width: number) => `${src.replace(/\.webp$/, '-640.webp')} 640w, ${src} ${width}w`;
