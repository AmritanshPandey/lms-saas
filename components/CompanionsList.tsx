// components/CompanionsList.tsx
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";

type Companion = {
  id: string;
  subject?: string;
  name?: string;
  topic?: string;
  duration?: number | string;
};

interface CompanionsListProps {
  title?: string;
  companions?: Companion[];
  classNames?: string;
}
const CompanionsList = ({ title, companions = [], classNames }: CompanionsListProps) => {
  return (
    <article className={cn('companion-list', classNames)}>
      <h2 className="font-bold text-3xl">{title}</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3">Lessons</TableHead>
            <TableHead className="text-lg">Subject</TableHead>
            <TableHead className="text-lg text-right">Duration</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {companions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3}>No recent sessions</TableCell>
            </TableRow>
          ) : (
            companions.map((item) => {
              if (!item || !item.id) return null; // guard malformed items

              const { id, subject, name, topic, duration } = item;
              const iconSrc = subject ? `/icons/${subject}.svg` : "/icons/default.svg";

              return (
                <TableRow key={id}>
                  <TableCell>

                    <Link href={`/companions/${id}`} className="flex items-center gap-4">
                      <div
                        className="w-[72px] h-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                        style={{ backgroundColor: getSubjectColor(subject ?? "")}}
                      >

                        <img
                          src={iconSrc}
                          alt={subject ?? "subject"}
                          width={35}
                          height={35}
                          style={{ display: "block" }}
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <p className="font-bold text-2xl">{name ?? "Unnamed"}</p>
                        <p className="text-lg text-muted-foreground">{topic ?? "—"}</p>
                      </div>
                    </Link>
                  </TableCell>

                  <TableCell>
                    <div className="subject-badge w-fit max-md:hidden">{subject ?? "—"}</div>

                    {/* small circular icon for mobile */}
                    <div
                      className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden"
                      style={{ backgroundColor: getSubjectColor(subject ?? "") }}
                    >
                      <img src={iconSrc} alt={subject ?? "subject"} width={18} height={18} />
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 w-full justify-end">
                      <p className="text-2xl">
                        {duration ?? "—"}{' '} <span className="max-md:hidden">mins</span>
                      </p>

                      <img
                        src="/icons/clock.svg"
                        alt="minutes"
                        width={14}
                        height={14}
                        className="md:hidden"
                        style={{ display: "block" }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionsList;