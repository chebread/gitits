import renderHTML from '../components/renderHTML.js';
import useState from '../components/useState.js';

const innerContent = () => {
  const [v, setV] = useState([1]);
  renderHTML(
    `
    <br/>
    <div>[${v}] is inner value</div>
    <button id="innerChange">inner value change</button>
  `,
    document.querySelector('#inner')
  );

  document.querySelector('#innerChange').addEventListener('click', e => {
    setV([...v, v.length + 1]);
  });
};

export default innerContent;
