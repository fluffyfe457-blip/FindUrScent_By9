import { perfumes } from '@/data/perfumes';
import { Perfume } from '@/types/perfume';

interface ScentMapping {
  keywords: string[];
  notes: string[];
  families: string[];
}

const STORY_MAPPINGS: ScentMapping[] = [
  {
    keywords: ['beach', 'ocean', 'sea', 'summer', 'vacation', 'salt', 'waves', 'water'],
    notes: ['Sea Notes', 'Sea Salt', 'Bergamot', 'Lemon', 'Coconut'],
    families: ['aquatic', 'fresh']
  },
  {
    keywords: ['library', 'books', 'old', 'paper', 'wood', 'study', 'dark', 'quiet'],
    notes: ['Cedar', 'Sandalwood', 'Leather', 'Papyrus', 'Oud', 'Incense'],
    families: ['woody', 'oriental']
  },
  {
    keywords: ['forest', 'rain', 'green', 'nature', 'moss', 'morning', 'fresh', 'pine'],
    notes: ['Pine Needles', 'Oakmoss', 'Vetiver', 'Patchouli', 'Mint', 'Juniper'],
    families: ['woody', 'fresh']
  },
  {
    keywords: ['romance', 'date', 'love', 'flowers', 'garden', 'evening', 'candle', 'sweet'],
    notes: ['Rose', 'Jasmine', 'Vanilla', 'Peony', 'Ylang-Ylang', 'Orchid'],
    families: ['floral', 'oriental']
  },
  {
    keywords: ['morning', 'energy', 'clean', 'office', 'white', 'bright', 'suit', 'sharp'],
    notes: ['Citrus', 'Bergamot', 'Apple', 'Lavender', 'Aldehydes', 'Musk'],
    families: ['fresh', 'fruity']
  },
  {
    keywords: ['night', 'party', 'mysterious', 'club', 'winter', 'gold', 'luxury', 'intense'],
    notes: ['Amber', 'Saffron', 'Tonka Bean', 'Oud', 'Incense', 'Ambergris'],
    families: ['oriental', 'woody']
  }
];

export function analyzeStory(story: string): { matches: Perfume[]; detectedNotes: string[]; detectedFamilies: string[] } {
  const lowercaseStory = story.toLowerCase();
  const detectedNotes = new Set<string>();
  const detectedFamilies = new Set<string>();

  // Detect mapping-based components
  STORY_MAPPINGS.forEach(mapping => {
    const hasKeyword = mapping.keywords.some(k => lowercaseStory.includes(k));
    if (hasKeyword) {
      mapping.notes.forEach(n => detectedNotes.add(n));
      mapping.families.forEach(f => detectedFamilies.add(f));
    }
  });

  // Also check if any actual perfume notes are mentioned directly
  const allPossibleNotes = Array.from(new Set(perfumes.flatMap(p => p.notes.map(n => n.name))));
  allPossibleNotes.forEach(noteName => {
    if (lowercaseStory.includes(noteName.toLowerCase())) {
      detectedNotes.add(noteName);
    }
  });

  // Score perfumes based on matches
  const scoredPerfumes = perfumes.map(perfume => {
    let score = 0;
    
    // Family match
    if (detectedFamilies.has(perfume.scent_family.toLowerCase())) {
      score += 3;
    }

    // Note matches
    const perfumeNoteNames = perfume.notes.map(n => n.name);
    perfumeNoteNames.forEach(note => {
      if (detectedNotes.has(note)) {
        score += 2;
      }
    });

    // Bonus for description match
    if (lowercaseStory.split(' ').some(word => word.length > 3 && perfume.description.toLowerCase().includes(word))) {
      score += 1;
    }

    return { perfume, score };
  });

  // Filter out zero scores and sort
  const matches = scoredPerfumes
    .filter(res => res.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(res => res.perfume);

  return {
    matches: matches.slice(0, 5),
    detectedNotes: Array.from(detectedNotes).slice(0, 10),
    detectedFamilies: Array.from(detectedFamilies)
  };
}
