export async function fetchData(url) {
  const res = await fetch(url).then((res) => res.json());
  return res;
}
