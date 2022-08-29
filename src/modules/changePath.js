const changePath = path => {
  if (!(path === window.location.pathname)) {
    const url = window.location.origin + path;
    window.history.pushState(null, null, url);
  }
};

export default changePath;
