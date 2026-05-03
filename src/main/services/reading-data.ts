// IELTS-style reading passages with comprehension questions
// Format: B1-C1 difficulty, 300-700 words each, 5-8 questions per passage

export type ReadingQuestion = {
  type: 'multiple-choice' | 'true-false-notgiven' | 'fill-in-blank'
  question: string
  options?: string[]
  answer: string
  explanation: string
}

export type ReadingPassage = {
  id: string
  title: string
  cefrLevel: 'B1' | 'B2' | 'C1'
  topic: string
  estimatedMinutes: number
  text: string
  questions: ReadingQuestion[]
}

export const readingPassages: ReadingPassage[] = [
  {
    id: 'sleep-science',
    title: 'The Science of Sleep',
    cefrLevel: 'B1',
    topic: 'Health & Science',
    estimatedMinutes: 15,
    text: `Sleep is one of the most important activities for human health, yet many people do not get enough of it. Scientists have studied sleep for decades and have discovered that it plays a crucial role in memory, learning, and physical recovery.

When we sleep, our brain goes through several stages. The first stage is light sleep, when we can still be easily woken up. The second stage is deeper, and our heart rate slows down. The third stage is the deepest sleep, when the body repairs itself and grows new tissue. Finally, there is REM sleep, when most dreaming happens. During REM sleep, our brain is almost as active as when we are awake.

Most adults need between seven and nine hours of sleep each night. However, recent surveys show that about one in three adults regularly gets less than six hours. This lack of sleep can have serious consequences. People who don't sleep enough have a higher risk of heart disease, diabetes, and depression. They also have more accidents at work and on the road.

Children need even more sleep than adults. A teenager, for example, needs about nine to ten hours every night. Sleep is especially important for young people because it helps the brain develop and store new information learned during the day.

Some simple habits can improve sleep quality. Going to bed at the same time every night helps the body create a regular rhythm. Avoiding screens before bedtime is also important, because the blue light from phones and tablets can confuse the brain into thinking it is still daytime. A cool, dark, and quiet bedroom is ideal for sleep.

Despite knowing all of this, many people still struggle with sleep. Stress at work, busy family lives, and the constant temptation of entertainment all make it harder to switch off. Yet experts agree that prioritising sleep is one of the best things we can do for our long-term health.`,
    questions: [
      { type: 'multiple-choice', question: 'According to the passage, how much sleep do most adults need?', options: ['5-6 hours', '7-9 hours', '9-10 hours', '10-12 hours'], answer: '7-9 hours', explanation: 'The text states "Most adults need between seven and nine hours of sleep each night."' },
      { type: 'true-false-notgiven', question: 'During REM sleep, the brain is less active than when awake.', options: ['True', 'False', 'Not given'], answer: 'False', explanation: 'The text says "our brain is almost as active as when we are awake."' },
      { type: 'multiple-choice', question: 'What happens during the third (deepest) stage of sleep?', options: ['We dream the most', 'The body repairs itself', 'Heart rate increases', 'We are easily woken'], answer: 'The body repairs itself', explanation: '"The third stage is the deepest sleep, when the body repairs itself and grows new tissue."' },
      { type: 'true-false-notgiven', question: 'Children need less sleep than adults.', options: ['True', 'False', 'Not given'], answer: 'False', explanation: '"Children need even more sleep than adults."' },
      { type: 'multiple-choice', question: 'Why are screens before bedtime a problem?', options: ['They are too noisy', 'They use too much energy', 'Blue light tricks the brain', 'They are addictive'], answer: 'Blue light tricks the brain', explanation: '"the blue light from phones and tablets can confuse the brain into thinking it is still daytime."' },
      { type: 'true-false-notgiven', question: 'Coffee is mentioned as a cause of poor sleep.', options: ['True', 'False', 'Not given'], answer: 'Not given', explanation: 'Coffee is not mentioned in the passage at all.' },
      { type: 'fill-in-blank', question: 'About one in three adults regularly gets less than ___ hours of sleep.', answer: 'six', explanation: '"about one in three adults regularly gets less than six hours."' },
    ],
  },
  {
    id: 'rise-of-cycling',
    title: 'The Rise of Cycling in Cities',
    cefrLevel: 'B2',
    topic: 'Urban Life & Transport',
    estimatedMinutes: 18,
    text: `Over the past two decades, cycling has experienced a remarkable revival in cities around the world. Once seen as a hobby for sports enthusiasts or a last resort for those who could not afford a car, the bicycle has now become a serious mode of urban transport. From Copenhagen to Bogotá, city planners are redesigning streets to accommodate two-wheeled commuters.

The reasons for this transformation are diverse. Concerns about air pollution and climate change have made many people reconsider how they move around their cities. Cars, trucks and motorcycles produce huge amounts of carbon dioxide and other harmful gases, and they contribute significantly to global warming. Bicycles, by contrast, produce no emissions whatsoever.

Health is another major motivation. Cycling regularly burns calories, strengthens the heart and reduces the risk of several chronic diseases. A study published in the British Medical Journal found that people who cycle to work have a 41 percent lower risk of dying from any cause compared to those who drive. The benefits are not just physical: cyclists also report lower levels of stress and improved mental wellbeing.

Yet despite these advantages, cycling is not without its challenges. In many cities, infrastructure remains inadequate. Cyclists are often forced to share narrow roads with fast-moving traffic, which can be dangerous, particularly for inexperienced riders. The number of cycling fatalities, although low overall, has been rising in some cities as bicycle usage grows.

Forward-thinking governments are responding by investing heavily in dedicated cycling infrastructure. Copenhagen, often cited as the gold standard, has built over 400 kilometres of protected bike lanes. The city now has more bicycles than cars, and roughly half of all journeys to work or school are made by bike. Other cities, including Paris and London, are following suit, with ambitious plans to expand their bike networks substantially.

The economic case for cycling is also compelling. Bike infrastructure is far cheaper to build and maintain than roads or public transport networks. Studies in several European cities have shown that businesses on streets with good cycling access often see increased customer numbers, contradicting the common assumption that drivers spend more.

Of course, cycling is not a complete solution to urban transport problems. It works best for short to medium journeys, and is less practical for the elderly, those with disabilities, or in areas with extreme weather. However, when combined with public transport and pedestrian-friendly design, the bicycle can play a central role in creating healthier, cleaner and more liveable cities.`,
    questions: [
      { type: 'multiple-choice', question: 'According to the passage, how was cycling perceived in the past?', options: ['As an elite sport only', 'As a hobby or last resort transport', 'As the main form of transport', 'As dangerous and impractical'], answer: 'As a hobby or last resort transport', explanation: '"Once seen as a hobby for sports enthusiasts or a last resort for those who could not afford a car..."' },
      { type: 'true-false-notgiven', question: 'Bicycles produce a small amount of carbon emissions.', options: ['True', 'False', 'Not given'], answer: 'False', explanation: '"Bicycles, by contrast, produce no emissions whatsoever."' },
      { type: 'fill-in-blank', question: 'According to a study, cyclists who commute to work have a ___ percent lower risk of dying.', answer: '41', explanation: '"a 41 percent lower risk of dying from any cause compared to those who drive."' },
      { type: 'multiple-choice', question: 'What is described as the "gold standard" for cycling infrastructure?', options: ['Paris', 'London', 'Bogotá', 'Copenhagen'], answer: 'Copenhagen', explanation: '"Copenhagen, often cited as the gold standard, has built over 400 kilometres of protected bike lanes."' },
      { type: 'true-false-notgiven', question: 'Cycling-friendly streets reduce business activity.', options: ['True', 'False', 'Not given'], answer: 'False', explanation: '"businesses on streets with good cycling access often see increased customer numbers, contradicting the common assumption..."' },
      { type: 'multiple-choice', question: 'According to the passage, cycling is LESS suitable for which group?', options: ['Young commuters', 'Office workers', 'The elderly and disabled', 'Tourists'], answer: 'The elderly and disabled', explanation: '"is less practical for the elderly, those with disabilities, or in areas with extreme weather."' },
      { type: 'true-false-notgiven', question: 'Cycling fatalities have decreased in all cities.', options: ['True', 'False', 'Not given'], answer: 'False', explanation: '"The number of cycling fatalities... has been rising in some cities as bicycle usage grows."' },
      { type: 'fill-in-blank', question: 'In Copenhagen, roughly ___ of all journeys to work or school are made by bike.', answer: 'half', explanation: '"roughly half of all journeys to work or school are made by bike."' },
    ],
  },
  {
    id: 'language-extinction',
    title: 'Languages on the Edge',
    cefrLevel: 'C1',
    topic: 'Linguistics & Culture',
    estimatedMinutes: 22,
    text: `Of the approximately 7,000 languages spoken in the world today, linguists estimate that around half will have ceased to exist by the end of the century. This staggering loss represents not merely the disappearance of words and grammatical structures, but the erosion of unique systems for organising and understanding human experience.

The mechanisms driving language extinction are largely socio-economic. As communities become integrated into national economies, parents increasingly recognise that their children's prospects depend on fluency in dominant languages such as English, Mandarin or Spanish. Indigenous languages are consequently passed on with diminishing regularity, until eventually the chain of intergenerational transmission is broken altogether. Within two or three generations, a language that was spoken fluently by an entire community can vanish almost without trace.

This process is not unprecedented. Throughout history, languages have risen and fallen with the political fortunes of their speakers. What distinguishes the current era, however, is the sheer scale and pace of language loss. Globalisation, mass media and digital communication have all accelerated linguistic homogenisation in ways that no previous technology could have achieved.

Some linguists argue that the loss of language diversity carries profound intellectual costs. Each language, they contend, embodies a particular worldview—a unique way of carving up reality. Languages encode knowledge about local ecosystems, traditional medicines, kinship relationships and aesthetic sensibilities that may have no equivalent elsewhere. When a language dies, this accumulated wisdom is often lost forever, even when communities continue to exist.

Critics of this position counter that languages are not static repositories of knowledge but living, evolving systems. Speakers shift between languages routinely, and concepts can usually be translated, even if imperfectly. Moreover, linguistic preservation initiatives, however well-intentioned, can sometimes resemble museum exhibits more than genuine acts of cultural continuity.

Despite these debates, efforts to document and revitalise endangered languages have intensified. Teams of linguists work alongside communities to record stories, songs and everyday conversations, creating archives that may one day support revival efforts. In some cases, these projects have yielded remarkable successes. Hebrew, dormant as a vernacular for nearly two millennia, was revived in the late nineteenth century and is now spoken by millions. The Maori language of New Zealand, having declined sharply through the twentieth century, has experienced a significant resurgence, supported by immersion schools and government policy.

Yet such revivals remain exceptional. For most endangered languages, the challenge is less about reversing decline than about ensuring that what remains is preserved with sufficient care to enable future generations to engage with it meaningfully, even if not as everyday speakers. The question of whether digital technology will ultimately accelerate or mitigate language loss remains open. Online communities can potentially sustain dispersed speakers; yet algorithmic platforms, optimised for content in dominant languages, may equally accelerate marginalisation of smaller ones.

What is clear is that decisions made by individual families, governments and global institutions over the coming decades will determine the linguistic shape of the twenty-second century. The choices are neither easy nor uncontroversial, but they are unavoidable.`,
    questions: [
      { type: 'multiple-choice', question: 'What proportion of world languages may disappear by 2100?', options: ['About a quarter', 'About a third', 'About half', 'Almost all'], answer: 'About half', explanation: '"around half will have ceased to exist by the end of the century."' },
      { type: 'multiple-choice', question: 'According to the passage, what is the main driver of language extinction?', options: ['Government policy', 'Technological advancement', 'Socio-economic pressures', 'War and conflict'], answer: 'Socio-economic pressures', explanation: '"The mechanisms driving language extinction are largely socio-economic."' },
      { type: 'true-false-notgiven', question: 'Language loss has always happened at the same pace as today.', options: ['True', 'False', 'Not given'], answer: 'False', explanation: '"What distinguishes the current era, however, is the sheer scale and pace of language loss."' },
      { type: 'multiple-choice', question: 'According to some linguists, what is lost when a language disappears?', options: ['Words only', 'Grammar only', 'A unique worldview and accumulated knowledge', 'Government documents'], answer: 'A unique worldview and accumulated knowledge', explanation: '"Each language, they contend, embodies a particular worldview... When a language dies, this accumulated wisdom is often lost forever."' },
      { type: 'true-false-notgiven', question: 'Critics argue language preservation is always futile.', options: ['True', 'False', 'Not given'], answer: 'False', explanation: 'Critics argue languages are evolving and concepts can be translated, but they don\'t say preservation is futile — they critique specific approaches.' },
      { type: 'multiple-choice', question: 'Which language was dormant for nearly two millennia before being revived?', options: ['Maori', 'Hebrew', 'Mandarin', 'Spanish'], answer: 'Hebrew', explanation: '"Hebrew, dormant as a vernacular for nearly two millennia, was revived in the late nineteenth century..."' },
      { type: 'true-false-notgiven', question: 'Digital technology will definitely save endangered languages.', options: ['True', 'False', 'Not given'], answer: 'False', explanation: 'The text says the impact of digital technology "remains open" — the outcome is uncertain.' },
      { type: 'fill-in-blank', question: 'Online communities can sustain dispersed speakers, yet algorithmic platforms may accelerate the ___ of smaller languages.', answer: 'marginalisation', explanation: '"algorithmic platforms... may equally accelerate marginalisation of smaller ones."' },
    ],
  },
  {
    id: 'urban-bees',
    title: 'Bees in the City',
    cefrLevel: 'B2',
    topic: 'Nature & Environment',
    estimatedMinutes: 16,
    text: `Bees might seem like creatures of meadows and forests, but in recent years they have become surprisingly common in major cities. From rooftop hives in central London to municipal apiaries in Tokyo, urban beekeeping has surged in popularity. What is more unexpected is that bees often thrive in cities — sometimes more so than in the countryside.

The reasons are paradoxical. Many rural areas, dominated by single-crop agriculture and treated heavily with pesticides, offer bees a poor diet and a hostile environment. By contrast, cities contain a remarkable variety of flowering plants in parks, gardens and balconies, providing bees with diverse nectar sources throughout the seasons. Urban areas are also slightly warmer than the surrounding countryside — a phenomenon known as the urban heat island effect — which can extend the foraging season.

Honeybees have been the main beneficiaries of this trend, partly because they are the species most often kept by hobbyist beekeepers. However, scientists warn that the rapid expansion of urban beekeeping may be having unintended consequences. Honeybees, particularly when kept in dense concentrations, can compete with wild bee species for limited floral resources. Cities are home to hundreds of species of solitary and bumblebees, many of which are already in decline. Adding too many honeybee colonies to an area can put further pressure on these wild populations.

Urban beekeepers are increasingly aware of these issues. Many now plant pollinator-friendly flowers and avoid placing hives in areas already saturated with colonies. Some cities have introduced regulations to limit the number of urban hives or require beekeepers to register and follow best practices. London, for instance, has guidelines suggesting that beekeepers should maintain no more than a certain density of hives per square kilometre.

Despite these challenges, the rise of urban beekeeping has had clear benefits. It has raised public awareness about the importance of pollinators, encouraged people to plant more flowers, and provided opportunities for community engagement. School programmes that include beekeeping have been particularly successful in inspiring young people to think about ecology and food production.

Looking ahead, urban environments could become genuine refuges for many pollinator species — but only if planning takes their needs seriously. This means more wildflower meadows in parks, less pesticide use in public spaces, and policies that protect both honeybees and their wild relatives. Done well, the city of the future could be a place where humans and bees flourish together.`,
    questions: [
      { type: 'true-false-notgiven', question: 'Bees often do better in cities than in the countryside.', options: ['True', 'False', 'Not given'], answer: 'True', explanation: '"What is more unexpected is that bees often thrive in cities — sometimes more so than in the countryside."' },
      { type: 'multiple-choice', question: 'Why are rural areas often hostile to bees?', options: ['Too cold', 'Single-crop agriculture and pesticides', 'Too many predators', 'No water sources'], answer: 'Single-crop agriculture and pesticides', explanation: '"Many rural areas, dominated by single-crop agriculture and treated heavily with pesticides, offer bees a poor diet."' },
      { type: 'multiple-choice', question: 'What is the "urban heat island effect"?', options: ['Cities are colder than countryside', 'Cities are warmer than surrounding areas', 'Cities have more rainfall', 'Cities have less wind'], answer: 'Cities are warmer than surrounding areas', explanation: '"Urban areas are also slightly warmer than the surrounding countryside — a phenomenon known as the urban heat island effect."' },
      { type: 'true-false-notgiven', question: 'Honeybees can harm wild bee species.', options: ['True', 'False', 'Not given'], answer: 'True', explanation: '"Honeybees... can compete with wild bee species for limited floral resources."' },
      { type: 'fill-in-blank', question: 'London has guidelines on the maximum ___ of hives per square kilometre.', answer: 'density', explanation: '"London... has guidelines suggesting that beekeepers should maintain no more than a certain density of hives per square kilometre."' },
      { type: 'true-false-notgiven', question: 'School beekeeping programmes have been a failure.', options: ['True', 'False', 'Not given'], answer: 'False', explanation: '"School programmes that include beekeeping have been particularly successful in inspiring young people."' },
      { type: 'multiple-choice', question: 'What does the author suggest is needed for the future?', options: ['More honeybees', 'Less wild flowers', 'Planning that supports all pollinators', 'Banning urban beekeeping'], answer: 'Planning that supports all pollinators', explanation: '"urban environments could become genuine refuges for many pollinator species — but only if planning takes their needs seriously."' },
    ],
  },
  {
    id: 'remote-work',
    title: 'The Remote Work Revolution',
    cefrLevel: 'B2',
    topic: 'Work & Society',
    estimatedMinutes: 18,
    text: `Before 2020, working from home was rare in most industries. A small number of professionals — typically writers, designers and software developers — had long enjoyed this flexibility, but for the vast majority of office workers, the daily commute was simply a fact of life. Then, almost overnight, the global pandemic forced millions of employees to work remotely. What began as an emergency measure has transformed into one of the most significant shifts in working culture in decades.

Surveys consistently show that most workers prefer at least some remote work. The benefits are obvious: no commute means more time for family, exercise or rest. People can live further from city centres, where housing is often more affordable. Many find they can concentrate better at home, away from the constant interruptions of an open-plan office. For working parents in particular, the flexibility to manage school pickups or sick days without using vacation time has been life-changing.

Employers, however, have been more divided. Some companies have embraced remote work fully, closing their offices and investing in digital collaboration tools. They report significant savings on real estate, expanded talent pools (since they can hire from anywhere), and equal or improved productivity. Other firms, particularly in finance and law, have pushed for a full return to the office. Their concerns include the loss of spontaneous collaboration, weakened company culture, and difficulties training junior staff.

A middle path — the so-called "hybrid" model — has emerged as the most common solution. Most large employers now expect staff in the office two or three days a week, with the remainder spent working from home. This compromise attempts to capture the benefits of both arrangements, though it satisfies no one completely.

The wider effects on cities and the economy are still unfolding. Office occupancy rates in many city centres remain well below pre-pandemic levels, hurting cafés, dry cleaners and other businesses that depend on commuter traffic. Public transport authorities face revenue shortfalls. At the same time, suburbs and smaller towns have seen renewed interest, with some experiencing rapid population growth as remote workers seek more space and lower costs.

There are also concerns about inequality. Remote work is overwhelmingly available to white-collar professionals, while service workers, manufacturers and many others must continue to commute. Within remote workforces, women have sometimes reported being passed over for promotion, on the assumption that home-based workers are less committed. Junior employees, who learn most effectively through observation and informal mentorship, may find their careers slowed by reduced face-to-face contact.

What is certain is that the pre-pandemic working world is not coming back. Whether the changes underway will ultimately produce more humane workplaces or simply new forms of inequality will depend on the choices made by employers, governments and workers themselves over the next decade.`,
    questions: [
      { type: 'true-false-notgiven', question: 'Working from home was common in most industries before 2020.', options: ['True', 'False', 'Not given'], answer: 'False', explanation: '"Before 2020, working from home was rare in most industries."' },
      { type: 'multiple-choice', question: 'According to surveys, what do most workers prefer?', options: ['Full-time office work', 'Full-time remote work', 'At least some remote work', 'Different jobs entirely'], answer: 'At least some remote work', explanation: '"Surveys consistently show that most workers prefer at least some remote work."' },
      { type: 'multiple-choice', question: 'Which industries have most strongly pushed for office returns?', options: ['Tech and design', 'Finance and law', 'Education and healthcare', 'Retail and hospitality'], answer: 'Finance and law', explanation: '"Other firms, particularly in finance and law, have pushed for a full return to the office."' },
      { type: 'fill-in-blank', question: 'The most common compromise is called the "___" model.', answer: 'hybrid', explanation: '"the so-called \'hybrid\' model — has emerged as the most common solution."' },
      { type: 'true-false-notgiven', question: 'Public transport companies have benefited from remote work.', options: ['True', 'False', 'Not given'], answer: 'False', explanation: '"Public transport authorities face revenue shortfalls."' },
      { type: 'multiple-choice', question: 'What concern is raised about junior employees?', options: ['They earn less than seniors', 'They prefer working from home', 'They lose mentorship opportunities', 'They are more productive'], answer: 'They lose mentorship opportunities', explanation: '"Junior employees, who learn most effectively through observation and informal mentorship, may find their careers slowed."' },
      { type: 'true-false-notgiven', question: 'Women report being treated equally to men in remote workplaces.', options: ['True', 'False', 'Not given'], answer: 'False', explanation: '"women have sometimes reported being passed over for promotion."' },
      { type: 'multiple-choice', question: 'What does the author conclude?', options: ['Office work will fully return', 'The old way of working is gone', 'Remote work is best for everyone', 'Hybrid models will fail'], answer: 'The old way of working is gone', explanation: '"the pre-pandemic working world is not coming back."' },
    ],
  },
]

export function getPassage(id: string): ReadingPassage | null {
  return readingPassages.find((p) => p.id === id) ?? null
}
