const fetch = require('node-fetch');
const fs = require('fs');

(async () => {

  var result = await fetch('https://your-domain.com/notion-todo-items').then((res) => res.json());

  if (result.hasChange && result.imageUrl) {
    const res = await fetch(result.imageUrl);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync('/Users/username/Pictures/Notion To-do Wallpaper/wallpaper.png', buffer);
    fs.writeFileSync('/Users/username/Pictures/Notion To-do Wallpaper/wallpaper copy.png', buffer);
    console.log(`imageUrl: ${result.imageUrl}`);
  } else {
    console.log('no new wallpaper')
  }
})();