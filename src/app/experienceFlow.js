/**
 * New-Birth · experienceFlow — the story, in order.
 *
 * One array drives the whole journey. To reorder chapters, reorder this
 * list. To add a chapter, build its scene folder and register it here.
 */

import Intro from '../scenes/Intro/Intro';
import Mystery from '../scenes/Mystery/Mystery';
import Countdown from '../scenes/Countdown/Countdown';
import MidnightReveal from '../scenes/Midnight/MidnightReveal';
import MemoryWorld from '../scenes/MemoryWorld/MemoryWorld';
import Sketchbook from '../scenes/Sketchbook/Sketchbook';
import Scrapbook from '../scenes/Scrapbook/Scrapbook';
import MemoryGallery from '../scenes/Gallery/MemoryGallery';
import PersonalMessage from '../scenes/PersonalMessage/PersonalMessage';
import Reasons from '../scenes/Appreciation/Reasons';
import Surprise from '../scenes/Surprise/Surprise';
import PhoneScene from '../scenes/PhoneMessage/PhoneScene';
import BirthdayCake from '../scenes/Cake/BirthdayCake';
import FinalLetter from '../scenes/FinalLetter/FinalLetter';
import Ending from '../scenes/Ending/Ending';

export const scenes = [
  { id: 'intro', component: Intro },
  { id: 'mystery', component: Mystery },
  { id: 'countdown', component: Countdown },
  { id: 'midnight', component: MidnightReveal },
  { id: 'memory-world', component: MemoryWorld },
  { id: 'sketchbook', component: Sketchbook },
  { id: 'scrapbook', component: Scrapbook },
  { id: 'gallery', component: MemoryGallery },
  { id: 'personal-message', component: PersonalMessage },
  { id: 'appreciation', component: Reasons },
  { id: 'surprise', component: Surprise },
  { id: 'phone-message', component: PhoneScene },
  { id: 'cake', component: BirthdayCake },
  { id: 'final-letter', component: FinalLetter },
  { id: 'ending', component: Ending },
];

export const SCENE_IDS = scenes.map((s) => s.id);
