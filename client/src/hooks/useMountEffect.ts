import { useEffect, EffectCallback } from 'react';

// eslint-disable-next-line react-hooks/exhaustive-deps
const useMountEffect = (func: EffectCallback) => useEffect(func, []);

export default useMountEffect;
