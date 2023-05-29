export function EngtoKor(category: string) {
  return category === "frontend" ? "프론트엔드" : "백엔드";
}

export function KortoEng(category: string) {
  return category === "프론트엔드" ? "frontend" : "backend";
}
