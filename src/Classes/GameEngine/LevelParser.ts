export interface LevelInfo{
	level: number,
	expNeededToLevel: number,
	expUntilNextLevel: number
}

export const LevelParser = (exp: number, level: number = 1): LevelInfo => {
    const currentLevelExp: number = level * 30 + 10;
    if(exp - currentLevelExp < 0) return {
        level,
        expNeededToLevel: currentLevelExp,
        expUntilNextLevel: currentLevelExp - exp
    }
    level ++;
    return LevelParser(exp - currentLevelExp, level)
}
