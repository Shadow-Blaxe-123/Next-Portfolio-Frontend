export default async function fetchData<T>(
  url: string,
  tags: string[],
  key: string // 👈 tells which nested data to extract
): Promise<T | undefined> {
  try {
    const res = await fetch(url, {
      next: { tags },
    });

    if (!res.ok) throw new Error(`Failed to fetch ${key}`);

    const json = await res.json();

    // Safely return nested data
    return json.data?.[key] as T;
  } catch (err) {
    console.error(err);
  }
}
