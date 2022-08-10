import { useEffect } from './util.js';

const f = (cb, deps) => useEffect(cb, deps);
export default f;
