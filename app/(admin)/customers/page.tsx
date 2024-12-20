import React from "react";
import CustomerList from "./CustomerList";
import { getCustomers } from "./actions";

const Customers = async () => {
  const response = await getCustomers();

  const customers = response.data;

  return (
    <div className="p-6 bg-background">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Customers</h1>
        <p className="text-sm text-muted-foreground">Manage your customers and their personal informations</p>
      </div>

      <CustomerList data={customers} />
    </div>
  );
};

export default Customers;
