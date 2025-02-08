export const order = {
    name: "order",
    type: "document",
    title: "Orders",
    fields: [
      {
        name: "user",
        type: "string",
        title: "User Name",
      },
      {
        name: "email",
        type: "string",
        title: "User Email",
      },
      {
        name: "products",
        type: "array",
        title: "Ordered Products",
        of: [{ type: "reference", to: [{ type: "products" }] }],
      },
      {
        name: "totalPrice",
        type: "number",
        title: "Total Price",
      },
      {
        name: "status",
        type: "string",
        title: "Order Status",
        options: {
          list: [
            { title: "Pending", value: "pending" },
            { title: "Shipped", value: "shipped" },
            { title: "Delivered", value: "delivered" },
          ],
        },
        initialValue: "pending",
      },
      {
        name: "createdAt",
        type: "datetime",
        title: "Order Date",
        initialValue: new Date().toISOString(),
      },
    ],
  };
  