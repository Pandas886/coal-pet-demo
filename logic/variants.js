const VARIANTS = [
  {
    id: 'clawdish',
    name: '方向 2',
    title: '更接近原项目',
    description: '更克制、更偏 companion 资产，轮廓收敛，眼神更冷静，方便后续做状态表演。',
  },
  {
    id: 'hybrid',
    name: '方向 3',
    title: '折中版',
    description: '保留像素 companion 语言，但轮廓更圆一点，煤球感更强，表情更可爱。',
  },
];

export function getVariants() {
  return VARIANTS.map((variant) => ({ ...variant }));
}

export function resolveVariant(id) {
  return VARIANTS.find((variant) => variant.id === id) ?? VARIANTS[0];
}
