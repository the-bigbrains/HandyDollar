interface Item {
  Category: string; // Make sure Category is typed as a string
  Price: number;
}
interface jsonData {
  Name: string;
  Price: number;
  Quantity: number;
  Category: string;
}

export function categories(items: jsonData[]): Item[] {

  const categoryMap = new Map<string, number>();

  items.forEach((item) => {
    const { Category, Price } = item;
    if (categoryMap.has(Category)) {
      categoryMap.set(Category, categoryMap.get(Category)! + Price);
    } else {
      categoryMap.set(Category, Price);
    }
  });

  const result: { Category: string; Price: number }[] = [];

  categoryMap.forEach((totalPrice, category) => {
    result.push({ Category: category, Price: totalPrice });
  });

  return result;
}
