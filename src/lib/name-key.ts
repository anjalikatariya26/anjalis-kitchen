/**
 * Name-key normaliser — Part C7
 *
 * Produces a canonical key from a free-text name.
 * Used for duplicate prevention in categories, festivals, and products.
 *
 * Steps:
 * 1. Unicode NFKC normalise, trim, collapse whitespace, lowercase
 * 2. Strip punctuation
 * 3. Apply synonym map for known transliteration families
 * 4. Singularise trailing "s" for words over 4 letters
 */

/**
 * Synonym map for known Maharashtrian food spelling families.
 * Each key is the canonical form; values are known alternates.
 * Loaded as config, not hard-coded in components.
 */
export const SYNONYM_MAP: Record<string, string[]> = {
  chivda: ['chiwda', 'chivada', 'chiwada', 'chivdha'],
  laddu: ['ladu', 'ladoo', 'laddoo', 'laadu', 'laddou'],
  thepla: ['thepala', 'thepla', 'thepala'],
  dhokla: ['dhokala', 'dhokala'],
  chutney: ['chatani', 'chatni', 'chatney', 'chatnee'],
  shengdana: ['shengdane', 'peanut', 'shengdhana'],
  chakli: ['chakali', 'chakali'],
  shankarpale: ['shankarpali', 'shakkarpali', 'shankarpala', 'shakarpare'],
  karanji: ['karanjee', 'karanchi'],
  modak: ['modaka', 'modhak'],
  samosa: ['samosaa'],
  mohanthal: ['mohan thaal', 'mohanthaal'],
  mathri: ['mathri', 'mathari', 'mathi'],
};

/**
 * Build a reverse lookup: alternate → canonical
 */
function buildReverseLookup(map: Record<string, string[]>): Map<string, string> {
  const reverse = new Map<string, string>();
  for (const [canonical, alternates] of Object.entries(map)) {
    for (const alt of alternates) {
      reverse.set(alt.toLowerCase(), canonical);
    }
    // Also map canonical to itself for completeness
    reverse.set(canonical.toLowerCase(), canonical);
  }
  return reverse;
}

const reverseLookup = buildReverseLookup(SYNONYM_MAP);

/**
 * Produce a normalised name key from a raw string.
 *
 * @example
 * nameKey("Chiwda")       // "chivda"
 * nameKey(" Besan  Ladoo ") // "besan laddu"
 * nameKey("Thepala")      // "thepla"
 * nameKey("Laddus")       // "laddu"
 */
export function nameKey(raw: string): string {
  // 1. NFKC, trim, collapse whitespace, lowercase
  let key = raw.normalize('NFKC').trim().replace(/\s+/g, ' ').toLowerCase();

  // 2. Strip punctuation (keep letters, numbers, spaces)
  key = key.replace(/[^\p{L}\p{N}\s]/gu, '');

  // 3. Apply synonym map per word
  const words = key.split(' ').map((word) => {
    return reverseLookup.get(word) ?? word;
  });

  // 4. Singularise trailing "s" for words over 4 letters
  const singularised = words.map((word) => {
    if (word.length > 4 && word.endsWith('s')) {
      return word.slice(0, -1);
    }
    return word;
  });

  return singularised.join(' ').trim();
}

/**
 * Check if two raw names would collide.
 */
export function namesCollide(a: string, b: string): boolean {
  return nameKey(a) === nameKey(b);
}
