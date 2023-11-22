import './main.css';
import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect';
import persist from '@alpinejs/persist';
import focus from '@alpinejs/focus';
import Player from '@vimeo/player';

// data
// gets all the ts files in the /articles folder and returns them as an array
// const articles = import.meta.glob('./articles/*.ts');
const articles = import.meta.globEager('./articles/*.ts');
const articleContents: any[] = []; // Array to store the contents of each file

for (const modulePath in articles) {
  if (Object.prototype.hasOwnProperty.call(articles, modulePath)) {
    const module = articles[modulePath];
    articleContents.push(module ? module : null);
  }
}

const testimonies = import.meta.globEager('./testimonies/*.ts');
const testimoniesContents: any[] = []; // Array to store the contents of each file

for (const modulePath in testimonies) {
  if (Object.prototype.hasOwnProperty.call(testimonies, modulePath)) {
    const module = testimonies[modulePath];
    testimoniesContents.push(module ? module : null);
  }
}

interface BodyStore {
  lock: boolean;
  toggle(): void;
}


window.Alpine = Alpine;
(window as any).Player = Player;

// Plugins
Alpine.plugin(intersect);
Alpine.plugin(persist);
Alpine.plugin(focus);

// Data Store
Alpine.store('modalType', '');

Alpine.store('articles', articleContents);
Alpine.store('testimonies', testimoniesContents);

Alpine.store('activeArticle', {});


Alpine.store('body', {
  lock: false,

  toggle(this: BodyStore) {
    this.lock = !this.lock;
  }
});

// Start Alpine
Alpine.start();
