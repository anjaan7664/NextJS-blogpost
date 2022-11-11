import PageDataEdit from "@/components/admin/PageDataEdit";
import PostApprove from "@/components/admin/PostApproval";
import UsersAdmin from "@/components/admin/UsersAdmin";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();
  const routeName = router.query.route;
  return (
    <div className="flex">
      <div className="flex flex-col h-screen p-3 bg-white shadow w-60">
        <div className="space-y-3">
          <div className="flex items-center">
            <h2 className="text-xl font-bold">Dashboard</h2>
          </div>
          <div className="flex-1">
            <ul className="pt-2 pb-4 space-y-1 text-sm">
              <li className="rounded-sm">
                <Link href="/admin/all_users">
                  <a className="flex items-center p-2 space-x-3 rounded-md">
                    <span>All Users</span>
                  </a>
                </Link>
              </li>
              <li className="rounded-sm">
                <Link href="/admin/verify_post">
                  <a className="flex items-center p-2 space-x-3 rounded-md">
                    <span>Verify Posts</span>
                  </a>
                </Link>
              </li>
              <li className="rounded-sm">
                <button
                  id="dropdownDefault"
                  data-dropdown-toggle="dropdown"
                  className="flex items-center p-2 space-x-3 rounded-md"
                  type="button"
                >
                  Edit Pages
                </button>
                <div
                  id="dropdown"
                  className=" z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefault"
                  >
                    <li>
                      <Link href="/admin/edit_pages?link_name=about_us">
                        <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          About Us
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/edit_pages?link_name=privacy_policy">
                        <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Privacy Policy
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/admin/edit_pages?link_name=terms_of_service">
                        <a className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Terms Of Service
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        {routeName === "all_users" && <UsersAdmin />}
        {routeName === "verify_post" && <PostApprove />}
        {routeName === "edit_pages" && (
          <PageDataEdit pageName={router.query.link_name as string} />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
