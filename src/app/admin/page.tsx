"use client";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <button
        onClick={() => router.push("/admin/users-table")}
        className="bg-green-500 rounded-lg text-white border-none px-2 py-1 cursor-pointer "
      >
        See Table
      </button>
    </div>
  );
};

export default Page;
