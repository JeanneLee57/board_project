import Image from "next/image";
import { Member } from "@/app/about/page";

export default function MemberCard({ member }: { member: Member }) {
  return (
    <li className="flex flex-col items-center w-80 mb-12">
      <Image
        key={member.id}
        src={member.img}
        alt="멤버 이미지"
        width={100}
        height={100}
        className="rounded-full drop-shadow-md"
      />
      <h4 className="text-lg font-semibold my-4 text-lg">{member.name}</h4>
      <p className="my-3">{member.intro}</p>
      <ul className="list-disc">
        {member.career.map((el) => (
          <li key={el}>{el}</li>
        ))}
      </ul>
    </li>
  );
}
