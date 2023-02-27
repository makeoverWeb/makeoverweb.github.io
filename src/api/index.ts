import ky from "ky";

const api = ky.create({
  prefixUrl: "https://api.thecatapi.com/v1",
  searchParams: { limit: 10 }
});

export default async function getList(url: string) {
  try {
    const res = await api.get(url).json();

    return res;
  } catch (error) {
    return Promise.reject(error);
  }
}
