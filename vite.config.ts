import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { AWARDS, MENU, PRESS_QUOTES, RESTAURANT } from './src/data/restaurant';
import { weeklyHoursRows } from './src/lib/hours';

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/*
  The app is client rendered, so without this the first HTML a crawler or a visitor with
  blocked scripts receives is an empty div. This writes the restaurant's facts, the hours and
  the whole menu into that div at build time, straight from the same data the app renders.
  React clears the container when it mounts, so nobody sees it twice.
*/
function seoShellMarkup(): string {
  const hours = weeklyHoursRows()
    .map((row) => `<dt>${escape(row.days)}</dt><dd>${escape(row.hours)}</dd>`)
    .join('');

  const menu = MENU.map(
    (section) => `<section>
        <h3>${escape(section.title)} <span lang="th">${escape(section.thai)}</span></h3>
        ${section.note ? `<p>${escape(section.note)}</p>` : ''}
        <ul>${section.dishes
          .map(
            (dish) =>
              `<li><strong>${escape(dish.name)}</strong>${
                dish.thai ? ` <span lang="th">${escape(dish.thai)}</span>` : ''
              }. ${escape(dish.description)}</li>`
          )
          .join('')}</ul>
      </section>`
  ).join('');

  const awards = AWARDS.map(
    (award) => `<li><a href="${escape(award.href)}">${escape(award.source)} ${escape(award.title)}</a>, ${escape(award.years)}</li>`
  ).join('');

  const quotes = PRESS_QUOTES.map(
    (item) =>
      `<blockquote><p>${escape(item.quote)}</p><footer><a href="${escape(item.href)}">${escape(item.source)}</a></footer></blockquote>`
  ).join('');

  return `<style>
      /*
        Styles for the shell only. Scoped by id so they beat the reset, and thrown away with
        the shell when React mounts. This is what a visitor with scripts off actually reads.
      */
      .js #seo-shell { visibility: hidden; }
      #seo-shell { max-width: 46rem; margin: 0 auto; padding: 2.5rem 1.25rem 4rem; color: #2a1a11;
        font-family: "Kanit", system-ui, sans-serif; font-weight: 300; line-height: 1.6; }
      #seo-shell h1 { margin: 0 0 1rem; font-family: "Pridi", Georgia, serif; font-weight: 700;
        font-size: 2.25rem; line-height: 1.1; }
      #seo-shell h2 { margin: 2.5rem 0 0.75rem; font-family: "Pridi", Georgia, serif; font-weight: 700; font-size: 1.75rem; }
      #seo-shell h3 { margin: 1.75rem 0 0.5rem; font-family: "Pridi", Georgia, serif; font-weight: 600; font-size: 1.25rem; }
      #seo-shell p, #seo-shell address { margin: 0 0 0.75rem; font-style: normal; }
      #seo-shell ul { margin: 0; padding-left: 1.15rem; list-style: disc; }
      #seo-shell li { margin-bottom: 0.4rem; }
      #seo-shell dl { display: grid; grid-template-columns: auto 1fr; gap: 0.25rem 1.5rem; margin: 0; }
      #seo-shell dt { font-weight: 500; }
      #seo-shell dd { margin: 0; }
      #seo-shell a { color: #9a3f10; }
      #seo-shell blockquote { margin: 0 0 1rem; font-family: "Pridi", Georgia, serif; font-size: 1.15rem; }
    </style>
    <div id="seo-shell">
      <h1>${escape(RESTAURANT.name)}</h1>
      <p>Thai street food on Calle Ocho. Chef Bas cooks his grandfather’s recipes from Ayutthaya
      on a hot wok in ${escape(RESTAURANT.neighborhood)}. No reservations, and each table orders once.</p>
      <address>${escape(RESTAURANT.street)}, ${escape(RESTAURANT.city)}.
        <a href="${escape(RESTAURANT.phoneHref)}">${escape(RESTAURANT.phone)}</a></address>
      <p><a href="${escape(RESTAURANT.orderUrl)}">Order online</a> ·
        <a href="${escape(RESTAURANT.instagram)}">Instagram</a></p>
      <h2>Hours</h2>
      <dl>${hours}</dl>
      <h2>Menu</h2>
      <p>Prices, and anything sold out today, are on the ordering page.</p>
      ${menu}
      <h2>Awards</h2>
      <ul>${awards}</ul>
      <h2>Word of mouth</h2>
      ${quotes}
    </div>`;
}

function seoShell(): Plugin {
  return {
    name: 'lungyai-seo-shell',
    transformIndexHtml(html) {
      return html.replace('<div id="root"></div>', `<div id="root">${seoShellMarkup()}</div>`);
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoShell()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
