import { getCompanion } from "@/lib/actions/compnaion.actions";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { getSubjectColor } from "@/lib/utils";

interface CompanionSessionProps {
  params: Promise<{
    id: string;
  }>;
}



const CompanionSession = async ({ params }: CompanionSessionProps) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();

  const { name, subject, title, topic, duration } = companion;

  if (!user) redirect('/sign-in');
  if (!companion) redirect('/companions');

  return (
    <main>
      <article className="flex rounded-border justify-between p-6 max-sm:flex-col">
        <div className="flex items-center gap-2">
          <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden" style={{ backgroundColor: getSubjectColor(subject) }}>
            <img src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p>
                {name}
              </p>
              <div className="subject-badge max-sm:hidden">
                {subject}
              </div>
            </div>
            <p className="text-lg">{topic}</p>
          </div>
        </div>
        <div className="item-start text-2xl max-md:hidden">
          {duration} minutes
        </div>
      </article>
    </main>
  )

}

export default CompanionSession
