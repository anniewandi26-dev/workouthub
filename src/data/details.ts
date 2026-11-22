import type { FitnessItem } from './content'

export type StepBlock = { title: string; detail: string }

export type ItemDetails = {
  overviewZh: string
  overviewEn: string
  equipmentZh: string[]
  equipmentEn: string[]
  musclesZh: string[]
  musclesEn: string[]
  stepsZh: StepBlock[]
  stepsEn: StepBlock[]
  tipsZh: string[]
  tipsEn: string[]
  scheduleZh: string
  scheduleEn: string
}

const byCategory: Record<
  string,
  {
    equipmentZh: string[]
    equipmentEn: string[]
    musclesZh: string[]
    musclesEn: string[]
    stepsZh: StepBlock[]
    stepsEn: StepBlock[]
    tipsZh: string[]
    tipsEn: string[]
  }
> = {
  strength: {
    equipmentZh: ['杠铃 / 哑铃', '深蹲架或卧推凳', '护腕（可选）', '训练鞋'],
    equipmentEn: ['Barbell / dumbbells', 'Rack or bench', 'Wrist wraps (optional)', 'Training shoes'],
    musclesZh: ['下肢', '胸背', '核心稳定', '后链'],
    musclesEn: ['Lower body', 'Chest & back', 'Core stability', 'Posterior chain'],
    stepsZh: [
      { title: '热身激活 8 分钟', detail: '关节环绕 + 轻重量空杆动作，把髋、膝、肩充分打开。' },
      { title: '主项三组渐进', detail: '按动作技术优先加重量，每组 5–8 次，组间休息 90–120 秒。' },
      { title: '辅助与收尾', detail: '补 2 个辅助动作强化弱链，再做 3 分钟呼吸放松。' },
    ],
    stepsEn: [
      { title: 'Warm-up 8 min', detail: 'Joint circles and empty-bar reps to open hips, knees, and shoulders.' },
      { title: 'Main lifts progressive', detail: 'Add load only with solid form. 5–8 reps, rest 90–120s.' },
      { title: 'Accessories & finish', detail: 'Two accessory moves for weak links, then 3 minutes of breath work.' },
    ],
    tipsZh: ['膝盖与脚尖同向', '腰背中立不要塌', '宁轻勿乱，技术优先'],
    tipsEn: ['Knees track over toes', 'Keep a neutral spine', 'Technique first, load second'],
  },
  cardio: {
    equipmentZh: ['舒适跑鞋', '心率带或手表（可选）', '水壶'],
    equipmentEn: ['Running shoes', 'Heart-rate watch (optional)', 'Water bottle'],
    musclesZh: ['心肺系统', '下肢耐力', '核心'],
    musclesEn: ['Cardio system', 'Lower-body endurance', 'Core'],
    stepsZh: [
      { title: '轻松开场', detail: '5 分钟轻松配速热身，呼吸能对话即可。' },
      { title: '主间歇段', detail: '按课程配速切换冲刺与恢复，注意落地轻盈。' },
      { title: '放松收尾', detail: '慢走 + 小腿与髋屈肌拉伸，避免突然停下。' },
    ],
    stepsEn: [
      { title: 'Easy open', detail: '5 minutes conversational pace to warm up.' },
      { title: 'Main intervals', detail: 'Alternate work and recovery as coached; stay light on your feet.' },
      { title: 'Cool-down', detail: 'Walk then stretch calves and hip flexors — no abrupt stop.' },
    ],
    tipsZh: ['先稳呼吸再提速', '脚掌中前掌落地', '补水少量多次'],
    tipsEn: ['Settle breathing before speeding up', 'Midfoot landing', 'Sip water often'],
  },
  yoga: {
    equipmentZh: ['瑜伽垫', '瑜伽砖（可选）', '宽松服装'],
    equipmentEn: ['Yoga mat', 'Blocks (optional)', 'Comfortable clothes'],
    musclesZh: ['髋部柔韧', '脊柱活动度', '核心与平衡'],
    musclesEn: ['Hip mobility', 'Spinal mobility', 'Core & balance'],
    stepsZh: [
      { title: '呼吸与站立', detail: '山式站立对齐，用鼻吸鼻呼建立节奏。' },
      { title: '序列流动', detail: '战士式 / 三角式等串联，动作与呼吸同步。' },
      { title: '放松还原', detail: '前屈与仰卧放松，让心率缓慢回落。' },
    ],
    stepsEn: [
      { title: 'Breath & standing', detail: 'Find mountain pose alignment; breathe nose-in nose-out.' },
      { title: 'Flow sequence', detail: 'Link warriors/triangles with breath-matched movement.' },
      { title: 'Restore', detail: 'Forward fold and supine rest to bring the heart rate down.' },
    ],
    tipsZh: ['不要憋气', '疼痛立刻退出体式', '用砖辅助更安全'],
    tipsEn: ['Never hold the breath', 'Exit any pose that hurts', 'Blocks make poses safer'],
  },
  pilates: {
    equipmentZh: ['瑜伽垫', '迷你弹力带（可选）', '毛巾'],
    equipmentEn: ['Mat', 'Mini-band (optional)', 'Towel'],
    musclesZh: ['深层核心', '骨盆稳定', '肩带控制'],
    musclesEn: ['Deep core', 'Pelvic stability', 'Shoulder control'],
    stepsZh: [
      { title: '中立位建立', detail: '找到骨盆中立与肋骨下降，激活腹横肌。' },
      { title: '垫上控制流', detail: '百次拍 / 单腿伸展等，强调慢控与精准。' },
      { title: '侧卧与收尾', detail: '侧卧髋外展强化臀中肌，最后呼吸放松。' },
    ],
    stepsEn: [
      { title: 'Find neutral', detail: 'Neutral pelvis, ribs down, gentle TVA activation.' },
      { title: 'Mat control flow', detail: 'Hundred / single-leg stretch — slow and precise.' },
      { title: 'Side-lying finish', detail: 'Side-lying abductors for glute med, then breath release.' },
    ],
    tipsZh: ['腰不要过度塌陷', '动作越小越难', '呼气时发力'],
    tipsEn: ['Avoid collapsing the low back', 'Smaller often means harder', 'Exhale on effort'],
  },
  hiit: {
    equipmentZh: ['计时器', '跳绳或徒手空间', '垫子（可选）'],
    equipmentEn: ['Timer', 'Jump rope or floor space', 'Mat (optional)'],
    musclesZh: ['全身燃脂', '心肺爆发', '核心'],
    musclesEn: ['Full-body burn', 'Cardio power', 'Core'],
    stepsZh: [
      { title: '动态热身', detail: '开合跳、高抬腿 3–4 分钟，把心率抬起来。' },
      { title: '间歇主课', detail: '工作 30–40 秒 / 休息 15–20 秒，完成规定轮次。' },
      { title: '下降心率', detail: '慢走与全身拉伸，避免立刻坐下。' },
    ],
    stepsEn: [
      { title: 'Dynamic warm-up', detail: 'Jumping jacks and high knees for 3–4 minutes.' },
      { title: 'Interval block', detail: 'Work 30–40s / rest 15–20s for the prescribed rounds.' },
      { title: 'Downshift', detail: 'Walk and stretch — don’t sit immediately.' },
    ],
    tipsZh: ['可随时降低强度', '保持动作完整', '头晕立即停止'],
    tipsEn: ['Scale intensity anytime', 'Keep full range of motion', 'Stop if dizzy'],
  },
  mobility: {
    equipmentZh: ['瑜伽垫', '泡沫轴（可选）', '弹力带'],
    equipmentEn: ['Mat', 'Foam roller (optional)', 'Band'],
    musclesZh: ['肩颈胸椎', '髋踝活动度', '筋膜放松'],
    musclesEn: ['Neck/shoulders/T-spine', 'Hip & ankle mobility', 'Fascia release'],
    stepsZh: [
      { title: '筋膜放松', detail: '泡沫轴或手按放松紧张区域 2–3 分钟。' },
      { title: '主动活动度', detail: '可控关节活动，把新获得的活动度用起来。' },
      { title: '长停留拉伸', detail: '每个姿势停留 45–60 秒，配合深呼吸。' },
    ],
    stepsEn: [
      { title: 'Soft-tissue reset', detail: 'Roll or massage tight areas for 2–3 minutes.' },
      { title: 'Active mobility', detail: 'Controlled joint drills to own the new range.' },
      { title: 'Long holds', detail: 'Hold each stretch 45–60s with deep breathing.' },
    ],
    tipsZh: ['疼痛不等于有效', '保持平稳呼吸', '训练后做效果更好'],
    tipsEn: ['Pain ≠ progress', 'Keep breathing steady', 'Works great after training'],
  },
  martial: {
    equipmentZh: ['拳套或手靶（可选）', '跳绳', '开阔空间'],
    equipmentEn: ['Gloves or pads (optional)', 'Jump rope', 'Open floor space'],
    musclesZh: ['全身协调', '核心旋转', '心肺'],
    musclesEn: ['Full-body coordination', 'Rotational core', 'Cardio'],
    stepsZh: [
      { title: '步伐与站架', detail: '学习基本站姿、前后移动与重心转移。' },
      { title: '击打组合', detail: '直拳、摆拳或踢腿组合，强调回防。' },
      { title: '体能收尾', detail: '轻间歇或影子搏击，再拉伸肩髋。' },
    ],
    stepsEn: [
      { title: 'Stance & footwork', detail: 'Basic stance, forward/back steps, weight shifts.' },
      { title: 'Strike combos', detail: 'Jab/cross or kick combinations with active guard return.' },
      { title: 'Conditioning finish', detail: 'Light intervals or shadow work, then stretch hips/shoulders.' },
    ],
    tipsZh: ['先慢再快', '下巴微收护面', '落地缓冲保护膝盖'],
    tipsEn: ['Slow before fast', 'Chin tucked, hands up', 'Soft landings protect knees'],
  },
  home: {
    equipmentZh: ['瑜伽垫', '水瓶或轻哑铃（可选）', '稳定椅子'],
    equipmentEn: ['Mat', 'Water bottles or light DBs (optional)', 'Sturdy chair'],
    musclesZh: ['全身基础力量', '核心', '臀腿'],
    musclesEn: ['Foundational strength', 'Core', 'Glutes & legs'],
    stepsZh: [
      { title: '原地热身', detail: '开合、弓步、手臂绕环，不离开房间也能完成。' },
      { title: '循环训练', detail: '深蹲、俯卧撑、平板支撑等循环 3–4 轮。' },
      { title: '拉伸放松', detail: '针对大腿前侧、胸肩做 5 分钟拉伸。' },
    ],
    stepsEn: [
      { title: 'In-place warm-up', detail: 'Jacks, lunges, arm circles — no gear needed.' },
      { title: 'Circuit work', detail: 'Squats, push-ups, planks for 3–4 rounds.' },
      { title: 'Stretch out', detail: '5 minutes for quads, chest, and shoulders.' },
    ],
    tipsZh: ['控制动作速度', '用背包加水增阻', '地板滑就垫毛巾'],
    tipsEn: ['Control tempo', 'A backpack can add load', 'Use a towel on slick floors'],
  },
}

const fallback = byCategory.strength

/** Tags are stored in English; map only for Chinese overviews. */
const TAG_ZH: Record<string, string> = {
  barbell: '杠铃',
  bodyweight: '徒手',
  gym: '健身房',
  compound: '复合动作',
  apartment: '公寓',
  daily: '日常',
  'fat burn': '燃脂',
  interval: '间歇',
  studio: '工作室',
  core: '核心',
  posture: '体态',
  mat: '垫上',
  morning: '晨间',
  breath: '呼吸',
  recovery: '恢复',
  desk: '久坐',
  stretch: '拉伸',
  kettlebell: '壶铃',
  athlete: '运动员',
  'muay thai': '泰拳',
  cardio: '有氧',
  striking: '击打',
  hybrid: '混合',
  endurance: '耐力',
  circuit: '循环',
  glutes: '臀',
  legs: '腿',
  hypertrophy: '增肌',
  deadlift: '硬拉',
  technique: '技术',
}

function tagsForZh(tags: string[]) {
  return tags.map((t) => TAG_ZH[t] ?? TAG_ZH[t.toLowerCase()] ?? t).join(' · ')
}

export function getItemDetails(item: FitnessItem): ItemDetails {
  const pack = byCategory[item.category] ?? fallback
  const calories = item.calories ?? '—'
  const tagsEn = item.tags.join(' · ')
  const tagsZh = tagsForZh(item.tags)
  const levelZh =
    item.level === 'beginner' ? '入门' : item.level === 'intermediate' ? '进阶' : '高阶'

  return {
    overviewZh: `${item.descZh} 本课约消耗 ${calories}，适合${levelZh}水平。标签：${tagsZh}。教练 ${item.instructor} 将带你完整走完热身、主训与恢复。`,
    overviewEn: `${item.descEn} Estimated burn ${calories}. Level: ${item.level}. Tags: ${tagsEn}. Coach ${item.instructor} guides warm-up, main work, and recovery end-to-end.`,
    equipmentZh: pack.equipmentZh,
    equipmentEn: pack.equipmentEn,
    musclesZh: pack.musclesZh,
    musclesEn: pack.musclesEn,
    stepsZh: pack.stepsZh,
    stepsEn: pack.stepsEn,
    tipsZh: pack.tipsZh,
    tipsEn: pack.tipsEn,
    scheduleZh: `建议每周 2–3 次，间隔至少 1 天恢复。单次 ${item.duration}，可按体能把休息加长 15–30 秒。`,
    scheduleEn: `Train 2–3× weekly with at least one rest day between. Session length ${item.duration}; extend rests by 15–30s if needed.`,
  }
}
