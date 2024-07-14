"use server";
export default async function getTranslation(
  from: string | undefined,
  to: string,
  text: string
): Promise<string> {
  try {
    return (
      await (
        await fetch(process.env.LTS + "/translate", {
          method: "POST",
          body: JSON.stringify({
            q: text,
            source: from,
            target: to,
          }),
          headers: { "Content-Type": "application/json" },
        })
      ).json()
    ).translatedText;
  } catch (error) {
    alert(error);
    return getTranslation(from, to, text);
  }
}
