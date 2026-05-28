import { ImageSourcePropType } from 'react-native';

export type TempleNote = {
  id: string;
  title: string;
  readMinutes: number;
  category: string;
  preview: string;
  body: string;
  image: ImageSourcePropType;
};

const placeholderImages = {
  light: require('../../ritrupligsmtreu/TempleOfApollo.png'),
  stone: require('../../ritrupligsmtreu/MarSabaMonastery.png'),
  arch: require('../../ritrupligsmtreu/Jerash.png'),
  trail: require('../../ritrupligsmtreu/MountSinaiRoute.png'),
  desert: require('../../ritrupligsmtreu/Petra.png'),
  cliff: require('../../ritrupligsmtreu/MeteoraMonasteries.png'),
};

export const templeNoteList: TempleNote[] = [
  {
    id: 'temples-built-around-light',
    title: 'How Ancient Temples Were Built Around Light',
    readMinutes: 6,
    category: 'Architecture',
    preview:
      'The architects of antiquity treated light as a building material — a way of marking sacred time and directing the eye toward the heart of the temple.',
    body: `Light was not a secondary concern for the builders of antiquity — it was the primary material they worked with. At the temple complex of Abu Simbel in Egypt, the inner sanctuary was constructed so that twice a year, on the anniversary of Ramesses II's coronation and birth, sunlight would penetrate the entire length of the hall and illuminate three of the four statues in the innermost chamber. The fourth, traditionally identified with the god of the underworld, stayed in shadow. This was not coincidence. It required extraordinary precision of orientation, calculated over generations of observation, and engineered into the stone with a mastery of astronomy we are still working to fully understand.

The builders of the Parthenon understood that the column drums, precisely stacked and slightly tapered, would catch light at angles that made the marble shimmer. The Romans understood that the oculus of the Pantheon — the circular opening in the dome — would cast a circle of pure light that moved across the interior like a sundial, marking the hours of the day and the position of the sun within the sacred year.

In each case, the builders were not simply decorating a space. They were building a clock and a calendar, a machine for making time visible and connecting the rhythms of human devotion to the larger movements of the cosmos. Reading a temple today means reading the light it was designed to hold, and understanding that the stone is only half of the architecture.`,
    image: placeholderImages.light,
  },
  {
    id: 'desert-monasteries-silence-of-stone',
    title: 'Desert Monasteries and the Silence of Stone',
    readMinutes: 8,
    category: 'Sacred Routes',
    preview:
      'In the empty places of the Sinai, the Judean wilderness, and the Syrian desert, monks built sanctuaries designed for a specific kind of listening.',
    body: `In the empty places of the Sinai, the Judean wilderness, and the Syrian desert, monks built sanctuaries designed for a specific kind of listening. The desert was not a setting; it was a co-author. Walls were pressed into cliffs, courtyards opened toward valleys, and chapels were oriented so that the rising sun broke directly over the altar at the start of the long day's work.

These were not romantic retreats. The desert is severe, the wind erases footprints, and the stone holds the heat of the afternoon long after sunset. Living within it required architecture that could survive without comfort: cisterns carved into the rock, narrow staircases that doubled as defensive choke points, kitchen wings positioned away from prevailing winds. Every choice was practical, but the cumulative effect was contemplative.

What a visitor notices first today is the silence. Not the absence of sound — the desert is full of wind, distant birds, the small noises of stone shifting — but the absence of human noise. The monasteries amplify this. Stone corridors carry footsteps; vaulted ceilings hold a held breath; a chant from one cell can be heard across the entire complex. The buildings are instruments tuned to the quiet, and they have been playing the same note for fifteen hundred years.`,
    image: placeholderImages.stone,
  },
  {
    id: 'reading-arches-and-columns',
    title: 'Reading Arches, Columns, and Sacred Space',
    readMinutes: 5,
    category: 'Architecture',
    preview:
      'Arches, columns, and gates were not decorative. They were instructions for how to enter, pause, and move through a sacred place.',
    body: `Arches, columns, and gates were not decorative. They were instructions. An arched gate told you that you were leaving one kind of space and entering another. A row of columns directed your eye toward the most important place in the building — usually an altar, a statue, a tomb, or a window oriented to the sun. A small doorway forced you to bow your head before entering a chamber, slowing the body so the mind could catch up.

Once you start reading these elements, every old building becomes legible. The narrow Siq leading into Petra is a long architectural breath, designed so the dramatic façade of the Treasury arrives suddenly, after a long descent through shadow. The peristyle of a classical temple is a rhythm of vertical lines that frames the interior as a kind of sacred core, only partially visible from the outside. The courtyards of a desert monastery use repetition to slow the visitor down before the inner chapel.

These elements outlast the religions that built them. The languages of arch, gate, column, and courtyard travel across cultures because they are doing structural and emotional work at the same time. A respectful traveler learns to notice when a building is asking them to slow down.`,
    image: placeholderImages.arch,
  },
  {
    id: 'how-pilgrimage-routes-formed',
    title: 'How Sacred Pilgrimage Routes Took Shape',
    readMinutes: 7,
    category: 'Cultural History',
    preview:
      'Pilgrimage routes were never invented. They emerged where geography, water, and memory crossed paths.',
    body: `Pilgrimage routes were not designed in any single moment. They grew, slowly, where geography made movement possible and memory made movement meaningful. A spring along a mountain pass becomes a rest stop; a rest stop becomes a shrine; a shrine becomes a destination; a destination becomes a route. By the time a traveler today walks the same path, dozens of generations have shaped it.

The roads to Jerusalem, the desert tracks toward Sinai, the highland trails through Anatolia, and the river routes through the Levant all share this pattern. Where water exists, settlement follows. Where settlement is old, sacred memory accumulates. The architecture along these routes — the wayside chapels, hostels, fortified gates, and water cisterns — is the physical residue of millions of small decisions about where it was safe to stop, where it was wise to gather, and where it was meaningful to pray.

Walking a sacred route today is partly a study in landscape literacy. The route is real because the geography is real. The shrines are placed where they are because that is where travelers stopped. Reading the route as a landscape, rather than a checklist of monuments, is the closest a modern visitor can come to walking it as it was originally walked.`,
    image: placeholderImages.trail,
  },
  {
    id: 'symbolism-in-stone-carvings',
    title: 'Symbolism in Stone: Carvings, Friezes, and Gates',
    readMinutes: 6,
    category: 'Symbolism',
    preview:
      'Every stone carving is a sentence in a language we have only partially learned to read.',
    body: `Every stone carving is a sentence in a language we have only partially learned to read. A frieze of vines is not just decoration — it is often a reference to abundance, harvest, or the cycle of seasons. A pair of guardian figures at a gate marks a threshold between two kinds of space. A geometric repeating pattern can encode a name, a date, or a prayer that was never meant to be read aloud.

Across the ancient Mediterranean and Near East, these languages of stone overlap. The lotus motif moves from Egypt to Phoenicia to Greece. The acanthus leaf, central to Greek and Roman temple capitals, finds echoes in Byzantine and later traditions. Gate guardians appear in cultures that never met but solved the same architectural problem — how to mark a passage from outside to inside, from ordinary to sacred — in remarkably similar ways.

A traveler does not need to read every symbol to enjoy a sacred site. But noticing that the symbols form a system, and that the system is older than any single culture, changes how the place feels. You stop seeing decoration. You start seeing a conversation across centuries.`,
    image: placeholderImages.desert,
  },
  {
    id: 'travel-etiquette-and-sacred-places',
    title: 'Travel Etiquette in Living Sacred Places',
    readMinutes: 4,
    category: 'Travel Etiquette',
    preview:
      'Active sites are not museums. The same rooms used for prayer are the rooms you are stepping into as a visitor.',
    body: `Active sites are not museums. The same rooms used for prayer or daily monastic work are the rooms you are stepping into as a visitor. The most useful thing a traveler can do is to slow down at the threshold and watch how local people behave. Are they removing shoes? Are they covering shoulders? Are they keeping silent in certain corridors?

A few small rules cover most situations. Lower your voice, especially in halls that carry sound. Step around people who are praying or kneeling, not in front of them. Avoid using flash photography in interiors with old paintings or icons. Do not touch frescoes, altars, manuscripts, or carved stone unless a guide explicitly allows it. If you are not sure whether a space is open to visitors, ask before entering.

These small acts of attention are what separate a respectful visitor from an intrusion. The buildings have outlasted many empires by being treated with care. Continuing that tradition is a small contribution, but it is the contribution every traveler can make.`,
    image: placeholderImages.cliff,
  },
];

export const findNote = (id: string): TempleNote | undefined =>
  templeNoteList.find(n => n.id === id);
