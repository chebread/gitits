import matches from './matches.js';
import notFoundPage from '../routes/notFoundPage.js';
import home from '../routes/home.js';
import content from '../routes/content.js';

const routes = path => {
  const staticRoutes = {
    '/': {
      route: home,
      title: 'gitits.to',
    },
    '/404': {
      route: notFoundPage,
      title: '404 Not found page',
    },
  };
  if (!staticRoutes[path]) {
    // 동적라우트 -> static 라우트에 선언되지 않았다면 그냥 지금의 주소를 반영한 주소를 바로 렌더링한다
    const isRedirect = matches(path.substring(1, path.length)); // staticroute는 제외하여 동적 라우트를 작동시킨다
    // console.log(isSlash, path);
    // console.log(isSlash, path.substring(1, path.length)); // 8
    if (isRedirect) {
      // 404 처리 부분 -> 동적 라우트에서 매치가 안되는 규칙이 있다면 그 라우트는 404를 반환한다
      return staticRoutes['/404'];
    } else
      return {
        ['/' + path.substring(1, path.length)]: {
          route: () =>
            content(
              window.location.pathname.substring(
                1,
                window.location.pathname.length
              )
            ), // url parameter
          title: `@${
            path.substring(1, path.indexOf('/', 1)) === '/'
              ? path.substring(1, path.length)
              : path.substring(1, path.indexOf('/', 1)) // / 가 있다면 usernmae 만 출력되게 끔 해야함
          }`,
        },
      }[path];
  } else {
    return staticRoutes[path];
  }
};
export default routes; // routes는 URL Parameter가 변경될때 마다 만드는 동적 객체입니다
