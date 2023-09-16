// Create an interface for the item
interface Item {
  Category: string; 
  Price: number;
}

// Create an interface for the JSON data
interface jsonData {
  Name: string;
  Price: number;
  Quantity: number;
  Category: string;
}

// Create a function to categorize the items
export function categories(items: jsonData[]): Item[] {

  const categoryMap = new Map<string, number>();// Create a map to store the category and total price

  // Loop through each item and add the price to the category
  items.forEach((item) => { 
    const { Category, Price } = item; // Destructure the item to get the category and price
    if (categoryMap.has(Category)) {
      categoryMap.set(Category, categoryMap.get(Category)! + Price);
    } else {
      categoryMap.set(Category, Price); // If the category doesn't exist, add it to the map
    }
  });

  const result: { Category: string; Price: number }[] = []; 

  // Loop through the map and add each category and price to the result array
  categoryMap.forEach((totalPrice, category) => {
    result.push({ Category: category, Price: totalPrice });
  });

  return result; // Return the result array
}
