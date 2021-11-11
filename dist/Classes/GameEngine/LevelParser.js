export const LevelParser = (exp, level = 1) => {
    const currentLevelExp = level * 30 + 10;
    if (exp - currentLevelExp < 0)
        return {
            level,
            expNeededToLevel: currentLevelExp,
            expUntilNextLevel: currentLevelExp - exp
        };
    level++;
    return LevelParser(exp - currentLevelExp, level);
};
