export function fetchDataAndFilter(data: { title?: string }[], keyword: string) {
    if (!Array.isArray(data) || !keyword) return [];
  
    return data.filter(
      (item) =>
        item.title &&
        item.title.toLowerCase().includes(keyword.toLowerCase())
    );
  }
  