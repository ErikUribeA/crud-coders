import { CoderService } from "@/services/coders.service";
import CoderTable from "./coders/CodersTable";
import Link from "next/link";

const useCoderService = new CoderService()

export default async function Home() {
  const data = await useCoderService.findAll()

  return (
    <>
      <Link href="/newCoder" >Create New Coder</Link>
      <CoderTable data={data} />
    </>
  );
}
