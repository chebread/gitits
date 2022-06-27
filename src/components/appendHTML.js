const appendHTML = (content, targetElement) => {
  targetElement.insertAdjacentHTML('beforeend', content); // targetelement안의 마지막 요소
};

export default appendHTML;
