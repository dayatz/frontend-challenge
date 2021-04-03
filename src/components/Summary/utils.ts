import { PointObject } from './../../interfaces';

export const getDamageDistributionsByClassnames = 
  (pointObjects: PointObject[]) => {
  const totalDamage = pointObjects.reduce((acc, p) => acc + p.DamagePoint, 0)
  const levelClasses = [
    ["", null],
    ["|3|"],
    ["|4|", "|8|", "|0|", "|6|"],
    ["|2|", "|5|", "|7|", "|10|", "|9|"],
    ["|1|", "|11|"]
  ]
  const result: {[key: string]: number} = {
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0,
    total: totalDamage
  }

  pointObjects.forEach(p => {
    const { ClassName } = p
    if (!ClassName) {
      result.level1 += p.DamagePoint
    } else {
      let classnameArray = ClassName.split(",")
      classnameArray = [...new Set(classnameArray)]
      
      classnameArray.forEach((cls) => {
        if (levelClasses.some((clsLevel) => clsLevel.includes(cls))) {
          const levelIndex = levelClasses.findIndex(lvlCls => lvlCls.includes(cls))
          const levelKey = `level${levelIndex+1}`
          result[levelKey] += p.DamagePoint 
        }
      })
    }
  })

  return result
}
