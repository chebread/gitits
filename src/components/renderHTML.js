const renderHTML = (content, targetElement) => {
  targetElement.innerHTML = '';
  targetElement.insertAdjacentHTML('afterBegin', content);
};

export default renderHTML;
