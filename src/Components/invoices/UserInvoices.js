import { FaRegFileAlt } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

export default function UserInvoices({invoices}) {

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="w-full max-w-[85vw] mx-auto p-4">
      <div className="flex items-center gap-2 mb-6">
        <FaRegFileAlt className="w-5 h-5 text-gray-600" />
        <h2 className="text-xl font-semibold text-gray-700">Invoices</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-3  font-medium text-gray-600">
                Invoice ID
              </th>
              <th className="py-3  font-medium text-gray-600">Type</th>
              <th className="py-3  font-medium text-gray-600">price</th>
              <th className="py-3  font-medium text-gray-600">Status</th>
              <th className="py-3  font-medium text-gray-600">
                Created At
              </th>
              <th className="py-3  font-medium text-gray-600">Image</th>
              <th className="py-3  font-medium text-gray-600">Payment</th>
            </tr>
          </thead>
          <tbody>
            {invoices?.data?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No invoices found.
                </td>
              </tr>
            ) : (
              invoices?.data?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="text-left py-3 ">
                    <a
                      href={`${invoice.invoice}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {invoice.id}
                    </a>
                  </td>
                  <td className="py-3 text-left text-gray-600">
                    {invoice.invoiceType}
                  </td>
                  <td className="text-left py-3">
                    <span
                      className={`font-medium ${invoice?.price < 0 ? "text-red-600" : "text-gray-900"}`}
                    >
                      {invoice?.price < 0 ? "-" : ""}$
                      {Math.abs(invoice?.price).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </td>
                  <td className="text-left py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${getStatusColor(invoice.status)}`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="text-left py-3 text-gray-600">
                    {new Date(invoice.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="text-left py-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={invoice.invoice}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IoEyeOutline className="w-4 h-4" />
                        View
                      </a>
                    
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
