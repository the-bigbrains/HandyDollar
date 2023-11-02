// Create an interface for the item
interface Item {
  Category: string;
  Price: number;
  Name: string;
}

// Create an interface for the JSON data
interface jsonData {
  Items: {
    Name: string;
    Price: number;
    Quantity: number;
    Category: string;
  }[];
}

// Create a function to categorize the items
export function categories(test: { response: string }) {
  const receipt = JSON.parse(test.response.split("\n").join(""));

  const categoryMap = new Map<string, { total: number; names: string[] }>(); // Create a map to store the category and total price
  // Loop through each item and add the price to the category
  receipt.Items.forEach(
    (item: { Category: string; Price: number; Name: string }) => {
      const { Category, Price, Name } = item; // Destructure the item to get the category and price
      if (categoryMap.has(Category)) {
        const categoryData = categoryMap.get(Category)!; // Get the category data from the map
        categoryData.total += Price; // Add the price to the total
        categoryData.names.push(Name); // Add the name to the names array
      } else {
        categoryMap.set(Category, { total: Price, names: [Name] }); // Add the category to the map
      }
    },
  );

  const result: any[] = [];

  // Loop through the map and add each category and price to the result array
  categoryMap.forEach((totalPrice, category) => {
    result.push({
      Category: category,
      Price: totalPrice,
      Name: totalPrice.names.join(", "),
    });
  });

  return result; // Return the result array
}
