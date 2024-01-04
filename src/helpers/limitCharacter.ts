export function limitCharacter(text: string){
  const limit = 15;
  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
}
