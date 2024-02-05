import {
  HomeIcon,
  DocumentDuplicateIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";


// Map of links to display in the side navigation.
const links = [
  { name: "Mocks", href: "/mocksDashboard", icon: HomeIcon },
  {
    name: "Probes",
    href: "/mocksDashboard/probes",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Profile",
    href: "/mocksDashboard/profile",
    icon: UserCircleIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              `flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3`,
              {
                "bg-sky-100": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
