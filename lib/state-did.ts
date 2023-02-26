import { useCallback } from 'react';

import { atom, useAtom } from 'jotai';

// @ts-ignore
const DEFAULT_BUILDER: string | undefined = undefined;

let strAtom: any;
strAtom = atom(DEFAULT_BUILDER);
if (typeof window !== 'undefined') {
  strAtom = atom(
    window.localStorage.getItem('did')
      ? JSON.parse(window?.localStorage?.getItem('did'))
      : DEFAULT_BUILDER
  );
} else {
  strAtom = atom(DEFAULT_BUILDER);
}

export const didGetAndSetters = atom(
  (get) => get(strAtom),
  (get, set, newStr: Array<number>) => {
    set(strAtom, newStr);
    localStorage.setItem('did', JSON.stringify(newStr));
  }
);

export const useDID = () => {
  const [did, set] = useAtom(didGetAndSetters);
  const setdid = useCallback(
    (didNew: any) => {
      set(didNew);
    },
    [set]
  );
  return [did, setdid] as const;
};
