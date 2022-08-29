import routes from './routes.js';

const helmet = () => {
  const appendHTML = (content, targetElement) => {
    targetElement.insertAdjacentHTML('beforeend', content);
  };
  const changeContent = (tag, content) => {
    tag.setAttribute('content', content);
  };
  const options = {
    path: '',
  };
  const f = pathname => {
    const { path } = options;
    options.path = pathname;
    if (path === options.path) {
      return;
    }
    const data = {
      title: `${
        routes(pathname).title + (pathname === '/' ? '' : ' - gitits.to')
      }`,
      url:
        window.location.protocol +
        '//' +
        window.location.host +
        window.location.pathname,
      name: 'gitits.to',
      description: 'gitits is easily view git commits pushed to github.',
    };
    const { url, title, name, description } = data;
    document.title = title;
    const isMeta = document.querySelector('meta[property="og:type"]');
    if (isMeta === null) {
      const staticContent = `
        <meta property="og:type" content="website">
        <meta property="og:description" content="${description}">
        <meta property="og:site_name" content="${name}">
        <meta property="og:locale" content="en_US">
        <meta property="og:image" content="https://github.githubassets.com/images/modules/open_graph/github-logo.png">
        <meta property="og:image:type" content="image/png">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="1200">
        <meta property="og:url" content="${url}"> 
        <meta property="og:title" content="${title}"> 
        <meta property="twitter:site" content="${name}">
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="${title}">
        <meta property="twitter:description" content="${description}">
        <meta property="twitter:image:src" content="https://github.githubassets.com/images/modules/open_graph/github-logo.png">
        <meta property="twitter:image:width" content="1200">
        <meta property="twitter:image:height" content="1200">
      `;
      appendHTML(staticContent, document.querySelector('head'));
    } else {
      const ogTags = {
        desc: document.querySelector('meta[property="og:description"]'),
        url: document.querySelector('meta[property="og:url"]'),
        title: document.querySelector('meta[property="og:title"]'),
      };
      const twitterOgTags = {
        title: document.querySelector('meta[property="twitter:title"]'),
        desc: document.querySelector('meta[property="twitter:description"]'),
      };
      changeContent(ogTags.desc, description);
      changeContent(ogTags.url, url);
      changeContent(ogTags.title, title);
      changeContent(twitterOgTags.title, title);
      changeContent(twitterOgTags.desc, description);
    }
  };
  return f;
};
const f = helmet();
export default f;
