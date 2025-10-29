import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

import {
  getUserCompanions,
  getUserSessions,
  getBookmarkedCompanions,
} from "../../lib/actions/companion.actions";
import CompanionsList from "@/components/CompanionsList";
const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect('/sign-in');

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);

  return (
    <main className="min-lg:w-3/4">
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <Image
          src={user.imageUrl || "/default-profile.png"}
          alt={user.firstName || "User Profile"}
          width={100}
          height={100}
          className="rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-sm text-muted-foreground">
            {user.emailAddresses[0]?.emailAddress}
          </p>

        </div>
        <div className="flex gap-4">
          <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 item-center">
              <img src="/icons/check.svg" alt="checkmark" width={20} height={20} />
              <p className="font-bold text-lg">{sessionHistory.length}</p>
            </div>
            <p className="text-sm text-muted-foreground">Lessons Completed</p>
          </div>

          <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
            <div className="flex gap-2 item-center">
              <img src="/icons/cap.svg" alt="cap" width={20} height={20} />
              <p className="font-bold text-lg">{companions.length}</p>
            </div>
            <p className="text-sm text-muted-foreground">Companion Created</p>
          </div>
        </div>
       
      </section>
       <Accordion type="multiple">
          <AccordionItem value="recent">
            <AccordionTrigger className="text-2xl font-bold">Recent Sessions</AccordionTrigger>
            <AccordionContent>
             <CompanionsList title="Recent Sessions" companions={sessionHistory.flat()} />
            </AccordionContent>
          </AccordionItem>

           <AccordionItem value="companions">
            <AccordionTrigger className="text-2xl font-bold">My Companions {`(${companions.length})`}</AccordionTrigger>
            <AccordionContent>
             <CompanionsList title="My Companions" companions={companions} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

    </main>
  )
}

export default Profile