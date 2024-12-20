import HomeIcon from "@/public/assets/jsx-icons/home";
import HomeOutlinedIcon from "@/public/assets/jsx-icons/home-o";
import TransactionIcon from "@/public/assets/jsx-icons/transaction";
import TransactionOutlinedIcon from "@/public/assets/jsx-icons/transaction-o";

const routes = [
  {
    path: "/settings/roles",
    name: "Roles",
    activeIcon: <HomeIcon className="fill-foreground group-hover:fill-white group-data-[current=true]:fill-white" />,
    inactiveIcon: <HomeOutlinedIcon className="stroke-foreground group-hover:stroke-white" />,
  },
  {
    path: "/settings/permissions",
    name: "Permissions",
    activeIcon: (
      <TransactionIcon className="fill-foreground group-hover:fill-white group-data-[current=true]:fill-white" />
    ),
    inactiveIcon: <TransactionOutlinedIcon className="stroke-foreground group-hover:stroke-white" />,
  },
];

export default routes;
