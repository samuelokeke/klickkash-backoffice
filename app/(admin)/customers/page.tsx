import React from "react";
import axios from "@/config/axios.config";
import CustomerList from "./CustomerList";

const Customers = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin//customers`);

  const customers = response.data?.data;

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
