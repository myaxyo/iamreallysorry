import type { Locale } from "../dictionaries";

export interface SeoPage {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  tips: string[];
  faq: { q: string; a: string }[];
  cta: string;
  relatedSlugs: string[];
}

// English programmatic SEO pages
const EN_PAGES: SeoPage[] = [
  {
    slug: "apology-to-girlfriend",
    h1: "Create an Apology Page for Your Girlfriend",
    metaTitle: "Apology to Girlfriend — Create a Funny Sorry Page Free [2026]",
    metaDescription: "Make your girlfriend smile with a personalized apology website. 3D animations, meme sounds, and a No button she can't click. Free and instant.",
    intro: "You messed up with your girlfriend and a boring text won't cut it. Create an interactive apology page with her name, 3D hearts, dramatic music, and a No button that literally runs away. It's the funniest way to say sorry and impossible to stay mad at.",
    tips: [
      "Use her actual name for maximum personalization",
      "Send the link when emotions have cooled down (not mid-argument)",
      "Tell her to turn up the volume for the sad violin effect",
      "The No button is impossible to click — she'll have to forgive you",
      "Follow up with real actions to back up the apology",
    ],
    faq: [
      { q: "How do I apologize to my girlfriend after a fight?", a: "Acknowledge what you did wrong specifically, take responsibility without excuses, and do something creative. An interactive apology page shows effort and makes her laugh — the fastest way to break post-fight tension." },
      { q: "What makes this better than a text message?", a: "Text messages are easy to ignore. An apology website with her name in 3D, meme sounds, and an impossible-to-click No button is unexpected, personal, and shows you actually tried." },
      { q: "Is this free?", a: "Yes, completely free. No signup, no hidden fees. Just enter her name and share the link." },
      { q: "Will she actually forgive me?", a: "We can't guarantee forgiveness, but we CAN guarantee she'll laugh. And laughter after a fight is step one to making up." },
    ],
    cta: "Create Her Apology Page Now",
    relatedSlugs: ["apology-to-partner", "sorry-for-forgetting", "sorry-for-argument"],
  },
  {
    slug: "apology-to-boyfriend",
    h1: "Create an Apology Page for Your Boyfriend",
    metaTitle: "Apology to Boyfriend — Create a Funny Sorry Page Free [2026]",
    metaDescription: "Apologize to your boyfriend with a personalized interactive page. 3D animations, vine boom sounds, and a runaway No button. Free instant apology.",
    intro: "You messed up and your boyfriend is giving you the silent treatment. Skip the 'I'm sorry' text he's going to leave on read. Create an interactive apology page with his name, over-the-top animations, meme sounds, and a No button that physically runs away from his finger.",
    tips: [
      "Guys appreciate humor — the meme sounds will get him",
      "The vine boom when the sorry meter breaks is *chef's kiss*",
      "Send it and let him open it on his own time",
      "The runaway No button works on mobile too (touch support)",
      "Follow up the link with genuine communication",
    ],
    faq: [
      { q: "How do I say sorry to my boyfriend?", a: "Be direct, own your mistake, and do something unexpected. An interactive apology page is funny, personal, and shows you actually put in effort beyond a text." },
      { q: "What if he's really mad?", a: "Give him space first. Send the link when he's calmer — the humor works best when the initial anger has passed. The page is designed to make people laugh." },
      { q: "Can I customize it?", a: "Yes! His name appears throughout the page in personalized sections. Choose the language he speaks for full localization." },
      { q: "Is this cringe?", a: "It's intentionally over-the-top — that's what makes it funny. The vine boom sound and runaway button are designed to be so dramatic he can't help but laugh." },
    ],
    cta: "Create His Apology Page Now",
    relatedSlugs: ["apology-to-partner", "sorry-for-being-distant", "sorry-for-argument"],
  },
  {
    slug: "apology-to-friend",
    h1: "Create an Apology Page for Your Friend",
    metaTitle: "Apology to Friend — Create a Funny Sorry Page Free [2026]",
    metaDescription: "Apologize to your friend with a hilarious interactive page. 3D heart, meme sounds, and a No button they can't press. Free and shareable.",
    intro: "Friendships matter and you don't want to lose yours over a stupid mistake. Whether you forgot plans, said something you shouldn't have, or were a terrible friend lately — this interactive apology page is the perfect icebreaker. It's funny, dramatic, and impossible to stay mad at.",
    tips: [
      "Works great in group chats — send the link and let everyone roast you",
      "The airhorn on forgiveness is peak friend energy",
      "Perfect for when you've been a flaky friend",
      "They can share it with the whole friend group for maximum entertainment",
      "Use it to break the ice after an awkward silence",
    ],
    faq: [
      { q: "How do I apologize to a friend I hurt?", a: "Acknowledge what happened, don't make excuses, and break the tension with something unexpected. Sending a personalized apology page shows you care while keeping things light." },
      { q: "Is this appropriate for a serious situation?", a: "It works best for everyday friend conflicts — cancelled plans, said something dumb, been distant. For very serious situations, pair it with a genuine conversation." },
      { q: "Can they share it?", a: "Yes! The link is shareable. If they send it to the group chat, you'll become a legend for your dramatic apology skills." },
      { q: "What if we haven't talked in a while?", a: "That's actually the perfect scenario. The page breaks the ice without requiring a long awkward text. Send the link as your opening move." },
    ],
    cta: "Create Their Apology Page Now",
    relatedSlugs: ["apology-to-partner", "sorry-for-being-distant", "sorry-for-forgetting"],
  },
  {
    slug: "apology-to-partner",
    h1: "Create an Apology Page for Your Partner",
    metaTitle: "Apology to Partner — Interactive Sorry Page Generator [2026]",
    metaDescription: "Make your partner smile with a personalized apology website. Works for any relationship. 3D animations, sounds, and a runaway No button. Free.",
    intro: "Whether you've been together 3 months or 30 years, everyone messes up sometimes. Create an interactive apology page that's personalized with your partner's name, features 3D animations, dramatic sound effects, and a No button that makes forgiveness the only option. Because sometimes you need more than words.",
    tips: [
      "Works for any relationship — married, dating, long-distance",
      "Choose their language for a fully localized experience",
      "The sorry meter breaking past 100% always gets a reaction",
      "Send it as a surprise after giving them space to cool down",
      "Combine with a real conversation for maximum impact",
    ],
    faq: [
      { q: "How do I apologize to my partner effectively?", a: "A good apology has three parts: acknowledging what you did, showing you understand the impact, and proving you'll change. This page handles the creative gesture — you handle the rest." },
      { q: "Does it work for married couples?", a: "Absolutely. Married couples especially appreciate the humor after years of 'I'm sorry' texts. The over-the-top drama is the point." },
      { q: "Can I use it for long-distance relationships?", a: "Perfect for long-distance! Send the link anywhere in the world. It works on any device and in 11 languages." },
      { q: "Is it appropriate for serious arguments?", a: "It's designed to break tension and make someone smile. Use it after the initial heat has passed. For serious ongoing issues, also communicate directly." },
    ],
    cta: "Create Your Partner's Apology Now",
    relatedSlugs: ["apology-to-girlfriend", "apology-to-boyfriend", "sorry-for-argument"],
  },
  {
    slug: "apology-to-wife",
    h1: "Create an Apology Page for Your Wife",
    metaTitle: "Apology to Wife — Funny Interactive Sorry Page [2026]",
    metaDescription: "Say sorry to your wife with a personalized apology website she'll actually enjoy. 3D heart, dramatic music, and a No button she can't click. Free.",
    intro: "Happy wife, happy life — and right now, she's not happy. You know what you did (or maybe you don't, which is worse). Either way, create a personalized apology page that's so over-the-top dramatic she'll forget why she was mad and start laughing instead.",
    tips: [
      "The sad violin background music adds maximum guilt atmosphere",
      "Her name in 3D shows you put in more effort than usual",
      "Works great as a surprise after she's had time to cool down",
      "The 'reasons I'm sorry' section hits different when personalized",
      "Follow up with actually doing the dishes without being asked",
    ],
    faq: [
      { q: "How do I apologize to my wife after a big fight?", a: "Give her space, reflect on what went wrong, then surprise her with something creative. An apology website shows effort, self-awareness, and humor — three things she'll appreciate." },
      { q: "What if she's been mad for days?", a: "Send the link without explanation. The dramatic 3D heart and meme sounds will catch her off guard. Humor breaks through walls that repeated 'sorry' texts can't." },
      { q: "Can I send this on our anniversary if I forgot?", a: "You can, but we recommend ALSO getting flowers. The website is the icebreaker, not the entire apology for forgetting your anniversary. You monster." },
      { q: "Does it work on mobile?", a: "Fully responsive — the runaway No button works with touch on phones and tablets. She can try to tap No all she wants." },
    ],
    cta: "Create Her Apology Page Now",
    relatedSlugs: ["apology-to-girlfriend", "apology-to-partner", "sorry-for-forgetting"],
  },
  {
    slug: "apology-to-husband",
    h1: "Create an Apology Page for Your Husband",
    metaTitle: "Apology to Husband — Funny Interactive Sorry Page [2026]",
    metaDescription: "Apologize to your husband with a hilarious personalized page. 3D animations, vine boom, and a No button he can't press. Free and instant.",
    intro: "Your husband is doing that thing where he says 'it's fine' but it's clearly not fine. Time to bring out the big guns. Create a personalized apology page with his name, dramatic animations, meme sounds he'll appreciate, and a No button that physically refuses to be clicked.",
    tips: [
      "The vine boom sound effect is basically designed for husbands",
      "He'll appreciate the effort even if he pretends he doesn't",
      "Send it during his gaming session for maximum attention",
      "The airhorn on forgiveness will definitely get a reaction",
      "Follow up by admitting you were wrong out loud (the hard part)",
    ],
    faq: [
      { q: "How do I say sorry to my husband?", a: "Skip the 'sorry if you were offended' approach. Own it, make him laugh, and prove you mean it. The apology page handles the laugh part." },
      { q: "Will my husband think this is too much?", a: "The over-the-top factor IS the joke. The more dramatic, the funnier it is. Trust the vine boom." },
      { q: "What if he doesn't check his phone?", a: "Send it and say 'open this link.' The curiosity alone will get him to click. Once he hears the sound effects, he's in." },
      { q: "Is this better than cooking his favorite meal?", a: "Why not both? Send the link first as the opening act, then follow up with the food. Double apology combo." },
    ],
    cta: "Create His Apology Page Now",
    relatedSlugs: ["apology-to-boyfriend", "apology-to-partner", "sorry-for-argument"],
  },
  {
    slug: "apology-to-mom",
    h1: "Create an Apology Page for Your Mom",
    metaTitle: "Apology to Mom — Personalized Sorry Page That'll Make Her Smile",
    metaDescription: "Say sorry to your mom with a sweet interactive page. 3D heart animation and personalized with her name. Free and instant.",
    intro: "Your mom gave you life and you repaid her by being ungrateful, forgetting to call, or saying something you regret. Time to make it right with an apology so dramatic she'll go from disappointed to amused in seconds. Because nothing breaks a mom's heart AND makes her laugh quite like this.",
    tips: [
      "Moms love that you put in effort — even silly effort",
      "The 3D heart is genuinely sweet for family apologies",
      "Send it with a 'Mom, open this' text for maximum impact",
      "She'll probably show all her friends because that's what moms do",
      "Follow up with an actual phone call (she misses your voice)",
    ],
    faq: [
      { q: "How do I apologize to my mom?", a: "Sincerely and without excuses. But also — moms appreciate knowing you thought about them. Sending a personalized apology page shows you put in effort, which is what she really wants." },
      { q: "Is this too silly for a mom apology?", a: "Moms have seen everything. A little humor won't hurt — it shows personality and effort. The 3D heart is genuinely sweet too." },
      { q: "What if I forgot Mother's Day?", a: "Send this immediately. The over-the-top sorry meter breaking past 100% is appropriate for forgetting Mother's Day. Then call her." },
      { q: "Can I use this for my dad too?", a: "Absolutely! It works for anyone. Just enter their name and the whole page is personalized." },
    ],
    cta: "Create Mom's Apology Page Now",
    relatedSlugs: ["apology-to-family", "sorry-for-forgetting", "apology-to-friend"],
  },
  {
    slug: "apology-to-family",
    h1: "Create an Apology Page for a Family Member",
    metaTitle: "Apology to Family — Personalized Interactive Sorry Page [2026]",
    metaDescription: "Say sorry to a family member with a personalized apology website. Works for parents, siblings, or relatives. 3D animations and humor. Free.",
    intro: "Family forgives but they don't forget. Whether you skipped a family event, said something at dinner you shouldn't have, or have been MIA for too long — this interactive apology page is the perfect way to break the ice. It's personal, it's funny, and it shows you actually thought about them.",
    tips: [
      "Works for siblings, parents, grandparents, cousins — anyone",
      "The humor breaks tension that's been building for weeks",
      "Great for long-distance family you can't apologize to in person",
      "Family group chat will love it (or roast you for it — both wins)",
      "Multiple languages available if your family speaks different ones",
    ],
    faq: [
      { q: "How do I apologize to a family member?", a: "Family conflicts are tricky because they have history. Start with something light to break the ice — like a funny apology page — then follow up with a real conversation." },
      { q: "What about family members I haven't spoken to in months?", a: "Perfect use case. Sending an unexpected funny apology link is less intimidating than a long text or phone call. It opens the door." },
      { q: "Does it work for siblings?", a: "Siblings are the ideal audience. The meme sounds and over-the-top drama match sibling energy perfectly." },
      { q: "Can I send one to the family group chat?", a: "You can! The name in the link personalizes it, but sharing the concept in a group chat works as a group apology too." },
    ],
    cta: "Create Their Apology Page Now",
    relatedSlugs: ["apology-to-mom", "apology-to-friend", "sorry-for-being-distant"],
  },
  {
    slug: "apology-to-coworker",
    h1: "Create an Apology Page for a Coworker",
    metaTitle: "Apology to Coworker — Fun Way to Say Sorry at Work [2026]",
    metaDescription: "Apologize to a coworker with a lighthearted personalized page. Break workplace tension with humor. 3D animations and interactive fun. Free.",
    intro: "You made things awkward at work. Maybe you threw them under the bus in a meeting, forgot to credit their work, or just said something tone-deaf on Slack. An apology page is the perfect mix of sincere and funny — enough to acknowledge the mistake without making it weirder.",
    tips: [
      "Perfect for Slack DMs — just drop the link",
      "Light enough for workplace relationships, funny enough to break tension",
      "The runaway No button gets laughs in any context",
      "Good for remote teams who can't apologize face-to-face",
      "Won't get you in trouble with HR (we checked)",
    ],
    faq: [
      { q: "Is this appropriate for a work setting?", a: "It's lighthearted and fun — appropriate for casual workplace relationships. For formal situations (like with your boss), use your judgment on the relationship dynamic." },
      { q: "Can I send this to my boss?", a: "If you have a casual relationship with your boss and they appreciate humor, yes! The page is clean and office-appropriate. The sounds are muted by default." },
      { q: "What if they don't think it's funny?", a: "The page is sincere at its core — personalized with their name and full of genuine apology content. Even if the humor doesn't land, the effort shows." },
      { q: "Is this better than just saying sorry in person?", a: "For minor workplace things (forgot to reply, was snippy in a meeting), a funny link can be less awkward than a formal sit-down. For bigger issues, pair it with a real conversation." },
    ],
    cta: "Create Their Apology Page Now",
    relatedSlugs: ["apology-to-friend", "sorry-for-forgetting", "sorry-for-being-distant"],
  },
  {
    slug: "sorry-for-forgetting",
    h1: "Apologize for Forgetting Something Important",
    metaTitle: "Sorry I Forgot — Apology Page for Forgetting Dates & Plans [2026]",
    metaDescription: "Forgot a birthday, anniversary, or plans? Create a dramatic apology page that says sorry with 3D animations and humor. Free and instant.",
    intro: "You forgot. An anniversary. A birthday. Plans you definitely agreed to. The milk. Whatever it was, the person you forgot is NOT happy. Create an interactive apology page that's so dramatic it communicates just how sorry you are — with a sorry meter that breaks past 100% because regular sorry doesn't cover this level of failure.",
    tips: [
      "The sorry meter overflowing is perfect for 'I forgot' situations",
      "Send it before they bring it up again for maximum impact",
      "The 'solemn promises' section works great for 'I'll set reminders'",
      "Pair with actually setting the reminder this time",
      "Works for forgotten birthdays, anniversaries, dates, appointments",
    ],
    faq: [
      { q: "I forgot our anniversary — how do I apologize?", a: "A dramatic gesture helps. Create a personalized apology page showing you know you messed up, then actually make up for it with a rescheduled celebration. The page buys you time and goodwill." },
      { q: "Is forgetting really that bad?", a: "Forgetting communicates 'you're not important enough to remember.' That's what you're apologizing for — not the event itself, but what forgetting implies. The page helps show you DO care." },
      { q: "What if I always forget things?", a: "We can't fix your memory, but we CAN make your apology memorable. Send the page, then actually set up calendar reminders, phone alarms, and sticky notes. Prove you're trying." },
      { q: "Can I use this for forgetting to reply to a text?", a: "Yes! Forgetting to reply for days/weeks is a modern classic. The over-the-top apology page for something 'small' is part of the comedy." },
    ],
    cta: "Create Your 'I Forgot' Apology Now",
    relatedSlugs: ["apology-to-girlfriend", "apology-to-wife", "apology-to-friend"],
  },
  {
    slug: "sorry-for-argument",
    h1: "Apologize After a Stupid Argument",
    metaTitle: "Sorry After an Argument — Make Up With a Funny Apology Page [2026]",
    metaDescription: "Had a dumb fight? Create an interactive apology page to break the tension. 3D animations, meme sounds, and a No button that runs away. Free.",
    intro: "Every couple and every friendship has dumb arguments. The kind where you wake up the next day and think 'what were we even fighting about?' If you're the one who needs to wave the white flag first, this interactive apology page is your peace offering — dramatic enough to acknowledge the fight, funny enough to end it.",
    tips: [
      "Don't send it DURING the argument — wait for the cool-down period",
      "The humor signals 'I'm done fighting, let's move on'",
      "The runaway No button = 'you can't stay mad at me forever'",
      "Perfect for when you were both wrong but you're apologizing first",
      "The solemn promises section lets you add what you'll do better",
    ],
    faq: [
      { q: "How long should I wait after a fight to apologize?", a: "At least 1-4 hours for emotions to settle. If it was a big fight, maybe overnight. Send the apology page when you're both calm enough to appreciate humor." },
      { q: "What if it was their fault?", a: "Being the first to extend an olive branch isn't admitting you were wrong — it's showing the relationship matters more than being right. The page makes it fun, not heavy." },
      { q: "Is humor appropriate after a serious fight?", a: "It depends. For everyday arguments (chores, plans, minor disagreements), humor breaks tension perfectly. For trust issues or deep hurts, pair the page with a genuine conversation." },
      { q: "What if they're still angry?", a: "The page doesn't require an immediate response. Send it as a gesture and let them come to you when ready. The runaway No button will make them smile even if they're not ready to forgive yet." },
    ],
    cta: "Create Your Post-Fight Apology Now",
    relatedSlugs: ["apology-to-partner", "apology-to-girlfriend", "apology-to-boyfriend"],
  },
  {
    slug: "sorry-for-being-distant",
    h1: "Apologize for Being Distant or Unavailable",
    metaTitle: "Sorry for Being Distant — Apology Page for Being MIA [2026]",
    metaDescription: "Been distant, unresponsive, or emotionally unavailable? Create a personalized apology page that says 'I'm back and I'm sorry.' Free.",
    intro: "You ghosted. Not on purpose (maybe), but the result is the same — someone important to you feels forgotten. Whether you've been buried in work, going through something, or just bad at texting back, this apology page says 'I know I disappeared, I'm sorry, and you matter to me' in the most dramatic way possible.",
    tips: [
      "Perfect for when a simple 'hey sorry I've been MIA' feels too weak",
      "The 3D heart communicates 'you still matter to me'",
      "Works for friends, family, partners — anyone you've neglected",
      "Great for reconnecting after weeks or months of silence",
      "Follow up by actually being present (the hard part)",
    ],
    faq: [
      { q: "How do I apologize for being distant?", a: "Acknowledge the gap directly — don't pretend it didn't happen. Something unexpected (like a personalized apology page) shows you thought about them specifically, which is what they need to hear." },
      { q: "What if it's been months?", a: "The longer the silence, the more dramatic the apology should be. A sorry meter that breaks past 100%? That's months-of-silence energy." },
      { q: "Is being distant really worth apologizing for?", a: "Yes. When someone you care about goes quiet, it hurts. Acknowledging that you know you were absent validates their feelings." },
      { q: "What if I was going through something personal?", a: "You don't owe anyone an explanation for your mental health. But acknowledging you were absent and that it affected them shows emotional maturity. The page does this with humor." },
    ],
    cta: "Create Your 'I'm Back' Apology Now",
    relatedSlugs: ["apology-to-friend", "apology-to-partner", "apology-to-family"],
  },
  {
    slug: "sorry-for-lying",
    h1: "Apologize for Lying or Breaking Trust",
    metaTitle: "Sorry for Lying — Rebuild Trust With a Genuine Apology [2026]",
    metaDescription: "Broke someone's trust? Start rebuilding with a personalized, heartfelt apology page. Shows genuine remorse with interactive elements. Free.",
    intro: "Trust is hard to earn and easy to break. If you lied — whether a white lie that snowballed or something bigger — the first step is showing you know the weight of what you did. This apology page won't fix everything, but it shows you're willing to put in effort, be vulnerable, and start the conversation.",
    tips: [
      "This should be the FIRST step, not the only step",
      "The sincerity of the page comes through in the personalization",
      "Send it with a message like 'I know I need to earn this back'",
      "Follow up with complete honesty going forward",
      "Actions after the apology matter more than the apology itself",
    ],
    faq: [
      { q: "Can an apology page fix broken trust?", a: "No single gesture can. But it shows you're willing to be vulnerable and put in effort. Trust is rebuilt through consistent actions over time — the page is just your opening statement." },
      { q: "What if they won't open the link?", a: "That's okay. Give them time. The link doesn't expire. When they're ready to hear you out, it'll be there." },
      { q: "Is humor appropriate when trust is broken?", a: "The page is warm and heartfelt at its core. The humor is gentle — the point is to show you care, not to joke away a serious situation." },
      { q: "How do I actually rebuild trust?", a: "Consistency, transparency, and time. No shortcuts. The apology page shows you acknowledge the problem — what you do after determines if trust comes back." },
    ],
    cta: "Create Your Apology Page Now",
    relatedSlugs: ["apology-to-partner", "apology-to-girlfriend", "apology-to-boyfriend"],
  },
  {
    slug: "sorry-for-being-rude",
    h1: "Apologize for Being Rude or Insensitive",
    metaTitle: "Sorry for Being Rude — Apology Page for Hurtful Words [2026]",
    metaDescription: "Said something rude or insensitive? Create a personalized apology page that says sorry with humor and heart. Free and instant.",
    intro: "Words hurt. Whether you were rude to a friend, snapped at a partner, or said something insensitive you immediately regretted — the damage is done and 'I was just joking' isn't going to fix it. Create an apology page that shows you know your words had impact and you actually care about making it right.",
    tips: [
      "The 'I know what I did wrong' section addresses being rude perfectly",
      "Humor works here because it shows self-awareness",
      "Send it after giving them time to process",
      "The over-the-top drama says 'I know I was out of line'",
      "Back it up by watching your words going forward",
    ],
    faq: [
      { q: "How do I apologize for something I said?", a: "Don't minimize it with 'you're too sensitive.' Acknowledge the specific thing you said, explain you understand why it hurt, and show you won't do it again. The page shows creative effort in your apology." },
      { q: "What if I said it in anger?", a: "Anger explains behavior but doesn't excuse it. Acknowledge that you lose control of your words when angry and that you're working on it. The apology shows accountability." },
      { q: "Is this good for work situations?", a: "For casual coworker relationships, yes. If you were rude to someone in a meeting or on Slack, a lighthearted apology page can break the tension." },
      { q: "What if they won't talk to me?", a: "Send the link without pressure. It communicates 'I'm sorry' without requiring them to respond before they're ready." },
    ],
    cta: "Create Your Apology Page Now",
    relatedSlugs: ["apology-to-friend", "apology-to-coworker", "sorry-for-argument"],
  },
];

// Slugs available for all locales (we generate pages for all locales using translated content patterns)
export const seoPageSlugs = EN_PAGES.map((p) => p.slug);

export function getSeoPage(locale: Locale, slug: string): SeoPage | undefined {
  // For now, English pages serve all locales with translated wrappers
  // In the future, add fully translated versions per locale
  if (locale === "en") {
    return EN_PAGES.find((p) => p.slug === slug);
  }
  // For non-English locales, return the English version (the page template handles display)
  return EN_PAGES.find((p) => p.slug === slug);
}

export function getAllSeoPages(): SeoPage[] {
  return EN_PAGES;
}
