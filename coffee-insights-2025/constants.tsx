import { ConsumptionData, TimelineEvent } from './types';
import { Zap, Coffee, CalendarClock, Calendar, Shuffle, Ban } from 'lucide-react';

export const COFFEE_DATA: ConsumptionData[] = [
  {
    id: 'daily',
    name: '一天一杯以上',
    value2024: 14.15,
    value2025: 14.55,
    description: '核心重度用户群体，咖啡已成为生活必需品，保持稳定微增。',
    icon: Zap,
    fill: '#78350f', // amber-900 (Deepest)
  },
  {
    id: '2-3week',
    name: '每周 2-3 杯',
    value2024: 32.08,
    value2025: 32.97,
    description: '主流消费群体。在此频率下，咖啡不仅是提神工具，更是生活调剂。',
    icon: Coffee,
    fill: '#b45309', // amber-700
  },
  {
    id: '1week',
    name: '每周一杯',
    value2024: 28.11,
    value2025: 30.42,
    description: '增长最显著的群体(+2.3%)。越来越多的人开始养成定期饮用咖啡的习惯。',
    icon: CalendarClock,
    fill: '#d97706', // amber-600
  },
  {
    id: '2-3month',
    name: '每月 2-3 杯',
    value2024: 8.68,
    value2025: 8.97,
    description: '偶尔的尝鲜者或社交型消费者，消费习惯相对随机。',
    icon: Calendar,
    fill: '#fbbf24', // amber-400
  },
  {
    id: 'irregular',
    name: '没有固定',
    value2024: 10.00,
    value2025: 7.76,
    description: '不固定消费群体大幅减少，说明消费者习惯正在趋于规律化。',
    icon: Shuffle,
    fill: '#a8a29e', // stone-400 (Grey)
  },
  {
    id: 'rarely',
    name: '基本不喝',
    value2024: 6.98,
    value2025: 5.33,
    description: '非咖啡用户比例下降，咖啡文化的渗透率进一步提升。',
    icon: Ban,
    fill: '#d6d3d1', // stone-300 (Light Grey)
  },
];

export const TIMELINE_DATA: TimelineEvent[] = [
  {
    id: 't1',
    date: '2023.02',
    brands: ['库迪咖啡'],
    title: '百城千店咖啡狂欢节',
    description: '作为价格战的“发令枪”，库迪率先将70多款产品售价下探，开启了平价咖啡的狂欢序幕。',
    priceTag: '9.9元',
    isMajor: true,
  },
  {
    id: 't2',
    date: '2023.04',
    brands: ['瑞幸咖啡', '库迪咖啡'],
    title: '贴身肉搏战',
    description: '瑞幸在库迪周边投放9.9元优惠券精准狙击；库迪应声而动，将价格进一步压低至8.8元。',
    priceTag: '8.8元',
    isMajor: false,
  },
  {
    id: 't3',
    date: '2023.06',
    brands: ['瑞幸咖啡'],
    title: '万店同庆 & 常态化',
    description: '瑞幸庆祝万店达成，将9.9元活动铺向全国，并于8月正式宣布9.9元常态化，重塑用户价格心智。',
    priceTag: '9.9元常态化',
    isMajor: true,
  },
  {
    id: 't4',
    date: '2024.02',
    brands: ['瑞幸咖啡'],
    title: '优惠范围缩减',
    description: '随着市场地位稳固与成本考量，9.9元优惠券可使用的产品范围开始悄然缩减。',
    priceTag: '9.9元优惠范围缩减',
    isMajor: false,
  },
  {
    id: 't5',
    date: '2024.04',
    brands: ['库迪咖啡'],
    title: '三年持久战宣言',
    description: '库迪咖啡高调宣布“9.9元促销活动”将持续三年，展示了死磕到底的决心。',
    priceTag: '9.9元活动持续3年',
    isMajor: true,
  },
  {
    id: 't6',
    date: '2024.06',
    brands: ['幸运咖'],
    title: '下沉市场的“地板价”',
    description: '蜜雪冰城旗下幸运咖入局，开启“咖啡6块6”时代，将价格战底线进一步拉低。',
    priceTag: '6.6元',
    isMajor: false,
  },
  {
    id: 't7',
    date: '2024.12',
    brands: ['皮爷咖啡'],
    title: '高端品牌的“平价反击”',
    description: '精品咖啡代表Peet’s推出子品牌Ora Coffee，通过优惠券将美式压至9.9元，试图降维打击。',
    priceTag: '9.9元',
    isMajor: false,
  },
  {
    id: 't8',
    date: '2025.05',
    brands: ['瑞幸咖啡'],
    title: '节日限时惊喜',
    description: '借助端午与儿童节，瑞幸推出多款核心产品6.9元的随机福利，刺激假日消费。',
    priceTag: '6.9元',
    isMajor: true,
  },
  {
    id: 't9',
    date: '2025.06',
    brands: ['星巴克'],
    title: '巨头的妥协',
    description: '星巴克推出“夏日心动价”，主力产品均降约5元，标志着价格战最终波及到了行业“天花板”。',
    priceTag: '均降5元',
    isMajor: true,
  },
];