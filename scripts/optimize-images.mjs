import sharp from 'sharp';
import {readdir,mkdir,stat} from 'node:fs/promises';
await mkdir('public/images',{recursive:true});
let before=0,after=0;
for(const file of await readdir('src/assets/images')){
 if(!file.endsWith('.png'))continue;
 const source=`src/assets/images/${file}`,target=`public/images/${file.replace('.png','.webp')}`;
 await sharp(source).resize({width:1400,withoutEnlargement:true}).webp({quality:82}).toFile(target);
 // Smaller copy for phones; pages pick it through srcset (see src/images.ts).
 await sharp(source).resize({width:640,withoutEnlargement:true}).webp({quality:80}).toFile(target.replace('.webp','-640.webp'));
 before+=(await stat(source)).size;after+=(await stat(target)).size;
}
console.log(`Optimized images: ${(before/1024/1024).toFixed(2)} MB → ${(after/1024/1024).toFixed(2)} MB`);
