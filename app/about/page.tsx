import MemberCard from "@/components/MemberCard";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

export interface Member {
  id: number;
  name: string;
  img: string;
  email: string;
  github: string;
  blog: string;
  intro: string;
  career: string[];
}

const members: Member[] = [
  {
    id: 1,
    name: "김진솔",
    img: "https://avatars.githubusercontent.com/u/80370226?v=4",
    email: "wlsthf75@gmail.com",
    github: "https://github.com/jinsoul75",
    blog: "https://summerr.tistory.com/",
    intro:
      "프론트엔드 개발자로서 창의적인 솔루션을 제공하는 김진솔입니다. 다양한 프로젝트에서 동적인 웹 애플리케이션을 개발하는 데 능숙하며, React와 Vue.js 같은 프레임워크를 주로 사용합니다.",
    career: [
      "유튜브 크리에이터 '쏠킴 SOLKIM' 활동",
      "코드스테이츠 프론트엔드 부트캠프 44기 수료",
    ],
  },
  {
    id: 2,
    name: "박무생",
    img: "https://avatars.githubusercontent.com/u/124570875?s=400&u=9d5e547ecc4366c617f03a86a2936afe509edba3&v=4",
    email: "antod123@naver.com",
    github: "https://github.com/Mooobi",
    blog: "https://velog.io/@antod2981",
    intro:
      "한 걸음씩 꾸준히 성장하는 개발자가 되고 싶은 박무생입니다.\n문제 해결 과정에서 끊임없이 고민하며 결과를 도출하는 것을 좋아하고 단순히 알기보다는 경험을 통한 학습을 중요하게 생각합니다.",
    career: [
      "서울과학기술대학교 건축공학과 졸업",
      "(전)경남 거제시 건축직 지방공무원(2019-2022)",
      "코드스테이츠 프론트엔드 부트캠프 44기 수료",
    ],
  },
  {
    id: 3,
    name: "박지원",
    img: "https://avatars.githubusercontent.com/u/124653132?v=4",
    email: "ndwoo33@gmail.com",
    github: "https://github.com/Jiwonp12",
    blog: "https://studyhard-everyday.tistory.com/",
    intro: "매일 꾸준하게 성장하는 프론트엔드 개발자 박지원입니다.",
    career: [
      "[플립드러닝] 멀티미디어콘텐츠제작(영상편집&웹제작)구직자과정 수료",
      "코드스테이츠 프론트엔드 부트캠프 44기 수료",
    ],
  },
  {
    id: 4,
    name: "이진화(Jeanne)",
    img: "https://avatars.githubusercontent.com/u/122351417?v=4",
    email: "jinhwa.lee.57@gmail.com",
    github: "https://github.com/JeanneLee57",
    blog: "https://sulki.tistory.com",
    intro:
      "함께 일하고 싶은 개발자가 되고 싶은 이진화입니다. 현재에 만족하지 않고 끊임없이 새로운 것을 배우는 것에서 가장 큰 보람을 느낍니다.",
    career: ["코드스테이츠 프론트엔드 부트캠프 44기 수료"],
  },
];

export default function About() {
  return (
    <main className="mx-16">
      <h1 className="my-10">프로젝트 소개</h1>
      <p>
        이 프로젝트는 Next.js를 이용한 게시판 만들기 토이 프로젝트로, 팀원들이
        같은 주제로 <b>솔로 프로젝트</b>를 진행하며 서로 코드리뷰를 하는
        방식으로 진행되었습니다.
      </p>
      <p>진행 기간: 2023년 5월 24일 ~ 2023년 6월 9일(2주)</p>
      <h2 className="mt-10">팀원 소개</h2>
      <div className="w-full flex items-center justify-center my-12">
        <ul className="flex justify-between items-start w-120 flex-wrap">
          {members.map((member) => (
            <li key={member.id} className="flex flex-col items-center">
              <Image
                key={member.id}
                src={member.img}
                alt="멤버 이미지"
                width={130}
                height={130}
                className="rounded-full drop-shadow-md mx-4"
              />
              <h4 className="text-lg font-semibold my-4 text-xl">
                {member.name}
              </h4>
            </li>
          ))}
        </ul>
      </div>
      <ul className="my-16 w-150  divide-y divide-gray-200">
        {members.map((member) => (
          <li key={member.id} className="pt-8 pb-6">
            <h3 className="font-semibold text-lg text-indigo-900">
              {member.name}
            </h3>
            <p className="my-3">{member.intro}</p>
            <ul className="list-disc my-4">
              {member.career.map((el) => (
                <li key={el}>{el}</li>
              ))}
            </ul>
            <p className="my-1">
              <FontAwesomeIcon icon={faHouse} className="mr-1" />
              <a className="my-1 underline decoration-solid" href={member.blog}>
                {member.blog}
              </a>
            </p>
            <p className="my-1">
              <FontAwesomeIcon icon={faGithub} className="mr-1" />
              <a
                target="_blank"
                className="my-1 underline decoration-solid"
                href={member.github}
              >
                {member.github}
              </a>
            </p>
            <p className="my-1">
              <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
              {member.email}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
