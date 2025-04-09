import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isAuthenticated } from '@/lib/authenticate';
import { useAtom } from 'jotai';
import { favouritesAtom, searchHistoryAtom } from '@/store';
import { getFavourites, getHistory } from '@/lib/userData';

export default function RouteGuard({ children }) {
  const { pathname, push } = useRouter();
  const [, setFavourites] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  useEffect(() => {
    const publicPaths = ["/login", "/register"];
    const pathIsPublic = publicPaths.includes(pathname);

    if (!isAuthenticated() && !pathIsPublic) {
      push("/login");
    } else {
      // ✅ Move async function inside useEffect to avoid dependency warning
      const updateAtoms = async () => {
        setFavourites(await getFavourites());
        setSearchHistory(await getHistory());
      };
      updateAtoms();
    }
  }, [pathname, push, setFavourites, setSearchHistory]);

  return children;
}
