import { STATS } from "@/types/domain/PokemonBuild";

export const natureMap = [
  {
    "id": 1,
    "english": "hardy",
    "japanese": "がんばりや",
    "increasedStat": null,
    "decreasedStat": null,
    "likesFlavor": null,
    "hatesFlavor": null
  },
  {
    "id": 2,
    "english": "bold",
    "japanese": "ずぶとい",
    "increasedStat": "def",
    "decreasedStat": "atk",
    "likesFlavor": "sour",
    "hatesFlavor": "spicy"
  },
  {
    "id": 3,
    "english": "modest",
    "japanese": "ひかえめ",
    "increasedStat": "spa",
    "decreasedStat": "atk",
    "likesFlavor": "dry",
    "hatesFlavor": "spicy"
  },
  {
    "id": 4,
    "english": "calm",
    "japanese": "おだやか",
    "increasedStat": "spd",
    "decreasedStat": "atk",
    "likesFlavor": "bitter",
    "hatesFlavor": "spicy"
  },
  {
    "id": 5,
    "english": "timid",
    "japanese": "おくびょう",
    "increasedStat": "spe",
    "decreasedStat": "atk",
    "likesFlavor": "sweet",
    "hatesFlavor": "spicy"
  },
  {
    "id": 6,
    "english": "lonely",
    "japanese": "さみしがり",
    "increasedStat": "atk",
    "decreasedStat": "def",
    "likesFlavor": "spicy",
    "hatesFlavor": "sour"
  },
  {
    "id": 7,
    "english": "docile",
    "japanese": "すなお",
    "increasedStat": null,
    "decreasedStat": null,
    "likesFlavor": null,
    "hatesFlavor": null
  },
  {
    "id": 8,
    "english": "mild",
    "japanese": "おっとり",
    "increasedStat": "spa",
    "decreasedStat": "def",
    "likesFlavor": "dry",
    "hatesFlavor": "sour"
  },
  {
    "id": 9,
    "english": "gentle",
    "japanese": "おとなしい",
    "increasedStat": "spd",
    "decreasedStat": "def",
    "likesFlavor": "bitter",
    "hatesFlavor": "sour"
  },
  {
    "id": 10,
    "english": "hasty",
    "japanese": "せっかち",
    "increasedStat": "spe",
    "decreasedStat": "def",
    "likesFlavor": "sweet",
    "hatesFlavor": "sour"
  },
  {
    "id": 11,
    "english": "adamant",
    "japanese": "いじっぱり",
    "increasedStat": "atk",
    "decreasedStat": "spa",
    "likesFlavor": "spicy",
    "hatesFlavor": "dry"
  },
  {
    "id": 12,
    "english": "impish",
    "japanese": "わんぱく",
    "increasedStat": "def",
    "decreasedStat": "spa",
    "likesFlavor": "sour",
    "hatesFlavor": "dry"
  },
  {
    "id": 13,
    "english": "bashful",
    "japanese": "てれや",
    "increasedStat": null,
    "decreasedStat": null,
    "likesFlavor": null,
    "hatesFlavor": null
  },
  {
    "id": 14,
    "english": "careful",
    "japanese": "しんちょう",
    "increasedStat": "spd",
    "decreasedStat": "spa",
    "likesFlavor": "bitter",
    "hatesFlavor": "dry"
  },
  {
    "id": 15,
    "english": "rash",
    "japanese": "うっかりや",
    "increasedStat": "spa",
    "decreasedStat": "spd",
    "likesFlavor": "dry",
    "hatesFlavor": "bitter"
  },
  {
    "id": 16,
    "english": "jolly",
    "japanese": "ようき",
    "increasedStat": "spe",
    "decreasedStat": "spa",
    "likesFlavor": "sweet",
    "hatesFlavor": "dry"
  },
  {
    "id": 17,
    "english": "naughty",
    "japanese": "やんちゃ",
    "increasedStat": "atk",
    "decreasedStat": "spd",
    "likesFlavor": "spicy",
    "hatesFlavor": "bitter"
  },
  {
    "id": 18,
    "english": "lax",
    "japanese": "のうてんき",
    "increasedStat": "def",
    "decreasedStat": "spd",
    "likesFlavor": "sour",
    "hatesFlavor": "bitter"
  },
  {
    "id": 19,
    "english": "quirky",
    "japanese": "きまぐれ",
    "increasedStat": null,
    "decreasedStat": null,
    "likesFlavor": null,
    "hatesFlavor": null
  },
  {
    "id": 20,
    "english": "naive",
    "japanese": "むじゃき",
    "increasedStat": "spe",
    "decreasedStat": "spd",
    "likesFlavor": "sweet",
    "hatesFlavor": "bitter"
  },
  {
    "id": 21,
    "english": "brave",
    "japanese": "ゆうかん",
    "increasedStat": "atk",
    "decreasedStat": "spe",
    "likesFlavor": "spicy",
    "hatesFlavor": "sweet"
  },
  {
    "id": 22,
    "english": "relaxed",
    "japanese": "のんき",
    "increasedStat": "def",
    "decreasedStat": "spe",
    "likesFlavor": "sour",
    "hatesFlavor": "sweet"
  },
  {
    "id": 23,
    "english": "quiet",
    "japanese": "れいせい",
    "increasedStat": "spa",
    "decreasedStat": "spe",
    "likesFlavor": "dry",
    "hatesFlavor": "sweet"
  },
  {
    "id": 24,
    "english": "sassy",
    "japanese": "なまいき",
    "increasedStat": "spd",
    "decreasedStat": "spe",
    "likesFlavor": "bitter",
    "hatesFlavor": "sweet"
  },
  {
    "id": 25,
    "english": "serious",
    "japanese": "まじめ",
    "increasedStat": null,
    "decreasedStat": null,
    "likesFlavor": null,
    "hatesFlavor": null
  }
];