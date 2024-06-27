"use client";
import Navbar from "@/components/navbar";
import { setUser, useUser, useUserDispatch } from "../store";
import fetchUser from "@/hooks/fetchUser";

export default function Layout({ children }: { children: React.ReactNode }) {
  const user = useUser((state) => state.user);
  const dispatch = useUserDispatch();

  if (!user) {
    (async () => {
      const fetchedUser = await fetchUser();
      dispatch(setUser(fetchedUser));
    })();
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
