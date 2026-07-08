const data = {
  overview: {
    title: "Acepyr: An Optimization Imperative",
    tagline: "The Behavioral Economy, Optimized by You",
    description:
      "Acepyr is a behavioral economy platform where players compete, earn, and trade on an open network. It is built on the principles of meritocracy — 100% merit-based with zero founder allocation.",
    mission: "Preserve human cognition through optimized economic games.",
  },

  vectors: {
    title: "Vectors — The Core Games",
    description: "Three core games that form the foundation of the behavioral economy.",
    games: [
      {
        name: "Hive",
        description:
          "A collective optimization game where players coordinate to solve complex challenges.",
      },
      {
        name: "Oracle",
        description:
          "A prediction and foresight game where players forecast outcomes and earn based on accuracy.",
      },
      {
        name: "Krypt",
        description:
          "A strategy and cryptography game focused on secure optimization and discovery.",
      },
    ],
  },

  playerStack: {
    title: "Player Stack — Progression Layer",
    description:
      "The progression layer that compounds how you play. Three core components:",
    components: [
      {
        name: "Traits",
        description:
          "Unique player attributes that define your playstyle and strengths within the ecosystem.",
      },
      {
        name: "Nodes",
        description:
          "Infrastructure points that players operate to support the network and earn rewards.",
      },
      {
        name: "Guilds",
        description:
          "Player collectives that collaborate, compete, and share rewards within the economy.",
      },
    ],
  },

  token: {
    name: "$ACEPYR",
    description:
      "The testnet token of the Acepyr ecosystem. Earned through play, non-transferable, and weighted by quality.",
    details: [
      "Earned by playing the core games (Hive, Oracle, Krypt)",
      "Non-transferable — cannot be bought or sold",
      "Weighted by quality — better performance earns more tokens",
      "Serves as the testnet token for the behavioral economy",
    ],
  },

  stats: {
    totalAcepyrians: "8,000+",
    waitlist: "25,000+",
    meritocracy: "100%",
    founderAllocation: "0",
    description:
      "Acepyr has over 8,000 total Acepyrians, a waitlist of 25,000+, operates on 100% meritocracy with zero founder allocation.",
  },

  faq: [
    {
      q: "What is Acepyr?",
      a: "Acepyr is a behavioral economy platform where players compete, earn, and trade on an open network. It is built on the principle of meritocracy.",
      tags: ["acepyr overview", "what is acepyr", "explain acepyr"],
    },
    {
      q: "How do I join Acepyr?",
      a: "You can sign up at https://www.acepyr.com and join the waitlist for early access.",
      tags: ["join", "signup", "register", "waitlist", "get started"],
    },
    {
      q: "What is the $ACEPYR token?",
      a: "$ACEPYR is the testnet token. It is earned through play, non-transferable, and weighted by quality of play. It cannot be bought or sold.",
      tags: ["token", "$acepyr", "currency"],
    },
    {
      q: "Is there a founder allocation?",
      a: "No, there is zero founder allocation. Acepyr is 100% meritocratic — every token is earned through gameplay.",
      tags: ["founder", "allocation", "meritocracy"],
    },
    {
      q: "What games does Acepyr have?",
      a: "Three core games: Hive (collective optimization), Oracle (prediction and foresight), and Krypt (strategy and cryptography).",
      tags: ["games", "vectors", "hive", "oracle", "krypt"],
    },
    {
      q: "What are Vectors?",
      a: "Vectors are the core games of the behavioral economy: Hive, Oracle, and Krypt. Each game tests a different skill set.",
      tags: ["vectors", "core games"],
    },
    {
      q: "What is the Player Stack?",
      a: "The Player Stack is the progression layer with Traits (player attributes), Nodes (infrastructure points), and Guilds (player collectives).",
      tags: ["player stack", "progression", "traits", "nodes", "guilds"],
    },
    {
      q: "Is $ACEPYR transferable?",
      a: "No, $ACEPYR is non-transferable. It is earned through gameplay and cannot be traded or sold.",
      tags: ["transferable", "trade", "sell", "buy"],
    },
    {
      q: "How many Acepyrians are there?",
      a: "Over 8,000 total Acepyrians with 25,000+ on the waitlist.",
      tags: ["stats", "acepyrians", "community size", "members"],
    },
    {
      q: "What is the mission of Acepyr?",
      a: "To preserve human cognition through optimized economic games.",
      tags: ["mission", "purpose", "goal"],
    },
  ],
};

function search(query) {
  const q = query.toLowerCase().trim();
  const words = q.split(/\s+/).filter((w) => w.length > 3);
  const stopWords = ["what", "about", "tell", "that", "this", "with", "from", "have", "does"];

  const results = [];

  for (const item of data.faq) {
    let score = 0;

    const tagMatch = item.tags.some((t) => q.includes(t));
    if (tagMatch) score += 10;

    const sigWords = words.filter((w) => !stopWords.includes(w));
    const qWords = item.q.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
    const wordMatch = sigWords.length > 0 && qWords.some((w) => sigWords.includes(w));
    if (wordMatch) score += 6;

    if (score > 0) {
      results.push({ q: item.q, a: item.a, score });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

module.exports = { data, search };
