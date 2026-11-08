export type JournalPage = {
  id: number
  kind: 'welcome' | 'about' | 'gallery' | 'journey' | 'reflection' | 'contact'
  eyebrow: string
  title: string
  body?: string
  artworks?: { title: string; category: string; description: string; file: string }[]
}

// Replace the sample text and artwork file paths with your own content.
export const pages: JournalPage[] = [
  { id: 1, kind: 'welcome', eyebrow: 'A collection of creations', title: 'Welcome, dreamer', body: 'Every piece of art begins somewhere: a thought, a feeling, a passing moment. This journal gathers a few of mine. Turn the pages and take a look around.' },
  { id: 2, kind: 'about', eyebrow: 'The artist behind the pages', title: 'A little about me', body: 'Hello! I am Jade Garcia, a coder who got given a chance to to create arts we thought. This space is a small collection of the things I have made and a little bit of story behind them.' },
  { id: 3, kind: 'about', eyebrow: 'A personal note', title: 'What inspires me', body: 'I find inspiration in everyday experiences, imagination, and the process of learning something new. I enjoy experimenting, making mistakes, and discovering what each artwork can teach me.' },
  { id: 4, kind: 'gallery', eyebrow: 'Chapter I · School artworks', title: 'Studies in creativity', body: 'A selection of works created through school activities and creative exercises.', artworks: [
    { title: 'School artwork 01', category: 'School artwork', description: 'Add a short note about this piece.', file: '/artworks/school-01.jpg' },
    { title: 'School artwork 02', category: 'School artwork', description: 'Add a short note about this piece.', file: '/artworks/school-02.jpg' },
  ] },
  { id: 5, kind: 'gallery', eyebrow: 'Chapter I · School artworks', title: 'Learning by making', body: 'Each project became an opportunity to practice, explore, and improve.', artworks: [
    { title: 'School artwork 03', category: 'School artwork', description: 'Add a short note about this piece.', file: '/artworks/school-03.jpg' },
    { title: 'School artwork 04', category: 'School artwork', description: 'Add a short note about this piece.', file: '/artworks/school-04.jpg' },
  ] },
  { id: 6, kind: 'gallery', eyebrow: 'Chapter I · School artworks', title: 'More from the classroom', body: 'A few more pieces from my school art collection.', artworks: [
    { title: 'School artwork 05', category: 'School artwork', description: 'Add a short note about this piece.', file: '/artworks/school-05.jpg' },
    { title: 'School artwork 06', category: 'School artwork', description: 'Add a short note about this piece.', file: '/artworks/school-06.jpg' },
  ] },
  { id: 7, kind: 'gallery', eyebrow: 'Chapter II · Personal artworks', title: 'Beyond the assignment', body: 'Personal creations give me room to follow my curiosity and make something simply because I want to.', artworks: [
    { title: 'Personal artwork 01', category: 'Personal artwork', description: 'Add a short note about this piece.', file: '/artworks/personal-01.jpg' },
    { title: 'Personal artwork 02', category: 'Personal artwork', description: 'Add a short note about this piece.', file: '/artworks/personal-02.jpg' },
  ] },
  { id: 8, kind: 'gallery', eyebrow: 'Chapter II · Personal artworks', title: 'Made in my own time', body: 'A final glimpse into the ideas I have explored independently.', artworks: [
    { title: 'Personal artwork 03', category: 'Personal artwork', description: 'Add a short note about this piece.', file: '/artworks/personal-03.jpg' },
  ] },
  { id: 9, kind: 'journey', eyebrow: 'Looking back', title: 'My artistic journey', body: 'My creative journey is still unfolding. From early experiments to more intentional work, every project has helped me understand my interests, strengthen my skills, and become more confident in expressing ideas.' },
  { id: 10, kind: 'journey', eyebrow: 'What I have learned', title: 'Growing with every piece', body: 'I have learned that creativity takes patience. Progress comes from trying, observing, accepting feedback, and being willing to start again. I want to keep building these habits as I continue creating.' },
  { id: 11, kind: 'reflection', eyebrow: 'A page to remember', title: 'Reflection', body: 'Art gives me a way to communicate ideas that are sometimes difficult to put into words. This collection represents not only finished pieces, but also the effort, curiosity, and growth behind them. I hope to keep exploring and discovering new ways to create.' },
  { id: 12, kind: 'contact', eyebrow: 'Until the next story', title: 'Thank you for visiting', body: 'Thank you for taking the time to explore my journal. I hope you enjoyed this little collection.\n\nYou can reach me at: [your email]\nSocials: [your links]' },
]
