export const productSchema = {
  name: "product",
  type: "document",
  title: "Product",
  fields: [
    {
      name: "productId",
      type: "number",
      title: "Product Id",
    },
    {
      name: "productName",
      type: "string",
      title: "Product Name",
    },
    {
      name: "productDescription",
      type: "string",
      title: "Product Description",
    },
    {
      name: "productPrice",
      type: "number",
      title: "Product Price",
    },
    {
      name: "productStock",
      type: "number",
      title: "Product Stock-Level",
    },
    {
      name: "productCategory",
      type: "refrence",
      to: [{ type: "category" }],
      title: "Product Category",
    },
    {
      name: "productImage",
      type: "string",
      title: "Product Image",
    },
    {
      name: "productTags",
      type: "array",
      title: "Product Tags",
    },
    {
      name: "productSku",
      type: "array",
      title: "Product SKU",
    },
  ],
};

export const categorySchema = {
  name: "category",
  type: "document",
  title: "Category",
  fields: [
    {
      name: "categoryId",
      type: "number",
      title: "Category Id",
    },
    {
      name: "categoryName",
      type: "string",
      title: "Category Name",
    },
    {
      name: "categoryDescription",
      type: "text",
      title: "Category Description",
    },
  ],
};

export const customerDataSchema = {
  name: "customerData",
  type: "document",
  title: "Customer Data",
  fields: [
    {
      name: "customerId",
      type: "number",
      title: "Customer Id",
    },
    {
      name: "customerName",
      type: "string",
      title: "Customer Name",
    },
    {
      name: "customerEmail",
      type: "string",
      title: "Customer Email",
    },
    {
      name: "customerPhone",
      type: "tel",
      title: "Customer Phone",
    },
    {
      name: "customerAddress",
      type: "string",
      title: "Customer Address",
    },
  ],
};

export const orderDataSchema = {
  name: "orderData",
  type: "document",
  title: "Order Data",
  fields: [
    {
      name: "orderId",
      type: "number",
      title: "Order Id",
    },
    {
      name: "orderStatus",
      type: "Array",
      title: "Order Status",
    },
    {
      name: "orderDate",
      type: "date",
      title: "Order Date",
    },
    {
      name: "totalAmount",
      type: "number",
      title: "Total Amount",
    },
    {
      name: "customerData",
      type: "refrence",
      to: [{ type: "customerData" }],
      title: "Customer Data",
    },
    {
      name: "orderItem",
      type: "refrence",
      title: "Ordered Items",
      to: [{ type: "orderItem" }],
    },
  ],
};

export const orderItemSchema = {
  name: "orderItem",
  type: "document",
  title: "Ordered Item",
  fields: [
    {
      name: "itemId",
      type: "refrence",
      to: [{ type: "productId" }],
      title: "Item Id",
    },
    {
      name: "itemName",
      type: "refrence",
      title: "Item Name",
      to: [{ type: "productName" }],
    },
    {
      name: "itemQuantity",
      type: "number",
      title: "Item Quantity",
    },
    {
      name: "itemPrice",
      type: "refrence",
      title: "Item Price",
      to: [{ type: "productPrice" }],
    },
  ],
};

export const shipmentSchema = {
  name: "shipment",
  type: "document",
  title: "Shipment Data",
  fields: [
    {
      name: "shipmentId",
      type: "number",
      title: "Shipment Id",
    },
    {
      name: "orderId",
      type: "refrence",
      to: [{ type: "orderId" }],
      title: "Order Id",
    },
    {
      name: "shipmentStatus",
      type: "array",
      title: "Shipment Status",
    },
    {
      name: "deliveryDate",
      type: "date",
      title: "Delivery Date",
    },
  ],
};
export const deliveryZone = {
  name: "deliveryZone",
  type: "document",
  title: "Delivery Zone",
  fields: [
    {
      name: "zoneName",
      type: "string",
      title: "Zone Name",
    },
    {
      name: "coverageArea",
      type: "Array",
      title: "Coverage Area",
    },
    {
      name: "assignedDriver",
      type: "refrence",
      to: [{ type: "driverDetails" }],
      title: "Assigned Driver",
    },
  ],
};

export const driverDetails = {
  name: "driverDetails",
  type: "document",
  title: "Driver Details",
  fields: [
    {
      name: "driverId",
      type: "number",
      title: "Driver Id",
    },
    {
      name: "driverName",
      type: "string",
      title: "Driver Name",
    },
    {
      name: "driverContact",
      type: "tel",
      title: "Driver Contact",
    },
    {
      name: "driverStatus",
      type: "boolean",
      title: "Driver Status",
    },
    {
      name: "assignedZone",
      type: "refrence",
      to: [{ type: "zoneName" }],
      title: "Assigned Zone",
    },
  ],
};

