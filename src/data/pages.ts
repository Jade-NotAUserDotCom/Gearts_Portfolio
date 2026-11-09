
export type JournalPage = {
  id: number
  kind: 'welcome' | 'about' | 'gallery' | 'journey' | 'reflection' | 'contact'
  eyebrow: string
  title: string
  body?: string
  artworks?: {
    title: string
    category: string
    description: string
    file: string
  }[]
}

export const pages: JournalPage[] = [
  {
    id: 1,
    kind: 'welcome',
    eyebrow: 'A collection of creations',
    title: 'Welcome, Dreamer',
    body: 'Every piece of art begins somewhere: a thought, a feeling, a passing moment. This journal gathers a few of mine. Turn the pages and take a look around.',
  },
  {
    id: 2,
    kind: 'about',
    eyebrow: 'The artist behind the pages',
    title: 'A little about me',
    body: 'Hello! I am Jade Garcia, a coder who was given the opportunity to explore the world of art. This space is a small collection of the things I have created during my class, along with a little story behind them.',
  },
  {
    id: 3,
    kind: 'about',
    eyebrow: 'A personal note',
    title: 'What inspires me',
    body: 'I personally find inspiration in everyday experiences, imagination, and the process of learning something new. I enjoy experimenting, making mistakes, and discovering what each artwork can teach me.',
  },
  {
    id: 4,
    kind: 'gallery',
    eyebrow: 'Chapter I · School artworks',
    title: 'Studies in creativity',
    body: 'A selection of works created through school activities and creative exercises.',
    artworks: [
      {
        title: 'Screaming Inside',
        category: 'School artwork',
        description: 'Based on the original outwork, "The Scream." This artwork may be ai-generated, but it is the task given to me. I also based this on the struggles of someone inside their head, them wanting to scream and vent out, but cannot due to outside effects.',
        file: '/artworks/school/ai_artwork.jpeg',
      },
      {
        title: 'The group Artwork/Movie Analysis',
        category: 'School artwork',
        description: 'In this art, it is the front page of the powerpoint we used to analyse the movie, "Expensive Candy." It is definitely a movie worth watching',
        file: '/artworks/school/ArtAnalysis.jpeg',
      },
    ],
  },
  {
    id: 5,
    kind: 'gallery',
    eyebrow: 'Chapter I · School artworks',
    title: 'Learning by making',
    body: 'Each project became an opportunity to practice, explore, and improve.',
    artworks: [
      {
        title: 'Photocollage',
        category: 'School artwork',
        description: 'This is supposed to be a video compilation of the photos we took during that day. My apologies as I no longer have access to the video, so, in return, I just chose the photo which is the most beautiful for me, the hallway shot of us.',
        file: '/artworks/school/collage.jpeg',
      },
      {
        title: 'The Meme',
        category: 'School artwork',
        description: 'In this artpiece, I based it on the meme of the two girls fighting a cat. Very funny, whatever the context is. But then I remembered that one student always debating with our professor. And it really just pops on my mind when I made that meme.',
        file: '/artworks/school/meme.jpeg',
      },
    ],
  },
  {
    id: 6,
    kind: 'gallery',
    eyebrow: 'Chapter I · School artworks',
    title: 'More from the classroom',
    body: 'A few more pieces from my school art collection.',
    artworks: [
      {
        title: 'Hands Of Dirtiness',
        category: 'School artwork',
        description: '"Hands of Dirtiness" is an artwork I created using the layout of the art, "The Creation of Adam." The first thing that pops to my mind is the dirtiness of the hands of the poor due to dirt and grease and whatever, and the dirty hands of the rich, bloody and covered on gloves. It showcases the duality of the society, but the sameness of them, being dirty in their own ways.',
        file: '/artworks/school/Painting.jpg',
      },
      {
        title: 'White Dove from Rubble',
        category: 'School artwork',
        description: 'In this art, we were tasked to create something from unanimate objects something we thought of as beautiful. The first we thought of was a dove, the sign of peace. ',
        file: '/artworks/school/trashToTreasure.jpeg',
      },
    ],
  },
  {
    id: 7,
    kind: 'gallery',
    eyebrow: 'Chapter II · Personal artworks',
    title: 'Beyond the assignment',
    body: 'Personal creations give me room to follow my curiosity and make something simply because I want to.',
    artworks: [
      {
        title: 'Cross Stitch',
        category: 'Personal artwork',
        description: 'This is a simple cross stitch I made. I kind of like the flower of it, and when I have free time, I always look for hobbies.',
        file: '/artworks/personal/CrossStitch.jpg',
      },
      {
        title: 'This Journal',
        category: 'Personal artwork',
        description: 'This journal you are checking right now, is also another art I created, digitally now. This journal has been the record of what I can accomplish, even with low art sense.',
        file: '/artworks/personal/Journal.png',
      },
    ],
  },
  {
    id: 8,
    kind: 'gallery',
    eyebrow: 'Chapter II · Personal artworks',
    title: 'Made in my own time',
    body: 'A final glimpse into the ideas I have explored independently.',
    artworks: [
      {
        title: 'A wig',
        category: 'Personal artwork',
        description: 'This is a wig created from folder and bond papers. I made this for a play as one of the characters need it. Took me a bit of time in the curls, but alls well that ends well, I guess',
        file: '/artworks/personal/wig.jpg',
      },
    ],
  },
  {
    id: 9,
    kind: 'journey',
    eyebrow: 'Looking back',
    title: 'My artistic journey',
    body: 'Looking back on the artistic journey I had, it was quite a blast. Experimenting, creating, failing, and doing it all over again is the charm of the art. Not being able to do it so perfectly the first time is what makes the art worthwhile.',
  },
  {
    id: 10,
    kind: 'journey',
    eyebrow: 'What I have learned',
    title: 'Growing with every piece',
    body: 'I have learned that creativity takes patience. Progress comes from trying, observing, accepting feedback, and being willing to start again. I want to keep building these habits as I continue creating.',
  },
  {
    id: 11,
    kind: 'reflection',
    eyebrow: 'A page to remember',
    title: 'Reflection',
    body: 'With all of that behind me now, all I can say is that I liked the moments of creating artworks, with group or alone. I learned a lot, created a lot, and improved my whole view on art as a whole. I always say before that it doesnt matter if im good or not, now I prove that saying true. It doesnt really matter how good you are in your art, or whatever field you are in work, what matters is that you always give it your all, in everything you do, and everything will work out in the end. ALWAYS. Well, most of the time actualy hehehe.',
  },
  {
    id: 12,
    kind: 'contact',
    eyebrow: 'Until the next story',
    title: 'Thank you for visiting',
    body: 'Thank you for taking the time to explore my journal. I hope you enjoyed this little collection.\nYou can reach me at: s2023101424@gmail.com\nThanks for visiting, and until the next part of this journal. ',
  },
]
