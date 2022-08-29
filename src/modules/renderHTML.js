const renderHTML = (content, targetElement) => {
  targetElement.innerHTML = '';
  targetElement.insertAdjacentHTML('afterBegin', content); // element 안에 가장 첫번째 child
};

export default renderHTML;
