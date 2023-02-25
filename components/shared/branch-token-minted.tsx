import { useToken } from '../../lib/state';

export function BranchTokenMinted({ children }: any) {
  const [token] = useToken();
  return token !== undefined ? children[0] : children[1];
}
