const cats = {
  strength: {
    overview:
      'This strength session builds safe progressive overload with clear cues for every body.',
    eq: ['Barbell / dumbbells', 'Squat rack or bench', 'Wrist wraps (optional)', 'Training shoes'],
    m: ['Lower body', 'Chest & back', 'Core stability', 'Posterior chain'],
    s: [
      ['Warm-up activation 8 min', 'Joint circles and empty-bar work to open hips, knees, and shoulders.'],
      ['Main lifts progressive', 'Add load only with solid form. 5-8 reps, rest 90-120s between sets.'],
      ['Accessories & finish', 'Two accessory moves for weak links, then 3 minutes of breath work.'],
    ],
    tips: ['Knees track over toes', 'Keep a neutral spine', 'Technique first, load second'],
  },
  cardio: {
    overview:
      'Cardio intervals raise heart rate safely with clear pacing for beginners and intermediates.',
    eq: ['Running shoes', 'Heart-rate watch (optional)', 'Water bottle', 'Open route or treadmill'],
    m: ['Cardio system', 'Lower-body endurance', 'Core', 'Hip stability'],
    s: [
      ['Easy open 5 min', 'Conversational pace to warm tissues and breathing.'],
      ['Main interval block', 'Alternate work and recovery as coached; stay light on your feet.'],
      ['Cool-down', 'Walk then stretch calves and hip flexors — no abrupt stop.'],
    ],
    tips: ['Settle breathing before speeding up', 'Midfoot landing', 'Sip water often'],
  },
  yoga: {
    overview: 'A breath-led yoga flow to open hips and spine while calming the nervous system.',
    eq: ['Yoga mat', 'Blocks (optional)', 'Comfortable clothes', 'Quiet space'],
    m: ['Hip mobility', 'Spinal mobility', 'Core & balance', 'Shoulder openness'],
    s: [
      ['Breath & standing', 'Find mountain pose alignment; breathe nose-in nose-out.'],
      ['Flow sequence', 'Link warriors/triangles with breath-matched movement.'],
      ['Restore', 'Forward fold and supine rest to bring the heart rate down.'],
    ],
    tips: ['Never hold the breath', 'Exit any pose that hurts', 'Blocks make poses safer'],
  },
  pilates: {
    overview: 'Pilates control work for deep core, pelvic neutral, and precise body lines.',
    eq: ['Mat', 'Mini-band (optional)', 'Towel', 'Stable floor'],
    m: ['Deep core', 'Pelvic stability', 'Shoulder control', 'Glute med'],
    s: [
      ['Find neutral', 'Neutral pelvis, ribs down, gentle TVA activation.'],
      ['Mat control flow', 'Hundred / single-leg stretch — slow and precise.'],
      ['Side-lying finish', 'Side-lying abductors for glute med, then breath release.'],
    ],
    tips: ['Avoid collapsing the low back', 'Smaller often means harder', 'Exhale on effort'],
  },
  hiit: {
    overview: 'High-intensity intervals for fat burn and conditioning. Scale every move to your level.',
    eq: ['Timer', 'Jump rope or floor space', 'Mat (optional)', 'Water'],
    m: ['Full-body burn', 'Cardio power', 'Core', 'Legs'],
    s: [
      ['Dynamic warm-up', 'Jumping jacks and high knees for 3-4 minutes.'],
      ['Interval block', 'Work 30-40s / rest 15-20s for the prescribed rounds.'],
      ['Downshift', 'Walk and stretch — do not sit immediately.'],
    ],
    tips: ['Scale intensity anytime', 'Keep full range of motion', 'Stop if dizzy'],
  },
  mobility: {
    overview: 'Mobility and recovery to free stiff joints and prepare the body for harder training.',
    eq: ['Mat', 'Foam roller (optional)', 'Band', 'Comfortable clothes'],
    m: ['Neck/shoulders/T-spine', 'Hip & ankle mobility', 'Fascia release', 'Breath'],
    s: [
      ['Soft-tissue reset', 'Roll or massage tight areas for 2-3 minutes.'],
      ['Active mobility', 'Controlled joint drills to own the new range.'],
      ['Long holds', 'Hold each stretch 45-60s with deep breathing.'],
    ],
    tips: ['Pain is not progress', 'Keep breathing steady', 'Great after hard sessions'],
  },
  martial: {
    overview: 'Martial fundamentals for coordination, power, and cardio with safety-first coaching.',
    eq: ['Gloves or pads (optional)', 'Jump rope', 'Open floor space', 'Supportive shoes'],
    m: ['Full-body coordination', 'Rotational core', 'Cardio', 'Legs'],
    s: [
      ['Stance & footwork', 'Basic stance, forward/back steps, weight shifts.'],
      ['Strike combos', 'Jab/cross or kick combinations with active guard return.'],
      ['Conditioning finish', 'Light intervals or shadow work, then stretch hips/shoulders.'],
    ],
    tips: ['Slow before fast', 'Chin tucked, hands up', 'Soft landings protect knees'],
  },
  home: {
    overview: 'Apartment-friendly home training. Minimal gear, maximum consistency.',
    eq: ['Mat', 'Water bottles or light DBs', 'Sturdy chair', 'Clear floor space'],
    m: ['Foundational strength', 'Core', 'Glutes & legs', 'Shoulders'],
    s: [
      ['In-place warm-up', 'Jacks, lunges, arm circles — no gear needed.'],
      ['Circuit work', 'Squats, push-ups, planks for 3-4 rounds.'],
      ['Stretch out', '5 minutes for quads, chest, and shoulders.'],
    ],
    tips: ['Control tempo', 'A backpack can add load', 'Use a towel on slick floors'],
  },
}

export function detailKeys(langPack = cats) {
  const out = {}
  for (const [c, p] of Object.entries(langPack)) {
    out[`d_${c}_overview`] = p.overview
    p.eq.forEach((v, i) => {
      out[`d_${c}_eq${i + 1}`] = v
    })
    p.m.forEach((v, i) => {
      out[`d_${c}_m${i + 1}`] = v
    })
    p.s.forEach((s, i) => {
      out[`d_${c}_s${i + 1}t`] = s[0]
      out[`d_${c}_s${i + 1}d`] = s[1]
    })
    p.tips.forEach((v, i) => {
      out[`d_${c}_tip${i + 1}`] = v
    })
  }
  out.d_schedule =
    'Train 2-3x weekly with at least one rest day. Session {duration}, about {calories}. Extend rests by 15-30s if needed.'
  return out
}

export const EN_DETAILS = detailKeys()
