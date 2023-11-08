export const cookie = {
  get(key: string): string | undefined {
    return new Map(
      document.cookie
        .split("; ")
        .map((cookie) => cookie.trim().split("=", 2) as [string, string])
    ).get(key);
  },

  set(key: string, value: string, options?: { maxAge?: number }) {
    const { maxAge } = options ?? {};
    let cookie = `${key}=${value}; path=/; samesite=strict`;
    if (window.location.protocol === "https:") cookie += "; secure";
    if (maxAge !== undefined) cookie += `; max-age=${maxAge}`;
    document.cookie = cookie;
  },

  remove(key: string) {
    this.set(key, "", { maxAge: 0 });
  },
};
