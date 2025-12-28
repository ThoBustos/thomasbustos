// src/data/books.js

export const BOOKS = [
  // Business
  {
    id: "hard-thing-about-hard-things",
    title: "The Hard Thing About Hard Things",
    author: "Ben Horowitz",
    cover: "/img/books/the_hard_thing_about_hard_things.jpg",
    tags: ["startups", "leadership", "management"],
    category: "Business",
    status: "read",
    isFavorite: true,
    year: 2014
  },
  {
    id: "zero-to-one",
    title: "Zero to One",
    author: "Peter Thiel",
    cover: "/img/books/Zero_to_One.jpg",
    tags: ["startups", "innovation"],
    category: "Business",
    status: "read",
    isFavorite: false,
    year: 2014
  },
  {
    id: "lean-startup",
    title: "The Lean Startup",
    author: "Eric Ries",
    cover: "/img/books/Lean_Startup.png",
    tags: ["startups", "methodology", "entrepreneurship"],
    category: "Business",
    status: "read",
    isFavorite: false,
    year: 2011
  },
  {
    id: "traction",
    title: "Traction",
    author: "Gabriel Weinberg",
    cover: "/img/books/TRACTION.jpg",
    tags: ["startups", "growth", "marketing"],
    category: "Business",
    status: "read",
    isFavorite: false,
    year: 2015
  },
  {
    id: "who",
    title: "Who: The A Method for Hiring",
    author: "Geoff Smart & Randy Street",
    cover: "/img/books/WHO.jpg",
    tags: ["hiring", "management", "leadership"],
    category: "Business",
    status: "read",
    isFavorite: false,
    year: 2008
  },
  {
    id: "sell-more-faster",
    title: "Sell More Faster",
    author: "Amos Schwartzfarb",
    cover: "/img/books/sell_more_faster.jpg",
    tags: ["sales", "startups", "techstars"],
    category: "Business",
    status: "read",
    isFavorite: true,
    year: 2019
  },
  {
    id: "7-powers",
    title: "7 Powers",
    author: "Hamilton Helmer",
    cover: "/img/books/7_powers.jpg",
    tags: ["strategy", "business", "moats"],
    category: "Business",
    status: "read",
    isFavorite: false,
    year: 2016
  },
  // Mind
  {
    id: "poor-charlies-almanack",
    title: "Poor Charlie's Almanack",
    author: "Charlie Munger",
    cover: "/img/books/poor_charlie's_almanack.jpg",
    tags: ["investing", "mental-models", "wisdom"],
    category: "Mind",
    status: "read",
    isFavorite: false,
    year: 2005
  },
  {
    id: "reality-transurfing",
    title: "Reality Transurfing",
    author: "Vadim Zeland",
    cover: "/img/books/reality_transurfing.jpg",
    tags: ["consciousness", "manifestation", "reality"],
    category: "Mind",
    status: "read",
    isFavorite: false,
    year: 2004
  },
  {
    id: "unlimited-power",
    title: "Unlimited Power",
    author: "Tony Robbins",
    cover: "/img/books/unlimited_power.jpg",
    tags: ["self-improvement", "nlp", "mindset"],
    category: "Mind",
    status: "read",
    isFavorite: false,
    year: 1986
  },
  // Philosophy
  {
    id: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    cover: "/img/books/meditations.jpg",
    tags: ["stoicism", "philosophy", "wisdom"],
    category: "Philosophy",
    status: "read",
    isFavorite: false,
    year: 180
  },
  {
    id: "human-all-too-human",
    title: "Human, All Too Human",
    author: "Friedrich Nietzsche",
    cover: "/img/books/human_all_too_human.jpg",
    tags: ["philosophy", "nihilism", "morality"],
    category: "Philosophy",
    status: "read",
    isFavorite: false,
    year: 1878
  },
  {
    id: "treatise-on-toleration",
    title: "Treatise on Toleration",
    author: "Voltaire",
    cover: "/img/books/treatise_on_toleration.jpg",
    tags: ["philosophy", "enlightenment", "tolerance"],
    category: "Philosophy",
    status: "read",
    isFavorite: false,
    year: 1763
  },
  {
    id: "meditations-on-first-philosophy",
    title: "Meditations on First Philosophy",
    author: "Rene Descartes",
    cover: "/img/books/meditations_on_first_philosophy.jpg",
    tags: ["philosophy", "rationalism", "metaphysics"],
    category: "Philosophy",
    status: "read",
    isFavorite: false,
    year: 1641
  },
  {
    id: "origin-of-species",
    title: "The Origin of Species",
    author: "Charles Darwin",
    cover: "/img/books/the_origin_of_species.jpg",
    tags: ["evolution", "science", "biology"],
    category: "Philosophy",
    status: "read",
    isFavorite: false,
    year: 1859
  },
  {
    id: "social-contract",
    title: "The Social Contract",
    author: "Jean-Jacques Rousseau",
    cover: "/img/books/the_social_contract.jpg",
    tags: ["philosophy", "politics", "society"],
    category: "Philosophy",
    status: "read",
    isFavorite: false,
    year: 1762
  },
  {
    id: "little-book-of-stoicism",
    title: "The Little Book of Stoicism",
    author: "Jonas Salzgeber",
    cover: "/img/books/the_little_book_of_stoicism.jpg",
    tags: ["stoicism", "philosophy", "self-improvement"],
    category: "Philosophy",
    status: "read",
    isFavorite: false,
    year: 2019
  }
];

export const BOOK_CATEGORIES = [
  "All",
  "Mind",
  "AI & Tech",
  "Business",
  "Philosophy",
  "Favorites"
];
