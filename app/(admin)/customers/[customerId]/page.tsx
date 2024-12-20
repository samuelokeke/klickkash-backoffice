import React from "react";

type CustomerDetailsProps = {
  params: { customerId: string };
};

const CustomerDetails = ({ params }: CustomerDetailsProps) => {
  return (
    <div className="p-6 bg-background">
      <h1 className="text-xl font-semibold mb-6">Customer Details {params.customerId}</h1>
    </div>
  );
};

export default CustomerDetails;
