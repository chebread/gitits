import { useEffect } from '../utils/util.js';

const f = (cb, deps) => useEffect(cb, deps);
export default f;
