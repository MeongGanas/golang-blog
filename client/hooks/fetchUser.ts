export default async function fetchUser() {
  const user = await (
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user`, {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
  ).json();

  return user;
}
